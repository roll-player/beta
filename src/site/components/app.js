import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import CSSModules from 'react-css-modules'

import Header from './header'
import styles from './styles/app.css'
import Roll from './roll'
import SpellSearch from './spellSearch'
import Spell from './spell'
import About from './about'
import Welcome from './welcome'
import Tracker from './tracker'
import CreateRoom from './createRoom'
import Room from './room'

const Root = props => {
  if (!props.children) {
    return (
      <div style={{padding: '10px'}}>
        <Header />
        <Welcome />
        <Roll {...props} />
        <SpellSearch {...props} />
      </div>
    )
  }

  return (
    <div style={{padding: '10px'}}>
      <Header />
      {props.children}
    </div>
  )
}

class App extends React.Component {
  render () {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={Root}>
          <Route path='/room' component={CreateRoom} />
          <Route path='/room/:id' component={Room} />
          <Route path='/roll' component={Roll} />
          <Route path='/spells' component={SpellSearch}>
            <Route path='/spell/:query' component={Spell} />
          </Route>
          <Route path='about' component={About} />
          <Route path='tracker' component={Tracker} />
        </Route>
      </Router>
    )
  }
}

export default CSSModules(App, styles)
