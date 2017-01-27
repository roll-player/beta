import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './styles/spell.css'
import { Row, Col, Card } from 'elemental'

const spellLevelNames = [
  'Cantrip',
  '1st',
  '2nd',
  '3rd',
  '4th',
  '5th',
  '6th',
  '7th',
  '8th',
  '9th'
]

class Spell extends React.Component {
  constructor (props) {
    super(props)

    this.state = { spells: [], fetching: true }
    this.querySpell(`${this.props.params.query}${this.props.location.search}`)
  }

  componentWillReceiveProps (nextProps) {
    this.querySpell(`${nextProps.params.query}${nextProps.location.search}`)
  }

  querySpell (spellname) {
    fetch(`/api/spell/${spellname}`)
      .then(result => result.json())
      .then(spells => {
        this.setState({ spells })
      })
      .catch(err => {
        console.error(err)
      })
      .then(_ => {
        this.setState({fetching: false})
      })
  }

  render () {
    if (this.state.fetching) {
      return (<div>Consulting the spell books</div>)
    }

    if (this.state.spells.length === 0) {
      return (<div>No spells matching that Query</div>)
    }

    let rendered = this.state.spells.map(result => {
      let spell = result.item
      return (<Row>
        <Col sm='1/8' />
        <Col sm='3/4'>
          <Card styleName='spell--card'>
            <div styleName='spell--name'>
              {spell.name}
            </div>
            <div styleName='spell--level-and-school'>
              {spellLevelNames[spell.level]} {spell.school}
            </div>
            <div styleName='spell--casting-time'>
              {spell.casting_time}
            </div>
            <div styleName='spell--range'>
              {spell.range}
            </div>
            <div styleName='spell--components'>
              {spell.components}
            </div>
            <div styleName='spell--duration'>
              {spell.duration}
            </div>
            <div styleName='spell--description'>
              {spell.description}
            </div>
          </Card>
        </Col>
        <Col sm='1/8' />
      </Row>)
    })

    return (
      <div>
        {rendered}
      </div>
    )
  }

}

export default CSSModules(Spell, styles)
