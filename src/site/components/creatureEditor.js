import React from 'react'

import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormField, FormInput } from 'elemental'

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
            <FormInput initiative='creature-initiative' value={creature.initiative} onChange={e => this.update('initiative', e)} />
          </FormField>
          <FormField label='info' htmlFor='creature-info'>
            <FormInput info='creature-info' value={creature.info} onChange={e => this.update('info', e)} />
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

