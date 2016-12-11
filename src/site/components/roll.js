import React from 'react'
import { Row, Col, Form, FormField, FormInput } from 'elemental'
import CSSModules from 'react-css-modules'
import { v4 } from 'node-uuid'

import styles from './styles/roll.css'
import RollCard from './rollcard'

class Roll extends React.Component {
  constructor (props) {
    super(props)

    this.state = { roll: '', rolls: [] }
  }

  onSubmit (e) {
    e.preventDefault()
    this.setState({ rolls: this.state.rolls.concat([{roll: this.state.roll, id: v4()}]), roll: '' })
  }

  handleChange (e) {
    this.setState({roll: e.target.value})
  }

  render () {
    let rolls = this.state.rolls.map(roll => {
      if (!roll.id) {
        roll.id = v4()
      }
      return (
        <Row key={roll.id}>
          <Col>
            <RollCard roll={roll} />
          </Col>
        </Row>
      )
    })
    return (
      <div styleName='roll--container'>
        <Row styleName='roll--input'>
          <Col styleName='roll--centered'>
            <Form type='inline' onSubmit={this.onSubmit.bind(this)}>
              <FormField label='Roll' htmlFor='roll-form-input-roll'>
                <FormInput placeholder='d20' name='roll-form-input-roll' value={this.state.roll} onChange={this.handleChange.bind(this)} />
              </FormField>
            </Form>
          </Col>
        </Row>
        {rolls}
      </div>
    )
  }
}

export default CSSModules(Roll, styles)
