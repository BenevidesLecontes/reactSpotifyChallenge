import React, { FunctionComponent } from 'react'
import Items from './items'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../../store'
import { Albums, SearchResponse, Tracks } from '../../models/searchResponse'

interface Props {
  query
}

const Results: FunctionComponent<Props> = props => {
  const { query } = props
  const searchState = useSelector((state: ApplicationState) => state.search)

  const {
    tracks: { items: trackItems = [] } = {} as Tracks,
    albums: { items: albumItems = [] } = {} as Albums,
  } = searchState.results || ({} as SearchResponse)
  return (
    <>
      <h4 className="search-info">Resultados encontrados para {query}</h4>
      {trackItems.length && albumItems.length ? (
        <Items tracks={trackItems} albums={albumItems} />
      ) : (
        []
      )}
    </>
  )
}
export default Results
