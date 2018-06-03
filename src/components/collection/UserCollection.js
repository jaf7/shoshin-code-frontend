import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { ListItem } from 'react-md'
import ExerciseListItem from './ExerciseListItem'

class UserCollection extends Component {

  render() {

    return (
        <section
          className="md-toolbar-relative--prominent dialogs__content drawers__content__scrollable" 
          style={{'marginTop':'1rem', 
            'listStyle':'none',
          }}
        >
          { this.props.exerciseCollection.map(exercise => <ExerciseListItem exercise={exercise} key={exercise.id} />) } 
        </section> 
    )
  }
}

const mapStateToProps = ( state, ownProps ) => {
  return {
    exerciseCollection: state.user.exerciseCollection,
    exerciseCollectionLoaded: state.user.exerciseCollectionLoaded,
    sessionLoaded: state.user.editorSession.loaded,
    updateKey: ownProps.key
  }
}

export default withRouter( connect( mapStateToProps )( UserCollection ) )