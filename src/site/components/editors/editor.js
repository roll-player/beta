import React from 'react'
import Immutable from 'immutable'

import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormField, FormInput } from 'elemental'
import Togglable from './togglable'


class Editor extends React.Component {
  constructor (props) {
    super(props)
    let { properties, onClose, title } = props
    let original = Immutable.Map(properties)

    this.state = { object: Immutable.Map(properties), original, title, onClose }
  }

  onPropertyChanged (id, e) {
    let newObject = this.state.object.set(id, this.state.object.get(id).set('value', e.target.value))
    this.setState({object: newObject})
  }

  getInput (key, prop) {
    switch (prop.type) {
      case 'Togglable':
        return (<Togglable togglable={prop} key={prop.name} />)
      default:
        return (<FormInput type={prop.type} name={`editor-${prop.name}`} value={prop.value} onChange={e => this.onPropertyChanged(key, e)} />)
    }
  }

  render () {
    let inputs = (this.state.object)
      .filter(prop => prop.get && prop.get('isEditable'))
      .map((prop, key) => {
        prop = prop.toObject()
        return (
          <FormField key={key} label={prop.name} htmlFor={`editor-${prop.name}`}>
            {this.getInput(key, prop)}
          </FormField>
      )
    })

    return (<Modal isOpen>
      <ModalHeader text={this.state.title} />
      <ModalBody>
        <Form>
          {inputs}
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button type='primary' onClick={() => this.state.onClose(this.state.object)}>Save</Button>
        <Button onClick={() => this.state.onClose(this.state.original)}>Close</Button>
      </ModalFooter>
    </Modal>)
  }
}

export default Editor
