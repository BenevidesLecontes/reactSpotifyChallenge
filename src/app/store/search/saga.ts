import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { SearchActionTypes } from './types'
import { fetchError, fetchSuccess } from './actions'
import spotifyApiService from '../../services/spotifyApiService'

function* handleFetch(action: any) {
  try {
    const res = yield call(spotifyApiService.searchApi as any, action.payload)
    if (res.error) {
      yield put(fetchError(res))
    } else {
      yield put(fetchSuccess(res.data))
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchError(err.stack!))
    } else {
      yield put(fetchError('An unknown error occurred.'))
    }
  }
}

function* watchFetchRequest() {
  yield takeEvery(SearchActionTypes.FETCH_REQUEST, handleFetch)
}

function* searchSaga() {
  yield all([fork(watchFetchRequest)])
}

export default searchSaga
