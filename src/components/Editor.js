import React, { Component, PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateEditorContent, emitEditorContent, getSessionContent, setExerciseId, teardownSession } from '../actions/actions' 

import uuid from 'uuid/v1'
// import brace from 'brace'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/monokai'
import 'brace/theme/dawn'

const editorId = uuid()
let updateKey = 0

class Editor extends Component {

  componentDidMount() {
    if ( this.props.loggedIn ) {
      // this.props.setExerciseId(this.props.exerciseId)
      this.props.getSessionContent(this.props.userId, this.props.exerciseId) // ensure we don't need ownProps for exerciseId
      updateKey++
      this.forceUpdate()
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   if ( this.props.loggedIn ) {
  //     if ( this.props.exercise !== nextProps.exercise ) {
  //       updateKey++
  //       this.forceUpdate()
  //     }
  //   }
  // }

  shouldComponentUpdate(nextProps, nextState) {
    // return nextProps.sessionContent !== this.props.sessionContent ? true : false
    return !this.props.loggedIn ? false : nextProps.sessionLoaded !== this.props.sessionLoaded ? true : false
    // return nextProps.exerciseId !== this.props.exerciseId ? true : false

  }

  componentWillUnmount() {
    this.props.teardownSession()
  }

  keyListener = (e) => {
    // console.log(`e keys ${Object.keys(e)}`)
  }

  render() {
    return(
      <div id={editorId} style={{'height':'100%', 'width':'100%'}} onKeyUp={this.keyListener} key={updateKey} >
          <AceEditor

            mode="javascript"
            theme="dawn"
            fontSize={15}
            value={this.props.sessionContent}
            onChange={this.props.updateContent} // passes current value newValue
            debounceChangePeriod={200}
            name={editorId}
            
            width="auto"
            commands={[
              {
                name: 'sendCode',
                bindKey: {win: 'Ctrl-Enter', mac: 'Command-Enter'},
                exec: () => { this.props.emitContent(this.props.currentContent) }
              }]}
          />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {

  return {
    currentContent: state.editor.currentContent,
    sessionLoaded: state.user.editorSession.loaded,
    sessionContent: state.user.editorSession.content,
    loggedIn: state.user.loggedIn,
    userId: state.user.id,
    exercise: ownProps.exercise,
    exerciseId: ownProps.exerciseId
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    updateContent: newValue => dispatch( updateEditorContent(newValue) ),
    emitContent: content => dispatch( emitEditorContent(content) ),
    getSessionContent: getSessionContent,
    setExerciseId: setExerciseId,
    teardownSession: teardownSession
  }, dispatch)
}

export default connect( mapStateToProps, mapDispatchToProps )(Editor)