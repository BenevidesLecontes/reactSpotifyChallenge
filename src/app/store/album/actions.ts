import { action } from 'typesafe-actions'
import { AlbumActionTypes } from './types'

export const fetchRequest = payload =>
  action(AlbumActionTypes.FETCH_REQUEST, payload)
export const fetchSuccess = data => action(AlbumActionTypes.FETCH_SUCCESS, data)
export const fetchError = (message: string) =>
  action(AlbumActionTypes.FETCH_ERROR, message)
