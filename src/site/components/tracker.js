import React from 'react'
import { v4 } from 'uuid'

import { Row, Col, Button } from 'elemental'

import TrackerCreature from './trackerCreature'

class Tracker extends React.Component {
  constructor (props) {
    super(props)
    this.state = { creatures: [] }
  }

  addCreature () {
    this.setState({creatures: [...this.state.creatures, {name: 'New Creature', initiative: 0, id: v4()}]})
  }

  removeCreature (id) {
    const index = this.state.creatures.indexOf(id)
    this.setState({creatures: this.state.creatures.splice(index, 1)})
  }

  render () {
    let creatures = this.state.creatures.map(creature => (
      <Row key={creature.id}>
        <Col sm='1'>
          <TrackerCreature creature={creature} remove={this.removeCreature.bind(this)} />)
        </Col>
      </Row>
    ))

    return (
      <div styleName='tracker'>
        <h1>Initiative Tracker</h1>
        <Button type='primary' onClick={this.addCreature.bind(this)}>Add Creature</Button>
        {creatures}
      </div>
    )
  }
}

export default Tracker
