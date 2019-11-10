import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import './header.scss'

const Header: FunctionComponent = () => (
  <header>
    <nav className="toolbar">
      <Link className="logo" to="/">
        <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15,0A15,15,0,1,0,30,15,15,15,0,0,0,15,0Zm6.09,22.08a1.14,1.14,0,0,1-.64-.23,15.09,15.09,0,0,0-7.76-2A23,23,0,0,0,8,20.37a5.39,5.39,0,0,1-.74.15.94.94,0,0,1-1-.95,1,1,0,0,1,.82-1,25.09,25.09,0,0,1,5.61-.66,16.7,16.7,0,0,1,8.73,2.26,1,1,0,0,1,.59,1A.94.94,0,0,1,21.09,22.08Zm1.63-4a1.38,1.38,0,0,1-.75-.26,19,19,0,0,0-9.53-2.41,18.62,18.62,0,0,0-4.89.63,2.53,2.53,0,0,1-.73.16,1.17,1.17,0,0,1-1.17-1.17,1.2,1.2,0,0,1,.93-1.26A20.86,20.86,0,0,1,12.49,13,21,21,0,0,1,23.2,15.75a1.21,1.21,0,0,1,.69,1.18A1.17,1.17,0,0,1,22.72,18.11Zm1.86-4.62a1.36,1.36,0,0,1-.77-.23c-2.72-1.63-6.93-2.52-11-2.52a22.89,22.89,0,0,0-6,.72,3.26,3.26,0,0,1-.77.16,1.4,1.4,0,0,1-1.41-1.43,1.43,1.43,0,0,1,1-1.44,25.22,25.22,0,0,1,7.12-.92c4.4,0,9,.91,12.42,2.89A1.43,1.43,0,0,1,26,12.09,1.4,1.4,0,0,1,24.58,13.49Z"
            id="WTF"
          />
        </svg>
      </Link>
    </nav>
  </header>
)

export default Header
