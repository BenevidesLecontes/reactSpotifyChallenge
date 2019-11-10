import React, { FunctionComponent, memo, useEffect, useState } from 'react'
import Filter from '../../shared/components/filter'
import { RouteComponentProps, useHistory } from 'react-router'
import useDebounce from '../../shared/hooks/debounce'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRequest } from '../../store/search'
import Results from '../../shared/components/results'
import { ApplicationState } from '../../store'
import Items from '../../shared/components/items'

interface MatchParams {
  query: string
}

const Search: FunctionComponent<RouteComponentProps<MatchParams>> = props => {
  const { children, ...others } = props
  const { query: term } = others.match.params
  const [query, setQuery] = useState(term)
  const history = useHistory()
  const dispatch = useDispatch()
  const { recentResults } = useSelector(
    ({ search }: ApplicationState) => search
  )

  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    if (query) {
      history.push(`/search/${query}`)
      dispatch(fetchRequest(query))
    } else {
      history.push('/search')
    }
  }, [debouncedQuery])

  const childrenProps = { ...others, query }

  return (
    <>
      <Filter initialQuery={term || ''} onSearch={e => setQuery(e)} />
      {!!query && <Results query={query} {...childrenProps} />}
      {recentResults.albums.length > 0 ||
        (recentResults.tracks.length > 0 && (
          <>
            <h3 className="search-info">Buscas recentes</h3>
            <Items
              tracks={recentResults.tracks}
              albums={recentResults.albums}
            />
          </>
        ))}
      {!query &&
        !recentResults.albums.length &&
        !recentResults.tracks.length && (
          <h3 className="search-info">
            Encontre suas músicas e álbuns favoritos.
          </h3>
        )}
    </>
  )
}

export default memo(Search)
