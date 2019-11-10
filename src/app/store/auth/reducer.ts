import { Reducer } from 'redux'
import { AuthState, AuthActionTypes } from './types'
import spotifyApiService from '../../services/spotifyApiService'

const initialState: AuthState = {
  token: spotifyApiService.token,
  errors: undefined,
  loading: false,
  isLoggedIn: spotifyApiService.isLoggedIn,
}

const reducer: Reducer<AuthState> = (state = initialState, action) => {
  switch (action.type) {
    case AuthActionTypes.FETCH_REQUEST: {
      return { ...state, loading: true }
    }
    case AuthActionTypes.FETCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        isLoggedIn: spotifyApiService.isLoggedIn,
        token: action.payload,
      }
    }
    case AuthActionTypes.FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        isLoggedIn: spotifyApiService.isLoggedIn,
        errors: action.payload,
      }
    }
    default: {
      return state
    }
  }
}

export { reducer as authReducer }
