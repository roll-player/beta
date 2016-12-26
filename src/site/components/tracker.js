import React from 'react'
import { v4 } from 'uuid'
import Immutable from 'immutable'
import { Row, Col, Button } from 'elemental'

import TrackerCreature from './trackerCreature'
const generateEditableProperty = property => {
  let newProperty = {}
  newProperty[v4()] = Immutable.Map({
    ...property,
    isEditable: true
  })

  return newProperty
}

const generateCreature = () => {
  let creature = Immutable.Map({
    id: v4(),
    useable: [
      { name: 'action', value: 'action', used: false },
      { name: 'bonus_action', value: 'bonus action', used: false },
      { name: 'movement', value: 'movement',used: false },
      { name: 'reaction', value: 'reaction', used: false }
    ],
    attacks: [],
    spells: [],
    abilities: [],
    abilityScores: [
      { name: 'STR', score: 10 },
      { name: 'DEX', score: 10 },
      { name: 'CON', score: 10 },
      { name: 'INT', score: 10 },
      { name: 'WIS', score: 10 },
      { name: 'CHA', score: 10 }
    ]
  })

  creature = creature.merge(generateEditableProperty({name: 'avatar', value: '', type: 'string'}))
  creature = creature.merge(generateEditableProperty({name: 'name', value: 'New Creature', type: 'string'}))
  creature = creature.merge(generateEditableProperty({name: 'initiative', value: 0, type: 'number'}))
  creature = creature.merge(generateEditableProperty({name: 'AC', value: 10, type: 'number'}))
  creature = creature.merge(generateEditableProperty({name: 'hpMax', value: 30, type: 'number'}))
  creature = creature.merge(generateEditableProperty({name: 'hpCurrent', value: 30, type: 'number'}))
  creature = creature.merge(generateEditableProperty({name: 'speed', value: 25, type: 'number'}))
  creature = creature.merge(generateEditableProperty({name: 'notes', value: '', type: 'string'}))

  return creature
}
class Tracker extends React.Component {
  constructor (props) {
    super(props)
    let test = generateCreature()
    this.state = { creatures: [test] }
  }

  addCreature () {
    this.setState({creatures: [...this.state.creatures, generateCreature()]})
  }

  removeCreature (id) {
    this.setState({creatures: this.state.creatures.filter(creature => creature.id != id)})
  }

  sort () {
    let { creatures } = this.state

    creatures.sort((a, b) => b.initiative - a.initiative)
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
