import React, { Component, PureComponent } from 'react'
import { Button } from 'react-md'
import MaterialIcon, {colorPallet} from 'material-icons-react'

// const Item = ({ label }) => (
//   <IconSeparator label={label} iconBefore component="li" className="md-cell md-cell--12">
//   </IconSeparator>
// )

const UserBadge = (props) => {


    return (

      <Button
        flat
        iconEl={<MaterialIcon icon="person_outline" iconBefore={false} color={colorPallet.orange.A200} />}
      >
      {props.userName}
      </Button>

    )

}
 
export default UserBadge