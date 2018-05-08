import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getSessionContent, setExerciseId, setExerciseSlug } from '../actions/actions' 

import { Card, CardTitle, CardText } from 'react-md'
import { Button } from 'react-md'
import MaterialIcon, {colorPallet} from 'material-icons-react' 

const cardStyle = { minWidth: 200, alignItems: 'center' }
const buttonDivStyle = { padding: '.4rem' }
const codeItButtonStyle = { margin: '4px 2px 4px 4px' }
const addToButtonStyle = { margin: '4px 4px 4px 2px'}

class ExerciseCard extends Component {
  
  loadExercise = () => {
      console.log('%%%%%%%%%%loadExercise fired%%%%%%%%%%%%%')
      // console.log('props.history: ', this.props.history)
      // if ( this.props.loggedIn ) {
      //   this.props.getSessionContent(this.props.userId, this.props.exerciseId)
      // }
      this.props.setExerciseId(this.props.exercise.id)
      this.props.setExerciseSlug(this.props.exercise.slug)
      this.props.history.replace(`/exercise/${this.props.exercise.slug}`)

  }

  render() {
    return(

      <Card style={cardStyle} className="md-block-centered">
        <CardTitle title={this.props.exercise.name} subtitle={this.props.exercise.tags[0]}/>
        <CardText>
          <p>
            { this.props.exercise.description.substring(0, 127) + ' ...' }
          </p>
        </CardText>
        <div className="buttons_group" style={buttonDivStyle} >
          <Button onClick={this.loadExercise} raised secondary iconEl={<MaterialIcon icon="code" color={colorPallet.blueGrey._500}/>} style={codeItButtonStyle} >Code It!</Button>
          <Button raised primary iconEl={<MaterialIcon icon="bookmark" color={colorPallet.orange.A200} />} style={addToButtonStyle} >Save</Button> 
        </div>
      </Card>

    )
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    // currentContent: state.editor.currentContent,
    // sessionLoaded: state.user.editorSession.loaded,
    // sessionContent: state.user.editorSession.content,
    loggedIn: state.user.loggedIn,
    userId: state.user.id,
    exercise: ownProps.exercise,
    exerciseId: ownProps.exercise.id,
    currentSlug: ownProps.exercise.slug
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getSessionContent: getSessionContent,
    setExerciseId: setExerciseId,
    setExerciseSlug: setExerciseSlug
  }, dispatch)
}

export default withRouter( connect( mapStateToProps, mapDispatchToProps )(ExerciseCard) )