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

    let inputs = creature.toFields().map(props => (
      <FormField key={props.name} label={props.name} htmlFor={`creature-${props.name}`}>
        <FormInput name={`creature-${props.name}`} value={creature[props.name]} onChange={e => this.update(props.name, e)} />
      </FormField>
    ))

    return (<Modal isOpen>
      <ModalHeader text={creature.name} />
      <ModalBody>
        <Form>
          {inputs}
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
