import React from 'react'

import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormField, FormInput } from 'elemental'
import Togglable from './editors/togglable'

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

    let inputs = creature.toFields.map(props => {
      let input = null 

      switch (props.typeOf) {
        case 'Togglable':
          input = creature[props.name].map(toggle => (<Togglable togglable={toggle} key={toggle.name} />))
          break
        default:
          input = (<FormInput type={props.type} name={`creature-${props.name}`} value={creature[props.name]} onChange={e => this.update(props.name, e)} />)
          break
      }

      return (
        <FormField key={props.name} label={props.name} htmlFor={`creature-${props.name}`}>
          {input}
        </FormField>
      )
    })

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
