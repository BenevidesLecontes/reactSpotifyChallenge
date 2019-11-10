import {
  AlbumItem,
  SearchResponse,
  TrackItem,
} from '../../models/searchResponse'

export enum SearchActionTypes {
  FETCH_REQUEST = '@@search/FETCH_REQUEST',
  FETCH_SUCCESS = '@@search/FETCH_SUCCESS',
  FETCH_ERROR = '@@search/FETCH_ERROR',
  UPDATE_RECENT_RESULTS = '@@search/UPDATE_RECENT_RESULTS',
}

export interface SearchState {
  readonly loading: boolean
  readonly results?: SearchResponse
  readonly recentResults: {
    tracks: TrackItem[]
    albums: AlbumItem[]
  }
  readonly errors?: any
}
