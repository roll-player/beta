import React from 'react'
import { Card, Row, Col, Button, Glyph } from 'elemental'
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
    fetch(`/api/roll/${this.state.id}`, {
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
    let rendered = null 
    if (roll.left) {
      rendered = this.renderDie(roll.left)
    }

    if (roll.type === 'dice') {
      let dice = roll.rolledDice.map((die, index) => {
        let dieClass = die.__invalid__ ? 'roll--die-invalid' : 'roll--die-valid'

        if (die.__value__.toString() === die.__sides__) {
          dieClass += '--crit'
        }

        return (<div key={index} styleName='roll--die'>
          <span styleName={dieClass}>{die.__value__}</span>
        </div>)
      })

      let internal = [(<div>{roll.number}d{roll.sides}{roll.rightString}</div>), dice]

      return (
        <Row styleName='roll--die'>
          <Col>
            <Card>
              <Row>
                  {rendered}
              </Row>
              <Row>
                  {internal}
              </Row>
            </Card>
          </Col>
        </Row>
      )
    } else if(roll.__values__) {
      return roll.__values__.map(pair => {
        return (
          <Row styleName='roll--die'>
            <Col>
              <span styleName='roll--die-operator-roll'>{pair.operation}</span>
              {this.renderDie(pair.value)}
            </Col>
          </Row>
        )
      })
    } else {
      console.log(roll)
      return (<Row><Col>{rendered}{roll.value}</Col></Row>)
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
    let glyph = this.state.expanded ? 'triangle-up' : 'triangle-down'

    return (
      <Card>
        <Row styleName='roll--die-top'>
          <Col sm='10/12'>
            {this.state.roll} -> { this.state.dice.value }
          </Col>
          <Col sm='2/12' styleName='roll--die-right'>
            <Button type='hollow-primary' onClick={this.toggleExpand.bind(this)}><Glyph icon={ glyph } /></Button>
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
