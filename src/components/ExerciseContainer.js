import React, { Component } from 'react'
import { Grid, Cell } from 'react-md' // removed Paper
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
          <Grid className="details-grid" style={{'paddingBottom':'0px'}} >
            <div className="md-paper md-paper--1 md-card md-background--card md-cell md-cell--12" style={{'height':'26rem'}}>
              render markdown
            </div>
          </Grid>
          <Grid className="exercise-grid" style={{'paddingTop':'0px'}} >
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