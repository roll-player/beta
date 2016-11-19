import React from 'react'
import { Card, Row, Col, Button } from 'elemental'
import 'whatwg-fetch'

import CSSModules from 'react-css-modules'
import styles from './styles/rollcard.css'

class RollCard extends React.Component {
  constructor (props) {
    super(props)

    const { roll, id } = props.roll
    this.state = { roll, id, dice: {}, expanded: false }

    this.getRoll()
  }

  getRoll () {
    fetch(`http://localhost:8080/roll/${this.state.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        diceString: this.state.roll
      })
    }).then(response => {
      return response.json()
    }).then(json => {
      this.setState({ dice: json })
    })
  }

  toggleExpand () {
    this.setState({expanded: !this.state.expanded })  
  }

  renderDie (roll) {
    if (roll.type === 'dice') {
      let dice = roll.rolledDice.map((dice, index) => (
        <div key={index} styleName='roll--die'>
          <span styleName={dice.__invalid__ ? 'roll--die-invalid' : 'roll--die-valid'}>{dice.__value__}</span>
          <span styleName='roll--die-operator'>{index != roll.number - 1 ? '+' : ''}</span>
        </div>
      ))

      let internal = [(<div>{roll.number}d{roll.sides}{roll.rightString}</div>), dice]

      return (
        <div styleName='roll--die'>
          {internal}
        </div>
      )
    } else if(roll.__values__) {

      return roll.__values__.map(pair => {
        return (
          <div styleName='roll--die'>
            <span styleName='roll--die-operator-roll'>{pair.operation}</span>
            {this.renderDie(pair.value)}
          </div>
        )
      })
    } else {
      return (<div>{roll.value}</div>)
    }
  }

  renderExpandedDice() {
    if (this.state.expanded) {
      return this.renderDie(this.state.dice.roll)
    }
  }

  render () {
    let value = this.state.dice.value || '...'
    let expanded = this.renderExpandedDice()
    return (
      <Card>
        <Row>
        <Col sm='11/12'>
          {this.state.roll} -> { this.state.dice.value }
        </Col>
        <Col sm='1/12'>
          <Button onClick={this.toggleExpand.bind(this)}>+</Button>
        </Col>
        </Row>
        <Row>
          <Col styleName='roll--die-container'>
            {expanded}
          </Col>
        </Row>
      </Card>
    )
  }
}

export default CSSModules(RollCard, styles)
