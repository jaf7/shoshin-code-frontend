import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactMarkdown from 'react-markdown'
// import hljs from 'highlight.js'
import CodeBlock from './CodeBlock'


class Description extends Component {

  render() {

    return(
      <div className="markdown" >
        {
          this.props.exercises.loaded === true ?
          <ReactMarkdown 
          source={this.props.exercise.description}
          escapeHtml={true}
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
  console.log('state.exercises in Description mSTP: ', state.exercises)
  return {
    exercises: state.exercises,
    exercise: ownProps.exercise
  }
}

export default connect( mapStateToProps )( Description )
