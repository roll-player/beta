import React from 'react'

import { FormInput, FormField, Button } from 'elemental'

class Togglable extends React.Component {
  render () {
  console.log(this.props)
    let { togglable, onChanged } = this.props
    return (
      <div>
        <FormInput type='string' name={togglable.value} value={togglable.value} />
        <Button onClick={() => onChanged && onChanged({value: togglable.value, used: !togglable.used})}>{togglable.used ? 'Used' : 'Not Used'}</Button>
      </div>
    )
  }
}

export default Togglable
