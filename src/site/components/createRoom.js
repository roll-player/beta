import React from 'react'

import { Row, Col, Form, FormField, FormLabel } from 'elemental'
class CreateRoom extends React.Component {
    constructor (props) {
        super (props)

        this.state = {password: ''}
    }

    handleChange (e) {
        this.setState({password: e.target.value})
    }

    render () {
        <Row>
            <Col>
                Please provide a gm password for this room. Currently there is no way to recover a lost password.

                Rooms currently do not persit for more than 24 hours and may be lost at any time.

                <Form onSubmit={this.handleRoom.bind(this)} type='inline'>
                    <FormField label='Password' htmlFor='password'>
                        <FormInput type='password' name='password' value={this.state.password} onChange={this.handleChange.bind(this)} />
                    </FormField>
                </Form> 
            </Col>
        </Row>
    }
}

export default CreateRoom