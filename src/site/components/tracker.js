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
    this.state = { creatures: props.creatures || Immutable.List([]) }
  }

  sort () {
    let { creatures } = this.state
    const sorted = creatures.sort((a, b) => { 
      const aValue = +a.get('initiative').get('value')
      const bValue = +b.get('initiative').get('value')
      console.log(bValue - aValue, a, b)
      return bValue - aValue
    })

    this.setState({creatures: sorted})
  }

  removeCreature (index) {
    this.setState({creatures: this.state.creatures.remove(index)})
  }

  updateCreature (index, creature) {
    this.setState({creatures: this.state.creatures.set(index, creature)})
  }

  render () {
    const creatures = this.state.creatures.map((creature, index) => (
      <Row key={`${index}_${creature.id}`}>
        <Col sm='1'>
          <TrackerCreature 
            creature={creature} 
            remove={this.removeCreature.bind(this, index)} 
            updated={this.updateCreature.bind(this, index)}
          />
        </Col>
      </Row>
    ))

    return (
      <div styleName='tracker'>
        <h1>Initiative Tracker</h1>
        <Row>
          <Col sm='1'>
            <CreatureManager 
              onSelected={creature => {
                this.setState({creatures: this.state.creatures.push(creature)})
              }} 
            />
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
