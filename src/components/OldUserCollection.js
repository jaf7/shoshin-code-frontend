import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class OldUserCollection extends Component {

  render() {
    return (

      <section className="md-toolbar-relative--prominent dialogs__content drawers__content__scrollable">
        <p>OLD USER COLLECTION</p>
      </section>

    )
  }
}

const mapStateToProps = state => {
  return {
    exerciseCollection: state.user.exerciseCollection
  }
}

export default withRouter( connect( mapStateToProps )( OldUserCollection ) )