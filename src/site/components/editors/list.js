import React from 'react'
import Immutable from 'immutable'

import { Card, Button, Row, Col } from 'elemental'

class List extends React.Component {
  constructor (props) {
    super(props)
    let { items, render, actions, title } = props
    this.state = { items, render, title, actions }
  }

  internalChanged (key, value) {
    let newList = this.state.items.set(key, value)
    this.setState({items: newList})
    this.props.onListChanged(newList)
  }

  addItem () {
    this.setState({items: this.state.items.push(this.props.add())})
    this.props.onListChanged(this.state.items)
  }

  render () {
    let { items, actions, render } = this.state
    let sequence = Immutable.Seq(items)
    const rendered = []
     
    if (actions.length > 0) {
      const renderedActions = actions.map(action => (<Button {...action} key={action.key}>{action.label}</Button>))
      rendered.push((<Row><Col>{renderedActions}</Col></Row>))
    }

    const renderedItems = sequence.map((item, key) => (<Row key={item.id}><Col>{render(item, this.internalChanged.bind(this, key))}</Col></Row>))
    rendered.concat(renderedItems)

    return (<Card>{rendered}</Card>)
  }
}

export default List
