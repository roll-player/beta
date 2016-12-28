import React from 'react'
import Immutable from 'immutable'

import { Card, Button, Row, Col } from 'elemental'

class List extends React.Component {
  constructor (props) {
    super(props)
    let { items, render, add, title, onListChanged } = props
    this.state = { items, render, title }
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
    let { items } = this.state
    let sequence = Immutable.Seq(items)
    const rendered = sequence.map((item, key) => (
      <Row key={item.id}>
        <Col>{this.props.render(item, this.internalChanged.bind(this, key))}</Col>
      </Row>
    ))

    return (
      <Card>
        <Row key={0}>
          <Col>
            <Button onClick={this.addItem.bind(this)}>Add</Button>
          </Col>
        </Row>
        {rendered}
      </Card>
    )
  }
}

export default List
