import React from 'react'

import { getSocket } from '../lib/websocket'

class Room extends React.Component {
    constructor (props) {
        super(props)

        this.state = {room : {}}

        this.socket = getSocket()

        this.socket.on('room:updated', data => {
           this.setState({room: data.room}) 
        })

        this.socket.on('room:loaded', data => {
           this.setState({room: data.room}) 
        })

        this.socket.emit('join', this.props.room.id)
    }

    render () {
        return (<div>{JSON.stringify(this.state.room)}</div>)
    }
}

export default Room