import React, { FunctionComponent } from 'react'
import Player from './player'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../../../store'

const Footer: FunctionComponent = () => {
  const { playing } = useSelector(
    ({ audio: audioState }: ApplicationState) => audioState
  )
  return (
    <footer className={`${playing ? 'playing' : ''}`}>
      <Player />
    </footer>
  )
}

export default Footer
