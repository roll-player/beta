import React from 'react'
import { Map } from 'immutable'

import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormField, FormInput } from 'elemental'
import List from './List'

class Editor extends React.Component {
  constructor (props) {
    super(props)
    let { editable, onClose, title } = props
    editable = Map.isMap(editable) ? editable : Immutable.Map(editable)
    let original = editable

    this.state = { object: editable, original, title, onClose }
  }

  onPropertyChanged (id, value) {
    let newObject = this.state.object.set(id, this.state.object.get(id).set('value', value))
    this.setState({object: newObject})
  }

  getInput (key, prop) {
    switch (prop.type) {
      case 'array':
        return (<List {...prop} onListChanged={newList => this.onPropertyChanged(key, newList)} />)
      default:
        return (<FormInput type={prop.type} name={`editor-${prop.name}`} value={prop.value} onChange={e => this.onPropertyChanged(key, e.target.value)} />)
    }
  }

  render () {
    let inputs = (this.state.object)
      .filter(prop => prop.get && prop.get('isEditable'))
      .map((prop, key) => {
        prop = prop.toJS()
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
