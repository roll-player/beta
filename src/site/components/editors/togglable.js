import React from 'react'

import { FormInput, InputGroup, FormField, Button, Card } from 'elemental'
import Immutable from 'immutable'

class Togglable extends React.Component {
  constructor (props) {
    super(props)
    this.state = { togglable: Immutable.Map(props.togglable) }
  }

  interalChanged (key, value) {
    const changed = this.state.togglable.set(key, value)
    this.setState({togglable: changed})
  }
  render () {
    const { togglable } = this.state
    const name = togglable.get('name')
    const value = togglable.get('value')
    const used = togglable.get('used')

    return (
      <Card>
        <InputGroup>
          <FormField htmlFor={name} label={'name'}>
            <FormInput type='string' name={name} value={name} onChange={e => this.interalChanged('name', e.target.value)} />
          </FormField>
          <FormField htmlFor={value} label={'label'}>
            <FormInput type='string' name={value} value={value} onChange={(e) => this.interalChanged('value', e.target.value)} />
          </FormField>
          <FormField htmlFor={'used'} label={'Used'}>
            <Button onClick={() => this.interalChanged('used', !used)}>{used ? 'Used' : 'Not Used'}</Button>
          </FormField>
        </InputGroup>
      </Card>
    )
  }
}

export default Togglable
