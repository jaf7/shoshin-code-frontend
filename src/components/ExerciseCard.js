import React from 'react'
import { Card, CardTitle, CardText } from 'react-md'
import { Button } from 'react-md'
import MaterialIcon, {colorPallet} from 'material-icons-react'

const cardStyle = { minWidth: 200, alignItems: 'center' }
const buttonDivStyle = { padding: '.4rem' }
const codeItButtonStyle = { margin: '4px 2px 4px 4px' }
const addToButtonStyle = { margin: '4px 4px 4px 2px'}

const ExerciseCard = (props) => (
  <Card style={cardStyle} className="md-block-centered">
    <CardTitle title={props.exercise.name} subtitle={props.exercise.tags[0]}/>
    <CardText>
      <p>
        { props.exercise.description.substring(0, 127) + ' ...' }
      </p>
    </CardText>
    <div className="buttons__group" style={buttonDivStyle} >
      <Button raised secondary iconEl={<MaterialIcon icon="code" color={colorPallet.blueGrey._500}/>} style={codeItButtonStyle} href={ `/exercise/${props.exercise.slug}` } >Code It!</Button>
      <Button raised primary iconEl={<MaterialIcon icon="bookmark" color={colorPallet.orange.A200} />} style={addToButtonStyle} >Save</Button>
    </div>
  </Card>
)

export default ExerciseCard