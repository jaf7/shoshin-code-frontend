import React, { Component, PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button } from 'react-md'
import MaterialIcon, {colorPallet} from 'material-icons-react'
import * as actions from '../../actions/actions'

const logoutButtonStyle = { marginRight: '2rem' }

class Logout extends PureComponent {

  logout = () => {
    this.props.logoutUser(this.props.history)
  }

  render() {
    return (
      <Button
        className="right-side"
        flat
        iconEl={<MaterialIcon icon="exit_to_app" iconBefore={false} color={colorPallet.orange.A200} />}
        onClick={this.logout}
        style={logoutButtonStyle}
      >
      Logout
      </Button>
    )
  }
}

export default withRouter( connect(null, actions)( Logout ) ) 