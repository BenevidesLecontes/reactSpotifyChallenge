import { Token } from '../../models/token'

export enum AuthActionTypes {
  FETCH_REQUEST = '@@auth/FETCH_REQUEST',
  FETCH_SUCCESS = '@@auth/FETCH_SUCCESS',
  FETCH_ERROR = '@@auth/FETCH_ERROR',
}

export interface AuthState {
  readonly loading: boolean
  readonly isLoggedIn: boolean
  readonly token?: Token
  readonly errors?: any
}
