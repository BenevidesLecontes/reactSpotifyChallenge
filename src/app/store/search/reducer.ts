import { Reducer } from 'redux'
import { SearchActionTypes, SearchState } from './types'

const initialState: SearchState = {
  errors: undefined,
  loading: false,
  recentResults: {
    tracks: [],
    albums: [],
  },
}

const reducer: Reducer<SearchState> = (state = initialState, action) => {
  switch (action.type) {
    case SearchActionTypes.FETCH_REQUEST: {
      return { ...state, loading: true }
    }
    case SearchActionTypes.FETCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        results: action.payload,
      }
    }
    case SearchActionTypes.UPDATE_RECENT_RESULTS: {
      return {
        ...state,
        recentResults: action.payload.recentResults,
      }
    }
    case SearchActionTypes.FETCH_ERROR: {
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

export { reducer as searchReducer }
