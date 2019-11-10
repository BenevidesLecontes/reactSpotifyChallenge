import React, { FunctionComponent, useState } from 'react'
import styled from 'styled-components'

const Input = styled.input`
  font-size: 48px;
  font-weight: bold;
  font-family: Roboto, sans-serif;
  color: white;
`

interface Props {
  initialQuery: string
  onSearch: (term: string) => void
}

const Filter: FunctionComponent<Props> = ({ initialQuery, onSearch }) => {
  const [query, setQuery] = useState(initialQuery)

  return (
    <form>
      <div className="group">
        <label htmlFor="search">Busque por artistas, álbuns ou músicas</label>
        <Input
          type="search"
          autoComplete="off"
          id="search"
          value={query}
          className="search-input"
          onChange={e => {
            const { value } = e.target
            setQuery(value)
            onSearch(value)
          }}
          placeholder=" Comece a escrever..."
        />
        <span className=" highlight" />
        <span className=" input-bar" />
      </div>
    </form>
  )
}

export default Filter
