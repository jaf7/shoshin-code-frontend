import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

import { NavigationDrawer, Drawer } from 'react-md'
import NavigationTabs from './components/navigation/NavigationTabs'
import ExerciseChooser from './components/ExerciseChooser'
import UserCollection from './components/UserCollection'
import ExerciseContainer from './components/ExerciseContainer'

class MainContainer extends Component {
  


  render() {

    const drawerType = Drawer.DrawerTypes.PERSISTENT

    return (
      <NavigationDrawer
        drawerTitle=">_ Shoshin Code"
        toolbarTitle="                       "
        toolbarChildren={<NavigationTabs/>}
        type={Drawer.DrawerTypes.PERSISTENT}

      >
        <Switch>
          <Route path="/exercise-chooser" component={ExerciseChooser} />
          <Route path="/my-exercises" component={UserCollection} />
          <Route path="/exercise/:slug" component={ExerciseContainer} />
          <Route path="/temporary-current-exercise" component={ExerciseContainer} />
        </Switch>
      </NavigationDrawer>
    )
  }
}

export default withRouter( MainContainer )