import React from 'react'
import { v4 } from 'uuid'
import Immutable from 'immutable'
import { Row, Col, Button } from 'elemental'
import Togglable from './editors/togglable'

import TrackerCreature from './trackerCreature'
import CreatureManager from './creatureManager'

class Tracker extends React.Component {
  constructor (props) {
    super(props)
    this.state = { creatures: props.creatures || [] }
  }

  sort () {
    let { creatures } = this.state

    creatures.sort((a, b) => b.initiative - a.initiative)

    this.setState({creatures})
  }

  render () {
    const creatures = this.state.creatures.map(creature => (
      <Row key={creature.id}>
        <Col sm='1'>
          <TrackerCreature creature={creature} remove={this.removeCreature.bind(this)} />
        </Col>
      </Row>
    ))

    return (
      <div styleName='tracker'>
        <h1>Initiative Tracker</h1>
        <Row>
          <Col sm='1'>
            <CreatureManager onSelected={creature => {
              this.setState({creatures: [...this.state.creatures, creature]})
            }} />
          </Col>
        </Row>
        <Row>
          <Col sm='1'>
            <Button type='primary' onClick={this.sort.bind(this)}>Sort</Button>
          </Col>
        </Row>
        {creatures}
      </div>
    )
  }
}

export default Tracker
