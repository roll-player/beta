import React from 'react'

import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormField, FormInput } from 'elemental'

const generateCreature = () => {
  return {
    name: 'New Creature',
    initiative: 0,
    useable: ['action', 'bonus action', 'movement', 'reaction'],
    attacks: [],
    spells: [],
    abilities: []
    notes: '',
    abilityScores: [{
      name: 'STR', score: 10,
      name: 'DEX', score: 10,
      name: 'CON', score: 10,
      name: 'INT', score: 10,
      name: 'WIS', score: 10,
      name: 'CHA', score: 10
    }],
    AC: 10,
    speed: 25,
    toFields: () => {
      [
        { type: 'string', name: 'name' },
        { type: 'number', name: 'initiative' },
        { type: 'array', name: 'useable', typeOf: 'string' },
        { type: 'array', name: 'attacks', typeOf: 'Attack' },
        { type: 'array', name: 'spells', typeOf: 'Spell' },
        { type: 'array', name: 'abilities', typeOf: 'Ability' },
        { type: 'string', name: 'notes' },
        { type: 'array', name: 'abilityScores', typeOf: 'Ability Score' },
        { type: 'number', name:'AC' },
        { type: 'number', name: 'speed' }
      ]
    }
  }
}

class CreatureEditor extends React.Component {
  constructor (props) {
    super(props) 
    let { creature, onSave, onClose } = this.props
    this.state = { creature, onSave, onClose }
  }

  update (field, e) {
    let { creature } = this.state
    creature[field] = e.target.value
    this.setState({creature})
  }

  render () {
    let { creature } = this.state

    return (<Modal isOpen={true}>
      <ModalHeader text={creature.name} />
      <ModalBody>
        <Form>
          <FormField label='name' htmlFor='creature-name'>
            <FormInput name='creature-name' value={creature.name} onChange={e => this.update('name', e)} />
          </FormField>
          <FormField label='initiative' htmlFor='creature-initiative'>
            <FormInput name='creature-initiative' value={creature.initiative} onChange={e => this.update('initiative', e)} />
          </FormField>
          <FormField label='info' htmlFor='creature-info'>
            <FormInput name='creature-info' value={creature.info} onChange={e => this.update('info', e)} />
          </FormField>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button type='primary' onClick={() => this.state.onSave(this.state.creature)}>Save</Button>
        <Button onClick={() => this.state.onClose()}>Close</Button>
      </ModalFooter>
    </Modal>)
  }
}

export default CreatureEditor

