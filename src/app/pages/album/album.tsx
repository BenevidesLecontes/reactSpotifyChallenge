import React, { FunctionComponent, useEffect } from 'react'
import styled from 'styled-components'
import { msToTime } from '../../utils'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { ApplicationState } from '../../store'
import './album.scss'
import { AlbumActionTypes, fetchRequest } from '../../store/album'
import { RouteComponentProps } from 'react-router'
import { AudioActionTypes, playOrPause } from '../../store/layout'

const Img = styled.img`
  width: ${props => props.width};
`

interface MatchParams {
  idAlbum: string
}

const Album: FunctionComponent<RouteComponentProps<MatchParams>> = props => {
  const { idAlbum } = props.match.params

  const { playing, paused, track: currentTrack } = useSelector(
    ({ audio: audioState }: ApplicationState) => audioState
  )
  const { album, loading } = useSelector(({ album }: ApplicationState) => album)
  const dispatch = useDispatch()
  const store = useStore()

  useEffect(() => {
    dispatch(
      fetchRequest({
        type: AlbumActionTypes.FETCH_REQUEST,
        idAlbum,
      })
    )
  }, [])

  if (loading) {
    return <></>
  }

  return (
    <>
      <button
        className="btn-back"
        type="button"
        onClick={() => props.history.goBack()}
      >
        <i className="fa fa-angle-left" /> voltar
      </button>
      <div className="album-media">
        <div className="card">
          <div className="card-image">
            <Img
              alt={album?.name}
              src={album?.images[1]?.url}
              width={album?.images[1]?.width}
            />
          </div>
          <div className="card-footer">
            <p>{album?.name}</p>
            <p>{album?.artists[0]?.name}</p>
          </div>
        </div>
        <div className="music-list">
          <ol type="1">
            {album?.tracks.items.map(track => (
              <li
                key={track.id}
                className={`${
                  playing && currentTrack?.id === track.id ? 'playing' : ''
                }`}
              >
                <div className="track-info">
                  <div className="icons-wrapper">
                    {playing && currentTrack?.id === track.id && !paused && (
                      <i className="fa fa-volume-up" />
                    )}
                    <i
                      onClick={() =>
                        track.preview_url &&
                        dispatch(
                          playOrPause({
                            type: AudioActionTypes.PLAY_OR_PAUSE,
                            track: {
                              ...track,
                              album: {
                                ...track.album,
                                images: album.images,
                              },
                            },
                            dispatch: store.dispatch,
                          })
                        )
                      }
                      className={`fa ${
                        !playing ||
                        paused ||
                        (playing && currentTrack?.id !== track.id)
                          ? 'fa-play'
                          : 'fa-pause'
                      }`}
                    />
                  </div>
                  <p>{track.name}</p>
                  <p>{msToTime(track.duration_ms, true)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  )
}
export default Album
