import React, { Component } from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { ApplicationState } from './store'
import { Store } from 'redux'
import { History } from 'history'
import { Provider } from 'react-redux'
import Routes from './routes'
import './app.scss'
import Root from './shared/components/layout/Root'
import Header from './shared/components/layout/Header'
import Footer from './shared/components/layout/footer'

interface PropsFromDispatch {
  [key: string]: any
}

// Any additional component props go here.
interface OwnProps {
  store: Store<ApplicationState>
  history: History
}

// Create an intersection type of the component props and our Redux props.
type AllProps = PropsFromDispatch & OwnProps

class App extends Component<AllProps> {
  public render() {
    const { store, history } = this.props

    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div className="wrapper">
            <Header />
            <Root>
              <Routes />
            </Root>
          </div>
          <Footer />
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App
