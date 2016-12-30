import React from 'react'
import { v4 } from 'uuid'
import Immutable from 'immutable'
import { Row, Col, Button } from 'elemental'
import Togglable from './editors/togglable'

import TrackerCreature from './trackerCreature'
const generateEditableProperty = property => {
  let newProperty = {}
  newProperty[property.name] = { 
    ...property,
    isEditable: true,
  }

  return newProperty
}

const generateCreature = () => {
  let creature = {
    id: v4(),
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
  }

  creature = Object.assign(creature, generateEditableProperty({
    name: 'useables', 
    value: [ 
      { name: 'action', value: 'action', used: false },
      { name: 'bonus_action', value: 'bonus action', used: false },
      { name: 'movement', value: 'movement', used: false },
      { name: 'reaction', value: 'reaction', used: false }
    ], 
    type: 'array', 
    actions: [
      {
        type: 'primary',
        onClick: (context) => {
          const newCreature = Immutable.fromJS({ name: 'new_useable', value: 'useable', used: false })
          context.onListChanged('useables', context.list.push(newCreature))
        },
        text: 'Add'
      }
    ],
    render: (item, onChanged) => (<Togglable togglable={item} onChanged={onChanged} />)
  }))

  creature = Object.assign(creature, generateEditableProperty({name: 'avatar', value: '', type: 'string'}))
  creature = Object.assign(creature, generateEditableProperty({name: 'name', value: 'New Creature', type: 'string'}))
  creature = Object.assign(creature, generateEditableProperty({name: 'initiative', value: 0, type: 'number'}))
  creature = Object.assign(creature, generateEditableProperty({name: 'AC', value: 10, type: 'number'}))
  creature = Object.assign(creature, generateEditableProperty({name: 'hpMax', value: 30, type: 'number'}))
  creature = Object.assign(creature, generateEditableProperty({name: 'hpCurrent', value: 30, type: 'number'}))
  creature = Object.assign(creature, generateEditableProperty({name: 'speed', value: 25, type: 'number'}))
  creature = Object.assign(creature, generateEditableProperty({name: 'notes', value: '', type: 'string'}))

  return Immutable.fromJS(creature)
}
class Tracker extends React.Component {
  constructor (props) {
    super(props)
    let test = generateCreature()
    this.state = { creatures: Immutable.fromJS([test]) }
  }

  addCreature () {
    this.updateCreatures(this.state.creatures.push(generateCreature()))
  }

  removeCreature (id) {
    this.updateCreatures(this.state.creatures.del(id))
  }

  updateCreatures (creatures) {
    this.setState({creatures})
  }

  sort () {
    let { creatures } = this.state

    creatures.sort((a, b) => b.initiative - a.initiative)
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
