import React from 'react'
import { render } from 'react-dom'
import App from './components/App.js'
import { initializeIcons } from '@uifabric/icons'
initializeIcons()

render(
  <App />,
  document.getElementById('root')
)
