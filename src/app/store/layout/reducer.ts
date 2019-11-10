import { Reducer } from 'redux'
import audioService from '../../services/audio.service'
import { AudioActionTypes, AudioState } from './types'
const initialState: AudioState = {
  track: undefined,
  audio: undefined,
  playing: false,
  elapsedTime: 0,
}

const reducer: Reducer<AudioState> = (state = initialState, action) => {
  switch (action.type) {
    case AudioActionTypes.PLAY_OR_PAUSE: {
      audioService.playOrPauseTrack(
        action.payload.track.preview_url,
        action.payload.track,
        action.payload.dispatch
      )
      return state
    }
    case AudioActionTypes.PLAY_OR_PAUSE_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        paused: action.payload.audio.paused,
      }
    }
    case AudioActionTypes.ELAPSED_TIME: {
      return { ...state, elapsedTime: action.payload.elapsedTime }
    }
    case AudioActionTypes.STOP: {
      return initialState
    }
    default: {
      return state
    }
  }
}

export { reducer as layoutReducer }
