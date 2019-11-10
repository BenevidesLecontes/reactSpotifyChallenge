import * as React from 'react'
import { memo, useEffect, useState } from 'react'
import { Redirect, Route, Switch } from 'react-router'
import Search from './pages/search/search'
import Album from './pages/album/album'
import spotifyApiService from './services/spotifyApiService'

const redirect = () => <Redirect to="search" />

const AuthenticatedRoute = ({ component: C, appProps, ...rest }) => {
  return (
    <Route {...rest} exact render={props => <C {...props} {...appProps} />} />
  )
}

const Routes: React.FunctionComponent = () => {
  const [isAuthenticated, userHasAuthenticated] = useState(
    spotifyApiService.isLoggedIn
  )

  useEffect(() => {
    onLoad()
  }, [])

  async function onLoad() {
    if (!isAuthenticated) {
      try {
        await spotifyApiService.requestAccessToken()
        userHasAuthenticated(true)
      } catch (e) {
        userHasAuthenticated(false)
      }
    }
  }

  return (
    <Switch>
      <AuthenticatedRoute
        path="/albums/:idAlbum"
        component={Album}
        appProps={{ isAuthenticated }}
      />
      <AuthenticatedRoute
        path="/search/:query?"
        component={Search}
        appProps={{ isAuthenticated }}
      />
      <Route path="/" exact render={redirect} />
    </Switch>
  )
}

export default memo(Routes)
