import React from 'react'
import CSSModules from 'react-css-modules'
import { Row, Col, Form, FormField, FormInput } from 'elemental'

import styles from './styles/spellSearch.css'

class SpellSearch extends React.Component {
  constructor (props) {
    super(props)

    this.state = { query: '', results: [] }
  }

  onSubmit (e) {
    e.preventDefault()
    this.props.router.push(`/spell/${this.state.query}`)
  }

  handleChange (e) {
    e.preventDefault()
    this.setState({query: e.target.value})
  }

  render () {
    return (<div styleName='search--container'>
      <Row styleName='search--input'>
        <Col>
          <Form type='inline' onSubmit={this.onSubmit.bind(this)}>
            <FormField label='Query' htmlFor='spell-query'>
              <FormInput placeholder='Fireball' name='spell-query' value={this.state.query} onChange={this.handleChange.bind(this)} />
            </FormField>
          </Form>
        </Col>
      </Row>
      {this.props.children}
    </div>)
  }
}

export default CSSModules(SpellSearch, styles)
