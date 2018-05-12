import React, { Component } from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { NavigationDrawer, Drawer, Button, ListItem } from 'react-md'
import MaterialIcon, {colorPallet} from 'material-icons-react'
import NavigationTabs from './components/navigation/NavigationTabs'
import Welcome from './components/welcome/Welcome'
import ExerciseChooser from './components/ExerciseChooser'
import OldUserCollection from './components/OldUserCollection'
import UserCollection from './components/collection/UserCollection'
import ExerciseContainer from './components/ExerciseContainer' 
import Logout from './components/auth/Logout'
import HomeButton from './components/HomeButton'
import UserBadge from './components/UserBadge'

import { saveSessionContent, getUserExerciseCollection, addShareUrlToSession } from './actions/actions'

const styles = {
  content: { textAlign: 'left', minHeight: 'unset', height: 'fit-content' }
}

let updateKey = 0

class MainContainer extends Component {

  rightSideActions () {
    let actions = []
    if (!this.props.isWelcomeView) {
      actions.push(<HomeButton/>)
    }
    if (this.props.loggedIn) {
      actions.push(<Logout/>)
      actions.unshift(<UserBadge userName={this.props.userName}/>)
    }
    return actions
  }

  // on visibility change
  getCollection = () => {
    this.props.getExerciseCollection( this.props.userId )
  }

  saveSession = () =>  {
    this.props.saveSessionContent( this.props.userId, this.props.exerciseId, this.props.currentContent )
    updateKey++
  }

  shareSession = () => {
    let text = '\r\n\/\/ SHARE URL, SLACK IT OUT:\r\n'
    let url = '\/\/ ' + window.location.href.concat('?readonly')
    let urlText = text.concat(url)
    this.props.shareSessionUrl( urlText )
  }
 
  render() {
    const drawerType = Drawer.DrawerTypes.PERSISTENT
    const navItemsList = [
            <ListItem
              primaryText="Save Session"
              leftIcon={<MaterialIcon icon="save" color={colorPallet.blueGrey._500}/>}
              onClick={this.props.loggedIn ? this.saveSession : null}
            />,
            <ListItem
              primaryText="Share Session"
              leftIcon={<MaterialIcon icon="share" color={colorPallet.blueGrey._500} />}
              onClick={this.shareSession}
            />
          ]

    return (
      <NavigationDrawer
        drawerTitle=">_ Shoshin Code"
        mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY_MINI}
        tabletDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY_MINI}
        desktopDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY_MINI}
        navItems={navItemsList}
        navStyle={styles.content}
        toolbarTitle=" "
        toolbarChildren={<NavigationTabs/>}
        toolbarActions={this.rightSideActions()}
        drawerChildren={this.props.loggedIn ? <UserCollection key={updateKey} /> : null} 
        onVisibilityChange={this.props.loggedIn ? this.getCollection : null}
      >
        <Switch>
          <Route path="/exercise-chooser" component={ExerciseChooser} />
          <Route 
            path="/my-exercises"
            render={() => {
              return this.props.loggedIn ? <OldUserCollection/> : <Redirect to="/" />
            }}
          />
          <Route path="/exercise/:slug" component={ExerciseContainer} />
          <Route path="/default-exercise" component={ExerciseContainer} />
          <Route path="/" component={Welcome} />
        </Switch>
      </NavigationDrawer>
    )
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.user.loggedIn,
    isWelcomeView: state.isWelcomeView,
    userId: state.user.id,
    userName: state.user.name,
    exerciseId: state.exercises.currentId,
    currentSlug: state.exercises.currentSlug,
    sessionContent: state.user.editorSession.content,
    currentContent: state.editor.currentContent
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    saveSessionContent: saveSessionContent,
    getExerciseCollection: getUserExerciseCollection,
    shareSessionUrl: addShareUrlToSession
  }, dispatch)
}

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( MainContainer) )

