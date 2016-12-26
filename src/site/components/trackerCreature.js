import React from 'react'
import CSSModules from 'react-css-modules'

import { Row, Col, Card, Button, ButtonGroup, Glyph, FormInput } from 'elemental'
import styles from './styles/trackerCreature.css'

import Immutable from 'immutable'
import Editor from './editors/editor'

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

  findPropertyByName (seq, name) {
    let find = seq.filter(prop => prop.get && prop.get('name') === name).toArray()
    if (find && find[0]) {
      return find[0]
    }
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
      edit = (<Editor properties={creature} onClose={this.save.bind(this)} />) 
    }

    //const useables = creature.useable.map(useable => (
    //  <Button styleName='tracker--creature-useable' key={useable.value} size='medium' onClick={() => this.updateProperty(useable, 'used', !useable.used)} type={useable.used ? 'hollow-primary' : 'primary'}>
    //    <div styleName='tracker--creature-useable-text'>{useable.value}</div>
    //  </Button>
    //))

    const makeLabeled = (value, label) => (
      <div styleName='tracker--creature-labeled'>
        <span styleName='tracker--creature-labeled-value'>{value}</span>
        <span styleName='tracker--creature-labeled-label'>{label}</span>
      </div>
    )
    let propertySequence = Immutable.Seq(creature)

    let AC = this.findPropertyByName(propertySequence, 'AC')
    let initiative = this.findPropertyByName(propertySequence, 'initiative')
    let hpCurrent = this.findPropertyByName(propertySequence, 'hpCurrent')
    let avatar = this.findPropertyByName(propertySequence, 'avatar')
    let name = this.findPropertyByName(propertySequence, 'name')

    return (
      <Card styleName='tracker--creature'>
        <Row styleName='tracker--creature-main' onDoubleClick={this.toggleExpand.bind(this)}>
          <Col sm='1/6'>
            <img src={avatar.get('value')} styleName='tracker--creature-avatar' />
          </Col>
          <Col sm='1/3'>
            {name.get('value')}
          </Col>
          <Col sm='1/6' styleName='tracker--creature-group'>
            {makeLabeled(AC.get('value'), 'AC')}
            {makeLabeled(initiative.get('value'), 'Initiative')}
            {makeLabeled(hpCurrent.get('value'), 'Health')}
          </Col>
          <Col sm='1/6'>
            {'useables'}
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
