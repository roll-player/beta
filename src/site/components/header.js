import React from 'react'
import CSSModules from 'react-css-modules'
import { Link } from 'react-router'
import { Row, Col } from 'elemental'

import styles from './styles/header.css'

class Header extends React.Component {
  render () {
    return (
      <div styleName='nav--container'>
        <Row styleName='header--header-row'>
          <Col sm='1/6'>
            <div styleName='header--header-logo'>
              <Link to='/'>Roll Player</Link>
            </div>
          </Col>
          <Col sm='2/3' styleName='header--header-nav'>
            <div styleName='header--header-navitem'>
              <Link to='/roll'>Roll Dice</Link>
            </div>
            <div styleName='header--header-navitem'>
              <Link to='/spells'>Spells</Link>
            </div>
            <div styleName='header--header-navitem'>
              <Link to='/about'>About</Link>
            </div>
          </Col>
          <Col sm='1/6' />
        </Row>
      </div>
    )
  }
}

export default CSSModules(Header, styles)
