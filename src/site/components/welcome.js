import React from 'react'
import { Row, Col } from 'elemental'

import CSSModules from 'react-css-modules'

import styles from './styles/welcome.css'

const Welcome = () => (
  <Row styleName='welcome--container'>
    <Col sm='10/12'>
      <h1>Welcome to Roll Player!</h1>
      <p>Try out the dice roller or the spell finder</p>
      <p>Follow us on twitter <a href='https://twitter.com/rollplayerapp'>@rollplayerapp</a> for updates and news!</p>
    </Col>
  </Row>
)

export default CSSModules(Welcome, styles)
