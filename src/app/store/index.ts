import { combineReducers } from 'redux'
import { all, fork } from 'redux-saga/effects'
import { AudioState, layoutReducer } from './layout'
import { authReducer } from './auth/reducer'
import authSaga from './auth/saga'
import { AuthState } from './auth'
import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'
import searchSaga from './search/saga'
import { searchReducer, SearchState } from './search'
import { albumReducer, AlbumState } from './album'
import albumSaga from './album/saga'

export interface ApplicationState {
  audio: AudioState
  session: AuthState
  album: AlbumState
  search: SearchState
  router: RouterState
}

export const rootReducer = (history: History) =>
  combineReducers<ApplicationState>({
    audio: layoutReducer,
    session: authReducer,
    album: albumReducer,
    search: searchReducer,
    router: connectRouter(history),
  })

export function* rootSaga() {
  yield all([fork(authSaga), fork(searchSaga), fork(albumSaga)])
}
