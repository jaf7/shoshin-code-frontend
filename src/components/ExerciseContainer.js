import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Grid, Cell, Paper } from 'react-md'
import MediaQuery from 'react-responsive'

import Loader from 'react-loader-spinner'
import Editor from './Editor'
import Repl from './Repl' 
import Description from './Description'

const styles = {
  editorWrapper: { 'border':'.5rem solid white' },
  spinner: {
             left: '50%',
             top: '50%',
             marginLeft: '-250px',
             marginTop: '-250px'
           }
}

class ExerciseContainer extends Component {

  render() {
    return(
      <div>
        {
          this.props.exercises.loaded === true ?
          <div>
            <Grid className="details-grid" style={{'paddingBottom':'0px'}} >
              <div className="md-paper md-paper--1 md-card md-background--card md-cell md-cell--12" >
                <Description exercise={this.props.exercise} />
              </div>
            </Grid>
            <Grid className="exercise-grid" style={{'paddingTop':'0px'}} >
              
              <MediaQuery minDeviceWidth={768}>
                {(matches) => {
                  if (matches) {
                    console.log('######## MATCHES ########')
                    return (
                      <div style={styles.editorWrapper} className="md-paper md-paper--1 md-card md-background--card md-cell md-cell--8" >
                        { this.props.exercise ? <Editor userId={this.props.userId} exerciseId={this.props.exercise.id} exercise={this.props.exercise} /> : <Editor/> }
                      </div>
                    )
                  } else {
                    console.log('######## NO MATCH ########')
                    return (
                      <div style={styles.editorWrapper} className="md-paper md-paper--1 md-card md-background--card md-cell md-cell--12" >
                        { this.props.exercise ? <Editor userId={this.props.userId} exerciseId={this.props.exercise.id} exercise={this.props.exercise} /> : <Editor/> }
                      </div>
                    )
                  }
                }}
              </MediaQuery>
                              

              <Repl />

            </Grid>
          </div>
          :
          <Paper style={styles.spinner} >
            <Loader 
             type="Grid"
             color="#00BFFF"
             height="100" 
             width="100"
            />
          </Paper>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const currentExercise = state.exercises.loaded ? state.exercises.data.find(exercise => exercise.slug === ownProps.match.params.slug) : null

  return {
    exercises: state.exercises,
    exercise: currentExercise,
    userId: state.user.id
  }
}

export default connect( mapStateToProps )( ExerciseContainer )