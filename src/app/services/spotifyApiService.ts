import { Token } from '../models/token'
import dayJs, { Dayjs } from 'dayjs'
import { API } from '../utils'
import { AxiosResponse } from 'axios'
import { AlbumItem, SearchResponse } from '../models/searchResponse'
import { set } from 'lodash'

export class SpotifyApiService {
  private static tokenKey = 'spotifyAccessToken'

  get token(): Token {
    const token = localStorage.getItem(SpotifyApiService.tokenKey) as string
    return JSON.parse(token)
  }

  get expiration(): Dayjs {
    return dayJs(this.token.expires_at)
  }

  get isLoggedIn(): boolean {
    return this.token && dayJs().isBefore(this.expiration)
  }

  static removeToken() {
    localStorage.removeItem(SpotifyApiService.tokenKey)
  }

  private static persistToken(tokenAxiosResponse: AxiosResponse<Token>) {
    const { data: token } = tokenAxiosResponse
    token.expires_at = dayJs()
      .add(token.expires_in, 'second')
      .valueOf()
    localStorage.setItem(SpotifyApiService.tokenKey, JSON.stringify(token))
    return tokenAxiosResponse
  }

  requestAccessToken(): Promise<AxiosResponse<Token>> {
    const body = 'grant_type=client_credentials'
    return API.post<Token>(
      process.env.REACT_APP_HOST_AUTHORIZATION_TOKEN_URL as string,
      body,
      { headers: SpotifyApiService.makeAccessTokenHeaders() }
    ).then(SpotifyApiService.persistToken)
  }

  searchApi(query) {
    const params = {}
    set(params, 'query', `${query}`)
    set(params, 'type', 'album,track')
    set(params, 'include_external', 'audio')
    set(params, 'market', 'br')
    return API.get<SearchResponse>(
      `${process.env.REACT_APP_HOST_API_URL}/search`,
      {
        params,
      }
    )
  }

  getAlbum(id) {
    return API.get<AlbumItem>(
      `${process.env.REACT_APP_HOST_API_URL}/albums/${id}`,
      {
        params: { market: 'br' },
      }
    )
  }

  private static makeAccessTokenHeaders() {
    return {
      Authorization:
        'Basic  ' +
        btoa(
          `${process.env.REACT_APP_HOST_CLIENT_ID}:${process.env.REACT_APP_HOST_CLIENT_SECRET}`
        ),
      'Content-Type': 'application/x-www-form-urlencoded;',
    }
  }
}

export default new SpotifyApiService()
