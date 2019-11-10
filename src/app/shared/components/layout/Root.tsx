import * as React from 'react'

const Root: React.FunctionComponent = ({ children }) => (
  <main className="content" role="main">
    {children}
  </main>
)

export default Root
