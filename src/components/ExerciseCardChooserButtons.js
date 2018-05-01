import React from 'react'
import { Button, SVGIcon } from 'react-md'

const style = { margin: '14px' }

const ExerciseCardButtons = () => (
  <div className="buttons__group" style={{'alignSelf':'bottom'}}>
    <Button raised primary iconClassName="fa fa-hand-spock-o" style={style} >Spock</Button>
    <Button raised secondary iconClassName="fa fa-hand-paper-o" style={style} >Paper</Button>
  </div>
);

export default ExerciseCardButtons