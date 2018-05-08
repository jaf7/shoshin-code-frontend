import React from 'react'
import LoginSignup from '../auth/LoginSignup'

export const WelcomeMessage = (props) => {
  return (
    <div>
      <h1 className="welcome-heading">Welcome To Shoshin Code</h1>
      <p className="shoshin-quote">"In the beginner's mind there are many possibilities. In the expert's mind, there are few."</p>
      <p className="shoshin-attribution">- Shunryu Suzuki</p>
      <LoginSignup />
    </div>
  )
}

export const LoggedInMessage = (props) => {
  return (
    <div>
    <h1 className="welcome-heading">Welcome To Shoshin Code</h1>
      <p>Welcome {props.username}. You are a problem solver. Ready for anything, open to everything. Engage your beginner's mind.</p>
      <p>[brief instructions]</p>
    </div>
  )
}