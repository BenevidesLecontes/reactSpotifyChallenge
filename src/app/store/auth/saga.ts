import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { AuthActionTypes } from './types'
import { fetchError, fetchSuccess } from './actions'
import spotifyApiService from '../../services/SpotifyApiService'

function* handleFetch() {
  try {
    const res = yield call(spotifyApiService.requestAccessToken as any)
    if (res.error) {
      yield put(fetchError(res))
    } else {
      yield put(fetchSuccess(spotifyApiService.token))
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(fetchError(err.stack!))
    } else {
      yield put(fetchError('An unknown error occured.'))
    }
  }
}

function* watchFetchRequest() {
  yield takeEvery(AuthActionTypes.FETCH_REQUEST, handleFetch)
}

function* authSaga() {
  yield all([fork(watchFetchRequest)])
}

export default authSaga
