import { action } from 'typesafe-actions'
import { AuthActionTypes } from './types'

export const fetchRequest = () => action(AuthActionTypes.FETCH_REQUEST)
export const fetchSuccess = data => action(AuthActionTypes.FETCH_SUCCESS, data)
export const fetchError = (message: string) =>
  action(AuthActionTypes.FETCH_ERROR, message)
