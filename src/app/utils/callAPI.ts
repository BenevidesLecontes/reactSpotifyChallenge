import axios, { AxiosRequestConfig } from 'axios'
import qs from 'qs'
import { Token } from '../models/token'
import { cloneDeep, set } from 'lodash'
import spotifyApiService from '../services/SpotifyApiService'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRequest } from '../store/auth'
import { ApplicationState } from '../store'

export const API = axios.create({})

API.defaults.paramsSerializer = params =>
  qs.stringify(params, { arrayFormat: 'brackets' })

const addAuthorizationToHeaders = config => {
  const token: Token = spotifyApiService.token
  if (!token) {
    return config
  }

  if (spotifyApiService.isLoggedIn) {
    set(
      config,
      'headers.Authorization',
      `${token.token_type} ${token.access_token}`
    )
  } else if (
    !spotifyApiService.isLoggedIn &&
    token &&
    !config.url.includes('token')
  ) {
    const PREVIOUS_REQUEST: AxiosRequestConfig = cloneDeep(config)
    try {
      const dispatch = useDispatch()
      dispatch(fetchRequest())

      const { token_type, access_token } = useSelector(
        (state: ApplicationState) => state.session.token || ({} as Token)
      )
      set(
        PREVIOUS_REQUEST,
        'headers.Authorization',
        `${token_type} ${access_token}`
      )
    } catch (e) {
      console.log(e)
    }
    return PREVIOUS_REQUEST
  }

  return config
}

API.interceptors.request.use((config: AxiosRequestConfig) => {
  return addAuthorizationToHeaders(config)
})
