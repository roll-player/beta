import React from 'react'
import CSSModules from 'react-css-modules'

import { Row, Col, Card, Button, ButtonGroup, Glyph, FormInput } from 'elemental'
import styles from './styles/trackerCreature.css'

import CreatureEditor from './creatureEditor'

class TrackerCreature extends React.Component {
  constructor (props) {
    super(props)
    this.state = {expanded: false, edit: true, remove: props.removeCreature, creature: this.props.creature}
  }

  toggleExpand () {
    this.setState({expanded: !this.state.expanded}) 
  }

  edit (open = null) {
    this.setState({edit: open || !this.state.edit}) 
  }

  save (creature) {
    this.edit(false)
    this.setState({creature}) 
  }

  updateProperty (obj, prop, newValue) {
    obj[prop] = newValue
    this.setState(this.state)
  }

  render () {
    let {creature} = this.state 

    let expanded = null
    let edit = null
    if (this.state.expanded) {
      expanded = (
        <Row>
          <Col sm='5/6'>
            {creature.info}
          </Col>
          <Col sm='1/6'>
            <Button type='primary' onClick={() => this.props.remove(creature.id)}>Del</Button>
          </Col>
        </Row>
      )
    }

    if (this.state.edit) {
      edit = (<CreatureEditor creature={creature} onClose={this.edit.bind(this)} onSave={this.save.bind(this)} />) 
    }

    const useables = creature.useable.map(useable => (
      <Button size='xs' onClick={() => this.updateProperty(useable, 'used', !useable.used)} type={useable.used ? 'hollow-primary' : 'primary'}>{useable.value}</Button>
    ))

    const makeLabeled = (value, label) => (
      <div styleName='tracker--creature-labeled'>
        <span styleName='tracker--creature-labeled-value'>{value}</span>
        <span styleName='tracker--creature-labeled-label'>{label}</span>
      </div>
    )
    return (
      <Card styleName='tracker--creature'>
        <Row styleName='tracker--creature-main' onDoubleClick={this.toggleExpand.bind(this)}>
          <Col sm='1/6'>
            <img src={creature.avatar} styleName='tracker--creature-avatar' />
          </Col>
          <Col sm='1/3'>
            {creature.name}
          </Col>
          <Col sm='1/6' styleName='tracker--creature-group'>
            {makeLabeled(creature.AC, 'AC')}
            {makeLabeled(creature.initiative, 'initiative')}
          </Col>
          <Col sm='1/6'>
            <ButtonGroup>
              {useables}
            </ButtonGroup>
          </Col>
          <Col sm='1/6' onClick={this.edit.bind(this)}>
            <Glyph icon='pencil' />
          </Col>
        </Row>
        {expanded}
        {edit}
      </Card>
    )
  }
}

export default CSSModules(TrackerCreature, styles)
