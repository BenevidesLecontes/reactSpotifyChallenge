import { action } from 'typesafe-actions'
import { SearchActionTypes } from './types'

export const fetchRequest = (query: string) =>
  action(SearchActionTypes.FETCH_REQUEST, query)
export const fetchSuccess = data =>
  action(SearchActionTypes.FETCH_SUCCESS, data)
export const updateRecentResults = data =>
  action(SearchActionTypes.UPDATE_RECENT_RESULTS, data)
export const fetchError = (message: string) =>
  action(SearchActionTypes.FETCH_ERROR, message)
