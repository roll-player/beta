import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import CSSModules from 'react-css-modules'

import Header from './header'
import styles from './styles/app.css'
import Roll from './roll'
import SpellSearch from './spellSearch'
import Spell from './spell'
import About from './about'

const Root = props => {    
  return (
    <div style={ {padding: '10px' }}>
      <Header /> 
      { props.children }
    </div>
  )
}

class App extends React.Component {
  render () {
    return (
      <Router history={ browserHistory }>
        <Route path='/' component={ Root }>
          <Route path='roll' component={ Roll } />
          <Route path='spells' component = { SpellSearch }>
            <Route path='spell/:query' component = { Spell } />
          </Route>
          <Route path='about' component={ About }/>
        </Route>
      </Router>
    )
  }
}

export default CSSModules(App, styles)
