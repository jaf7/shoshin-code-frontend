import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { ListItem } from 'react-md'
import ExerciseListItem from './ExerciseListItem'

class UserCollection extends Component {

  // componentWillReceiveProps( nextProps ) {
  //   console.log('=============will receive props UserCollection===============')
  //   // if ( this.props.exerciseCollection !== nextProps.exerciseCollection ) {
  //     if ( this.props.exerciseCollectionLoaded !== nextProps.exerciseCollectionLoaded ) {
  //     this.forceUpdate()
  //   }
  // }

  // componentWillUpdate( nextProps ) {
  //   console.log('=============WILL UPDATE UserCollection===============')
  //   console.log('this collection: ', this.props.exerciseCollection)
  //   console.log('next collection: ', nextProps.exerciseCollection)
  //   console.log('=============WILL UPDATE UserCollection===============')
  //   if ( this.props.exerciseCollection !== nextProps.exerciseCollection ) {
  //     updateKey++
  //     this.forceUpdate()
  //   }
  // }

  // shouldComponentUpdate( nextProps ) {
  //   return this.props.exerciseCollectionLoaded !== nextProps.exerciseCollectionLoaded ? true : false
  //   // return this.props.sessionLoaded !== nextProps.sessionLoaded ? true : false
  //   // return this.props.updateKey !== nextProps.updateKey ? true : false
  // }

  render() {

    return (
        <section
          className="md-toolbar-relative--prominent dialogs__content drawers__content__scrollable" 
          style={{'marginTop':'1rem', 
            'listStyle':'none',
          }}
        >
          { this.props.exerciseCollection.map(exercise => <ExerciseListItem exercise={exercise} />) } 
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