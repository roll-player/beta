import React from 'react'
import { v4 } from 'uuid'

import { Row, Col, Button } from 'elemental'

import TrackerCreature from './trackerCreature'

const generateCreature = () => {
  return {
    id: v4(),
    name: 'New Creature',
    initiative: 0,
    useable: ['action', 'bonus action', 'movement', 'reaction'],
    attacks: [],
    spells: [],
    abilities: [],
    notes: '',
    abilityScores: [
      { name: 'STR', score: 10 },
      { name: 'DEX', score: 10 },
      { name: 'CON', score: 10 },
      { name: 'INT', score: 10 },
      { name: 'WIS', score: 10 },
      { name: 'CHA', score: 10 }
    ],
    AC: 10,
    speed: 25,
    toFields: () => {
      return [
        { type: 'string', name: 'name' },
        { type: 'number', name: 'initiative' },
        { type: 'array', name: 'useable', typeOf: 'string' },
        { type: 'array', name: 'attacks', typeOf: 'Attack' },
        { type: 'array', name: 'spells', typeOf: 'Spell' },
        { type: 'array', name: 'abilities', typeOf: 'Ability' },
        { type: 'string', name: 'notes' },
        { type: 'array', name: 'abilityScores', typeOf: 'Ability Score' },
        { type: 'number', name: 'AC' },
        { type: 'number', name: 'speed' }
      ]
    }
  }
}
class Tracker extends React.Component {
  constructor (props) {
    super(props)
    this.state = { creatures: [] }
  }

  addCreature () {
    this.setState({creatures: [...this.state.creatures, generateCreature()]})
  }

  removeCreature (id) {
    this.setState({creatures: this.state.creatures.filter(creature => creature.id != id)})
  }

  sort () {
    let { creatures } = this.state

    creatures.sort((a, b) => a.initiative - b.initiative)
    this.setState({creatures})
  }

  render () {
    let creatures = this.state.creatures.map(creature => (
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
            <Button type='primary' onClick={this.addCreature.bind(this)}>Add Creature</Button>
            <Button type='primary' onClick={this.sort.bind(this)}>Sort</Button>
          </Col>
        </Row>
        {creatures}
      </div>
    )
  }
}

export default Tracker
