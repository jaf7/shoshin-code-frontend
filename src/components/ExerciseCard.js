import React from 'react'
import { Card, CardTitle, CardText } from 'react-md'
// import ExerciseCardChooserButtons from './ExerciseCardChooserButtons'
import { Button } from 'react-md'

const cardStyle = { minWidth: 128, alignItems: 'center' }
const buttonStyle = { margin: '14px' }

const ExerciseCard = (props) => (
  <Card style={cardStyle} className="md-block-centered">
    <CardTitle title={props.exercise.name} subtitle={props.exercise.tags[0]}/>
    <CardText>
      <p>
        { props.exercise.description.substring(0, 127) + ' ...' }
      </p>
    </CardText>
    <div className="buttons__group">
      <Button raised primary iconClassName="fa fa-hand-spock-o" style={buttonStyle} href={ `/exercise/${props.exercise.slug}` } >Spock</Button>
      <Button raised secondary iconClassName="fa fa-hand-paper-o" style={buttonStyle} >Paper</Button>
    </div>
  </Card>
)

export default ExerciseCard