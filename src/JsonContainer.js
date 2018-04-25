import React, { Component } from 'react'
import ReactJson from 'react-json-view'
import { API_ROOT, HEADERS } from './constants'

class JsonContainer extends Component {
  constructor() {
    super()
    this.state = {
      exercises: []
    }
  }

  componentDidMount() {
    this.getJson()
  }
  
  getJson = () => {
    fetch(`${API_ROOT}/`, {
      method: 'GET',
      headers: HEADERS
    })
    .then(res => res.json())
    .then(json => this.setState({
      exercises: json
    }, console.log(this.state.exercises)))
  }

  render() {
    return(
      <div style={{"textAlign":"left"}} >
        <ReactJson src={this.state.exercises} theme="hopscotch" />
      </div>
    )
  }
}

export default JsonContainer