import React from 'react'

import { render } from 'react-dom'
import App from './components/app'

require('./dist/elemental.min')

render(<App />, document.getElementById('react-app'))
