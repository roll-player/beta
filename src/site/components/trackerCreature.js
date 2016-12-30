import React from 'react'
import CSSModules from 'react-css-modules'
import Immutable from 'immutable'
import { Row, Col, Card, Button, ButtonGroup, Glyph, FormInput } from 'elemental'

import styles from './styles/trackerCreature.css'

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

  updateCreature (keys, value) {
    this.setState({creature: this.state.creature.setIn(keys, value)})
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

    const makeLabeled = ({value, label}) => (
      <div styleName='tracker--creature-labeled'>
        <span styleName='tracker--creature-labeled-value'>{value}</span>
        <span styleName='tracker--creature-labeled-label'>{label}</span>
      </div>
    )

    const AC = creature.get('AC')
    const initiative = creature.get('initiative')
    const hpCurrent = creature.get('hpCurrent')
    const avatar = creature.get('avatar')
    const name = creature.get('name')
    const useables = creature.get('useables')

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
            {makeLabeled({ value: AC.get('value'), label: 'AC' })}
            {makeLabeled({ value: initiative.get('value'), label: 'Initiative' })}
            {makeLabeled({ value: hpCurrent.get('value'), label: 'Health' })}
          </Col>
          <Col sm='1/6' onClick={this.edit.bind(this)}>
            <Glyph icon='pencil' />
          </Col>
        </Row>
        <Row>
          <Col>
            {useables.get('value').map((useable, key) => {
              return (<Button key={useable.name} 
                  size='sm' 
                  type={useable.get('used') ? 'hollow-primary' : 'primary'} 
                  onClick={() => {
                    const keys = ['useables', 'value', key]
                    const updated = useable.set('used', !useable.get('used'))
                    this.updateCreature(keys, updated)
                  }}>
                  {useable.get('value')}
                </Button>)
              })}
          </Col>
        </Row>
        {expanded}
        {edit}
      </Card>
    )
  }
}

export default CSSModules(TrackerCreature, styles)
