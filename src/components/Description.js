import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactMarkdown from 'react-markdown'
// import hljs from 'highlight.js'
import CodeBlock from '../utils/CodeBlock' 

const defaultDescription = "# Welcome to Shoshin\n\nChoose an exercise from the Exercises menu above, or:\n\n```\nfunction startCoding ( skill, levelUp ) {\n \u0020 \u0020 return levelUp( skill )\n}\n\n```"

class Description extends Component {

  render() {
    return(
      <div className="markdown" >
        { 
          this.props.exercises.loaded === true ?
          <ReactMarkdown 
          source={this.props.exercise ? this.props.exercise.description : defaultDescription}
          escapeHtml={false}
          renderers={{code: CodeBlock}}
          style={{'white-space':'pre-line'}}
          />
          : 
          null
        }
      </div> 
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  // console.log('state.exercises in Description mSTP: ', state.exercises)
  // console.log('ownProps.exercise in Description mSTP: ', ownProps.exercise)
  return {
    exercises: state.exercises,
    exercise: ownProps.exercise
  }
}

export default connect( mapStateToProps )( Description ) 
 