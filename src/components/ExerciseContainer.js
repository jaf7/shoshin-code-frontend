import React, { Component } from 'react'
import { Grid, Cell, Paper } from 'react-md';
import Editor from './Editor'
import Repl from './Repl'

class ExerciseContainer extends Component {
  constructor() {
    super()
    this.state = {
      editorContent: ''
    }
  }

  setContent = (content) => {
    this.setState({
      editorContent: content
    })
  }

  render() {
    return(
      <div>

          <Grid className="exercise-container-grid">
            <div className="md-paper md-paper--1 md-card md-background--card md-cell md-cell--6" >
              <Cell size={12}>
                <Editor setContent={this.setContent} />
              </Cell>
            </div>
            
            <Repl editorContent={this.state.editorContent} />

          </Grid>

      </div>
    )
  }
}

export default ExerciseContainer