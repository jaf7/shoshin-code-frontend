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
      <p className="welcome-welcome">Welcome {props.username}! <span className="blue-background">Shoshin Code</span> is a platform for engaging a <a className="welcome-link" target="_blank" href="http://akaptur.com/blog/2015/10/10/effective-learning-strategies-for-programmers/">growth mindset</a>: in Zen terms, a <a className="welcome-link" target="_blank" href="https://en.wikipedia.org/wiki/Shoshin">beginner's mind</a>. </p>

      <p className="welcome-instructions"><span className="blue-background">"Exercises"</span> will take you to coding puzzles and exercises to choose from. <span className="blue-background">"Code It"</span> will open the editor and repl directly for a free-form session.
      On the left you can save {<MaterialIcon icon="save" color={colorPallet.blueGrey._500} />} and view your saved exercises. You can logout and come back any time to continue progress on an exercise. Just login and select it from your list.
      Share {<MaterialIcon icon="share" color={colorPallet.blueGrey._500} />} will copy a link to your clipboard so you can Slack / DM / Email it to a friend, mentor, or pair partner. The link will connect them to your exercise view with a read-only version of your editor, so they can view you coding live. Chat is coming in soon :)</p>
    </div>
  )
}