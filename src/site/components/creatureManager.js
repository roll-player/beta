import React from 'react'
import Immutable from 'immutable'
import { v4 } from 'uuid'
import { Card, Row, Col, Button } from 'elemental'
import Editor from './editors/editor'


const getCreatures = () => window.localstorage.get('creatures')
const saveCreatures = creatures => window.localstorage.set('creatures', creatures)

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
const CreatureCard = ({creature, edit, remove}) => {
  return (
    <Card>
      <Row>
        <Col sm='1/2'>
          <h1>{creature.get('name').get('value')}</h1>
        </Col>
        <Col sm='1/4'>
          <Button onClick={edit}>Edit</Button>
        </Col>
        <Col sm='1/4'>
          <Button onClick={remove}>Remove</Button>
        </Col>
      </Row>
    </Card>
  )
}

class CreatureManager extends React.Component {
  constructor (props) {
    super(props)

    this.state = { creatures: Immutable.List([]), selected: Immutable.List([]), editing: -1 }
  }

  removeCreature (index) {
    this.setState({creatures: this.state.creatures.remove(index)})
  }

  editCreature (creature) {
    this.setState({editing: creature})
  }

  updateCreature (index, creature) {
    this.setState({editing: -1, creatures: this.state.creatures.set(index, creature)})
  }

  render () {
    const creatures = this.state.creatures.map((creature, index) => (
      <Row key={creature.id} onDoubleClick={() => this.props.onSelected(creature)}>
        <Col>
          <CreatureCard creature={creature} remove={this.removeCreature.bind(this, index)} edit={this.editCreature.bind(this, index)} />
        </Col>
      </Row>
    ))

    const editor = this.state.editing > -1 ? (<Editor editable={this.state.creatures.get(this.state.editing)} onClose={creature => this.updateCreature(this.state.editing, creature)} />) : null

    return (
      <Card>
        <Row>
          <Col>
            <Button onClick={() => {
              this.setState({creatures: this.state.creatures.push(generateCreature())})
            }}>Add</Button>
          </Col>
        </Row>
        {creatures}
        {editor}
      </Card>
    )
  }
}

export default CreatureManager
