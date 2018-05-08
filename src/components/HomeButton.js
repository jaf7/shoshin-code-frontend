import React, { Component, PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button } from 'react-md'
import MaterialIcon, {colorPallet} from 'material-icons-react'
import * as actions from '../actions/actions'

class HomeButton extends PureComponent {

  goHome = () => {
    this.props.goHome(this.props.history)
  }

  render() {
    return (
      <Button
        flat
        iconEl={<MaterialIcon icon="home" iconBefore={false} color={colorPallet.orange.A200} />}
        onClick={this.goHome}
      >
      Home
      </Button>
    )
  }
}
 
export default withRouter( connect(null, actions)( HomeButton ) )