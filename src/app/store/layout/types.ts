import { TrackItem } from '../../models/searchResponse'

export const AudioActionTypes = {
  PLAY_OR_PAUSE: '@@audio/PLAY_OR_PAUSE',
  ELAPSED_TIME: '@@audio/ELAPSED_TIME',
  PLAY_OR_PAUSE_SUCCESS: '@@audio/PLAY_OR_PAUSE_SUCCESS',
  STOP: '@@audio/STOP',
}

export interface AudioState {
  readonly track?: TrackItem
  readonly playing: boolean
  readonly audio?: HTMLAudioElement
  readonly elapsedTime: number
  readonly paused?: boolean
}
