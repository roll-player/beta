import React from 'react'
import CSSModules from 'react-css-modules'
import { Row, Col, Form, Checkbox, FormField, FormInput } from 'elemental'

import styles from './styles/spellSearch.css'

class SpellSearch extends React.Component {
  constructor (props) {
    super(props)

    this.state = { query: this.props.params.query || '', results: [], exact: this.props.query.exact || false }
  }

  onSubmit (e) {
    e.preventDefault()
    this.props.router.push(`/spell/${this.state.query}${this.state.exact ? '?exact=true' : ''}`)
  }

  handleChange (property, e) {
    e.preventDefault()
    let update = {}
    update[property] = e.target.value
    console.log('update')
    this.setState(update)
  }

  render () {
    return (<div styleName='search--container'>
      <Row styleName='search--input'>
        <Col>
          <Form type='inline' onSubmit={this.onSubmit.bind(this)}>
            <FormField label='Query' htmlFor='spell-query'>
              <FormInput placeholder='Fireball' name='spell-query' value={this.state.query} onChange={this.handleChange.bind(this, 'query')} />
            </FormField>
            <FormField label='Exact' htmlFor='spell-exact'>
              <Checkbox
                name='spell-exact'
                checked={this.state.exact}
                onChange= { e => {
                  e.preventDefault()
                  const fakeEvent = {
                    preventDefault : () => null,
                    target: {
                      value: e.target.value === 'on'
                    }
                  }
                  this.handleChange('exact', fakeEvent)
                }
              } />
            </FormField>
          </Form>
        </Col>
      </Row>
      {this.props.children}
    </div>)
  }
}

export default CSSModules(SpellSearch, styles)
