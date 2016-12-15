import React from 'react'

import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'elemental'

class CreatureEditor extends React.Component {
  constructor (props) {
    super(props) 
    let { creature, onSave, onClose } = this.props
    this.state = { creature, onSave, onClose }
  }

  render () {
    return (<Modal isOpen={true}>
      <ModalHeader text={this.state.creature.name} />
      <ModalBody>
       This is where you edit 
      </ModalBody>
      <ModalFooter>
        <Button type='primary' onClick={() => this.state.onSave(this.state.creature)}>Save</Button>
        <Button onClick={() => this.state.onClose()}>Close</Button>
      </ModalFooter>
    </Modal>)
  }
}

export default CreatureEditor

