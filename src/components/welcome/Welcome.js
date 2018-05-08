import React, { Component, PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toggleIsWelcomeView } from '../../actions/actions'
import { WelcomeMessage, LoggedInMessage } from './WelcomeHelpers'

class Welcome extends Component {

  componentWillMount() {
    !this.props.isWelcomeView ? this.props.toggleIsWelcomeView() : null
  }

  componentWillUnmount() {
    this.props.isWelcomeView ? this.props.toggleIsWelcomeView() : null
  }

  render() {
    // console.log('Welcome render() loginError: ', this.props.loginError)
    return(
      <div className="center-welcome-div">
        { this.props.loginError ? <div><WelcomeMessage/><p>{this.props.errorMessage}</p></div> : this.props.loggedIn ? <LoggedInMessage username={this.props.username}/> : <WelcomeMessage/> }
      </div>
    )
  }

}

const mapStateToProps = state => {
  return { 
    isWelcomeView: state.isWelcomeView,
    username: state.user.name,
    loggedIn: state.user.loggedIn,
    loginError: state.user.error.status,
    errorMessage: state.user.error.message
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    toggleIsWelcomeView: toggleIsWelcomeView
  }, dispatch)
}

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Welcome) )