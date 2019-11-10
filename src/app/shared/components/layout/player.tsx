import React, { FunctionComponent, memo } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { ApplicationState } from '../../../store'
import { msToTime } from '../../../utils'
import './player.scss'
import { AudioActionTypes, playOrPause } from '../../../store/layout'

const Thumb: any = styled.div`
  left: ${props => (props as any).elapsedTime}% !important;
`

Thumb.defaultProps = {
  elapsedTime: 0,
}

const Player: FunctionComponent = () => {
  const { audio, playing, track, elapsedTime } = useSelector(
    ({ audio: audioState }: ApplicationState) => audioState
  )

  const dispatch = useDispatch()
  const store = useStore()

  const last = track?.artists[track.artists.length - 1]

  return (
    <div className="player-container">
      <div className="now-playing">
        <div className="media">
          {track?.album?.images[0]?.url ? (
            <img alt={track?.name} src={track?.album?.images[0]?.url} />
          ) : (
            []
          )}
        </div>
        <div className="info">
          <h5>{track?.name}</h5>
          <p>
            {track?.artists.map(artist => (
              <span key={artist.id}>
                {artist?.name}
                {last?.id === artist.id ? '' : ', '}
              </span>
            ))}
          </p>
        </div>
      </div>
      <div className=" controls">
        <div className=" action-button">
          <a
            className={`play-pause active`}
            onClick={() =>
              dispatch(
                playOrPause({
                  type: AudioActionTypes.PLAY_OR_PAUSE,
                  track,
                  dispatch: store.dispatch,
                })
              )
            }
          >
            <i
              className={`fa ${
                playing && !audio?.paused ? 'fa-pause' : 'fa-play'
              }`}
            />
          </a>
        </div>
        <div className="player">
          <div className="time-rail">
            <Thumb className="thumb" elapsedTime={(elapsedTime || 0) * 100} />
            <div className="track" />
          </div>
          <div className="time">
            <small className="current">
              {msToTime(audio?.currentTime as number)}
            </small>
            /
            <small className="duration">
              {msToTime(track?.duration_ms as number, true)}
            </small>
          </div>
        </div>
      </div>
    </div>
  )
}
export default memo(Player)
