import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getSessionContent, setExerciseId, setExerciseSlug } from '../actions/actions' 

import { Card, CardTitle, CardText } from 'react-md'
import { Button } from 'react-md'
import MaterialIcon, {colorPallet} from 'material-icons-react'

const styles = {
  cardStyle: { minWidth: 200, alignItems: 'center', overflow: 'hidden', position: 'relative'},


  buttonDivStyle: { padding: '0.4rem' },
  codeItButtonStyle: { width: '100%', display: 'flex', justifyContent: 'center', marginTop: 'auto' },

  
}

class ExerciseCard extends Component {
  constructor() {
    super()
    this.state = { focus: false }
  }
  
  loadExercise = () => {
      this.props.setExerciseId(this.props.exercise.id)
      this.props.setExerciseSlug(this.props.exercise.slug)
      this.props.history.replace(`/exercise/${this.props.exercise.slug}`)
  }

  mouseOver = () => {
    this.setState({ focus:true })
  }

  mouseOut = () => {
    this.setState({ focus:false })
  }

  render() {

    return( 

      <Card style={styles.cardStyle} className="md-block-centered" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
        <div className="cardOverlay" style={ this.state.focus ? {'background':'rgba(255,255,255,0.7)'} : {'background':'rgba(255,255,255,0)'} }>
          <Button onClick={this.loadExercise} className="overlayButton" style={ this.state.focus ? {'opacity':'1'} : {'opacity':'0'} } raised secondary iconEl={<MaterialIcon icon="code" color={colorPallet.blueGrey._500}/>} >Code It!</Button>
        </div>
        <CardTitle title={this.props.exercise.name} subtitle={this.props.exercise.tags[0]}/>
        <CardText>
          <p>
            { this.props.exercise.description.substring(0, 200) + ' ...' } 
          </p>
        </CardText>

      </Card>

    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
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