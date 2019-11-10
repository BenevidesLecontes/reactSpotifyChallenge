import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import spotifyApiService from '../../services/spotifyApiService'
import { fetchError, fetchSuccess } from './actions'
import { AlbumActionTypes } from './types'

function* handleFetchAlbum(action: any) {
  try {
    const res = yield call(
      spotifyApiService.getAlbum as any,
      action.payload.idAlbum
    )
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
  yield takeEvery(AlbumActionTypes.FETCH_REQUEST, handleFetchAlbum)
}

function* albumSaga() {
  yield all([fork(watchFetchRequest)])
}

export default albumSaga
