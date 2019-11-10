import { Reducer } from 'redux'
import { AlbumActionTypes, AlbumState } from './types'

const initialState: AlbumState = {
  errors: undefined,
  loading: false,
}

const reducer: Reducer<AlbumState> = (state = initialState, action) => {
  switch (action.type) {
    case AlbumActionTypes.FETCH_REQUEST: {
      return { ...state, loading: true }
    }
    case AlbumActionTypes.FETCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        album: action.payload,
      }
    }
    case AlbumActionTypes.FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        errors: action.payload,
      }
    }
    default: {
      return state
    }
  }
}

export { reducer as albumReducer }
