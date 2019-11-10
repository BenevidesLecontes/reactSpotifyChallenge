import React, { FunctionComponent } from 'react'
import { AlbumItem, TrackItem } from '../../models/searchResponse'
import { Link } from 'react-router-dom'
import './items.scss'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { AudioActionTypes, playOrPause } from '../../store/layout'
import { ApplicationState } from '../../store'
import { SearchActionTypes, updateRecentResults } from '../../store/search'

interface Props {
  tracks: TrackItem[]
  albums: AlbumItem[]
}

const uniq = (arr, param) => {
  return Array.from(
    arr.reduce((m, t) => m.set(t[param], t), new Map()).values()
  )
}

const Items: FunctionComponent<Props> = ({ albums, tracks }) => {
  const { audio, playing, track: currentTrack } = useSelector(
    ({ audio: audioState }: ApplicationState) => audioState
  )

  const { recentResults } = useSelector(
    ({ search }: ApplicationState) => search
  )

  const dispatch = useDispatch()
  const store = useStore()

  return (
    <>
      {!!tracks.length && (
        <>
          <h5>Músicas</h5>
          <div className="results">
            {tracks.map(track => (
              <React.Fragment key={track.id}>
                {track.preview_url && (
                  <div
                    className={`card ${
                      playing && currentTrack?.id === track.id ? 'playing' : ''
                    }`}
                  >
                    <div className="card-image">
                      <img alt={track.name} src={track.album.images[0].url} />
                      <button
                        className="play-btn"
                        type="button"
                        onClick={() => {
                          dispatch(
                            playOrPause({
                              type: AudioActionTypes.PLAY_OR_PAUSE,
                              track,
                              dispatch: store.dispatch,
                            })
                          )
                          dispatch(
                            updateRecentResults({
                              type: SearchActionTypes.UPDATE_RECENT_RESULTS,
                              recentResults: {
                                ...recentResults,
                                tracks: [
                                  ...uniq(
                                    [...recentResults.tracks, track],
                                    'preview_url'
                                  ),
                                ],
                              },
                            })
                          )
                        }}
                      >
                        <i
                          className={`fa ${
                            playing &&
                            !audio?.paused &&
                            currentTrack?.id === track.id
                              ? 'fa-pause'
                              : 'fa-play'
                          }`}
                        />
                      </button>
                    </div>
                    <div className="card-footer">
                      <p>{track.album.name}</p>
                      <p>{track.artists[0]?.name}</p>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </>
      )}

      {!!albums.length && (
        <>
          <h5>Álbuns</h5>
          <div className="results">
            {albums.map(album => (
              <Link
                to={`/albums/${album.id}`}
                onClick={() =>
                  dispatch(
                    updateRecentResults({
                      type: SearchActionTypes.UPDATE_RECENT_RESULTS,
                      recentResults: {
                        ...recentResults,
                        albums: [
                          ...uniq(
                            [...recentResults.albums, album],
                            'preview_url'
                          ),
                        ],
                      },
                    })
                  )
                }
                className="card"
                key={album.id}
              >
                <div className="card-image">
                  <img alt={album?.name} src={album.images[1]?.url} />
                </div>
                <div className="card-footer">
                  <p>{album.name}</p>
                  <p>{album.artists[0]?.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  )
}

export default Items
