import { AlbumItem } from '../../models/searchResponse'

export enum AlbumActionTypes {
  FETCH_REQUEST = '@@album/FETCH_REQUEST',
  FETCH_SUCCESS = '@@album/FETCH_SUCCESS',
  FETCH_ERROR = '@@album/FETCH_ERROR',
}

export interface AlbumState {
  readonly loading: boolean
  readonly album?: AlbumItem
  readonly errors?: any
}
