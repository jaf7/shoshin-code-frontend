import React, { Component } from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { NavigationDrawer, Drawer, Button, List, ListItem, DialogContainer } from 'react-md'
import MaterialIcon, {colorPallet} from 'material-icons-react'
import NavigationTabs from './components/navigation/NavigationTabs'
import Welcome from './components/welcome/Welcome'
import ExerciseChooser from './components/ExerciseChooser'
import UserCollection from './components/collection/UserCollection'
import ExerciseContainer from './components/ExerciseContainer' 
import Logout from './components/auth/Logout'
import HomeButton from './components/HomeButton'
import UserBadge from './components/UserBadge'

import { saveSessionContent, getUserExerciseCollection } from './actions/actions'

const styles = {
  content: { textAlign: 'left', minHeight: 'unset', height: 'fit-content' }
}

class MainContainer extends Component {
  constructor () {
    super()
    this.state = {
      clipboardDialogVisible: false
    }
  }

  rightSideActions = () => {
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

  getCollection = () => {
    this.props.getExerciseCollection( this.props.userId )
  }

  saveSession = () =>  {
    this.props.saveSessionContent( this.props.userId, this.props.exerciseId, this.props.currentContent )
  }

  // shareSession = () => {
  //   let url = window.location.href.concat(`?readonly&uuid=${this.props.sessionId}`)
  //   console.log('@@@@@@@@ sessionId in shareSession @@@@@@@@')
  //   console.log( this.props.sessionId )
  //   console.log('@@@@@@@@ sessionId in shareSession @@@@@@@@')
  //   this.writeToClipboard( url )
  // }

  // writeToClipboard = url => { 
  //   navigator.clipboard.writeText(url)
  //   .then(() => {
  //     this.showClipboardDialog(url)
  //   })
  //   .catch(err => {
  //     // If user denies clipboard permissions
  //     console.error('Could not copy url: ', err)
  //   })
  // }
  
  showClipboardDialog = (url) => {
    this.setState({
      clipboardDialogVisible: true
    })
  }

  hideClipboardDialog = () => {
    this.setState({ clipboardDialogVisible: false })
  }
 
  render() {
    const { clipboardDialogVisible } = this.state
    const drawerType = Drawer.DrawerTypes.PERSISTENT
    const navItemsList = [
            <ListItem
              primaryText="Save Session"
              leftIcon={<MaterialIcon icon="save" color={colorPallet.blueGrey._500}/>}
              onClick={this.props.loggedIn ? this.saveSession : null}
              key={'listItemSave'}
            />,
            <ListItem
              primaryText="Share Session"
              leftIcon={<MaterialIcon icon="share" color={colorPallet.blueGrey._500} />}
              onClick={this.showClipboardDialog}
              key={'listItemShare'}
            />
          ]

    return (
      <div>
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
          drawerChildren={this.props.loggedIn ? <UserCollection /> : null} 
          onVisibilityChange={this.props.loggedIn ? this.getCollection : null}
        >
          <Switch>
            <Route path="/exercise-chooser" component={ExerciseChooser} />
            <Route path="/exercise/:slug" component={ExerciseContainer} />
            <Route path="/default-exercise" component={ExerciseContainer} />
            <Route path="/" component={Welcome} />
          </Switch>
        </NavigationDrawer>
        <DialogContainer
          id="clipboard-dialog"
          focusOnMount={false}
          width="auto"
          dialogStyle={{"background":"#FFFFFF"}}
          titleStyle={{"textAlign":"center", "fontSize":"24px"}}
          visible={this.state.clipboardDialogVisible}
          title="Copied"
          onHide={this.hideClipboardDialog}
        >
          <List onClick={this.hide}>
            <ListItem primaryText="Your share link is copied to the clipboard." />
          </List>
        </DialogContainer>
      </div>
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
    currentContent: state.editor.currentContent,
    sessionId: state.user.editorSession.uuid
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    saveSessionContent: saveSessionContent,
    getExerciseCollection: getUserExerciseCollection
  }, dispatch)
}

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( MainContainer) )

