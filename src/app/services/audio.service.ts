import { TrackItem } from '../models/searchResponse'
import {
  AudioActionTypes,
  elapsedTime,
  playOrPauseSuccess,
  stopPlayer,
} from '../store/layout'

type Nullable<T> = T | null

class AudioService {
  audio: Nullable<HTMLAudioElement>
  track: Nullable<TrackItem>
  playing: boolean
  elapsedTime: number
  private dispatch

  playOrPauseTrack(nextTrackUrl, track: TrackItem, dispatch) {
    this.dispatch = dispatch
    this.pauseTrack()
    // Do nothing, if next and current track are the same
    if (this.track && this.track.preview_url === nextTrackUrl) {
      // Do a dispatch inside a reducer context
      const timer = setTimeout(() => {
        this.dispatch(
          playOrPauseSuccess({
            type: AudioActionTypes.PLAY_OR_PAUSE_SUCCESS,
            elapsedTime: this.elapsedTime,
            audio: this.audio,
            track: this.track,
            playing: this.playing,
          })
        )
        clearTimeout(timer)
      }, 0)
      // Stop current track
      return
    }

    // Play track
    if (this.audio) {
      this.audio.pause()
    }
    this.track = track
    this.audio = new Audio(nextTrackUrl)
    this.audio.play().then(() => {
      this.audio?.addEventListener('ended', () => {
        this.elapsedTime = 0
        this.audio = null
        this.track = null
        this.playing = false
        this.dispatch(
          stopPlayer({
            type: AudioActionTypes.STOP,
          })
        )
      })

      const interval = setInterval(() => {
        if (this.audio?.duration) {
          this.elapsedTime = this.audio?.currentTime / this.audio?.duration
        }
        if (!this.playing) {
          clearInterval(interval)
          this.elapsedTime = 0
        }
        this.dispatch(
          elapsedTime({
            type: AudioActionTypes.ELAPSED_TIME,
            elapsedTime: this.elapsedTime,
          })
        )
      }, 1000)

      this.playing = true
      this.dispatch(
        playOrPauseSuccess({
          type: AudioActionTypes.PLAY_OR_PAUSE_SUCCESS,
          elapsedTime: this.elapsedTime,
          audio: this.audio,
          track: this.track,
          playing: this.playing,
        })
      )
    })
  }

  pauseTrack() {
    if (this.audio) {
      if (!this.audio.paused) {
        this.audio.pause()
      } else {
        this.audio.play()
      }
    }
  }
}

export default new AudioService()
