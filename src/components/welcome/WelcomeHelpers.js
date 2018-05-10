import React from 'react'
import MaterialIcon, {colorPallet} from 'material-icons-react'
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
      <p className="welcome-welcome">Welcome {props.username}. Here is a space for you to engage a growth mindset, a beginner's mind. </p>

      <p className="welcome-instructions">"Exercises" and "Code It" will take you to coding puzzles and exercises to choose from, and to the editor and repl, respectively.
      The left menu is where you can save {<MaterialIcon icon="save" color={colorPallet.blueGrey._500} />} and view your saved exercises. You can come back anytime to continue progress on any exercise, just select it from the list.
      The share {<MaterialIcon icon="share" color={colorPallet.blueGrey._500} />} button will provide a link you can send to a friend / mentor / interviewer. This will land them at the same exercise view with a read-only version of your editor, so they can view your progress. (Chat coming in the next version)</p>
    </div>
  )
}