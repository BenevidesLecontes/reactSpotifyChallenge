import * as React from 'react'
import { render } from 'react-dom'
import { createBrowserHistory } from 'history'
import configureStore from './app/configureStore'

import './assets/scss/index.scss'

const history = createBrowserHistory()

const initialState = (window as any).INITIAL_REDUX_STATE

const store = configureStore(history, initialState)

import App from './app/app'

render(<App history={history} store={store} />, document.getElementById('app'))
