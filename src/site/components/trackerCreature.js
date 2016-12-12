import React from 'react'
import { Row, Col, Card } from 'elemental'

class TrackerCreature extends React.Component {
  constructor (props) {
    super(props)
    this.state = {expanded: false}
  }

  toggleExpand () {
    this.setState({expanded: !this.state.expanded}) 
  }

  render () {
    let {creature} = this.props 

    let expanded = null

    if (this.state.expanded) {
      expanded = (
        <Row>
          <Col sm='1/6'>Expanded</Col>
        </Row>
      )
    }

    return (
      <Row>
        <Col sm='1'>
          <Card>
            <Row onDoubleClick={this.toggleExpand.bind(this)}>
              <Col sm='1/4'>
                {creature.name}
              </Col>
              <Col sm='1/6'>
                {creature.initiative}
              </Col>
            </Row>
            {expanded}
          </Card>
        </Col>
      </Row>
    )
  }
}

export default TrackerCreature
