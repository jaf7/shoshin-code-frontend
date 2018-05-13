import React, { PureComponent } from 'react'
import { Button, DialogContainer, TextField } from 'react-md'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import MaterialIcon, {colorPallet} from 'material-icons-react'
import * as actions from '../../actions/actions'
import { loginUser } from '../../actions/actions'

class LoginSignup extends PureComponent {
  constructor() {
    super();
    this.state = {
      visible: false,
      error: false,
      fields: {
        username: '',
        password: ''
      }
    }
  }

  show = () => {
    this.setState({ visible: true })
  }

  hide = () => {
    this.setState({ visible: false })
  }

  handleChange = (value, e) => {
    const updatedFields = { ...this.state.fields, [e.target.name]: value }
    this.setState({ fields: updatedFields })
  }

  loginOrSignup = e => { 
    e.preventDefault()
    this.hide()
    const { fields: { username, password } } = this.state
    this.props.loginUser( username, password, this.props.history ) 
  }

  render() {
    const { visible } = this.state 
    const { fields } = this.state
    const actions = []
    actions.push(<Button flat primary onClick={this.loginOrSignup} href="" >Login</Button>)
    actions.push(<Button flat primary onClick={this.loginOrSignup} href="" >Signup</Button>)

    return (
      <div>
        <Button raised onClick={this.show}><span className="mono-font">() => Login || Signup</span></Button>
        <DialogContainer
          id="login-action-dialog"
          visible={visible}
          onHide={this.hide}
          actions={actions}
          title="Login"
        >
          <TextField
            id="login-action-username-field"
            required={true}
            label="User Name"
            placeholder=""
            name="username"
            value={fields.username}
            onChange={this.handleChange}
          />
          <TextField
            id="login-action-password-field"
            required={true}
            type="password"
            passwordIcon={<MaterialIcon icon="security" color={colorPallet.blueGrey._500}/>}
            label="Password"
            placeholder=""
            name="password"
            value={fields.password}
            onChange={this.handleChange}
          />
        </DialogContainer>
      </div>
    )
  }
}

// second parameter passed to connect() can be an object whose functions are (assumed) Redux action creators
// https://github.com/reactjs/react-redux/blob/master/docs/api.md#arguments
export default withRouter( connect(null, actions)( LoginSignup ) )
