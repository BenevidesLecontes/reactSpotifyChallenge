import { action } from 'typesafe-actions'

import { AudioActionTypes } from './types'

export const playOrPause = (payload: any) =>
  action(AudioActionTypes.PLAY_OR_PAUSE, payload)
export const playOrPauseSuccess = (payload: any) =>
  action(AudioActionTypes.PLAY_OR_PAUSE_SUCCESS, payload)
export const elapsedTime = (payload: any) =>
  action(AudioActionTypes.ELAPSED_TIME, payload)
export const stopPlayer = payload => action(AudioActionTypes.STOP, payload)
