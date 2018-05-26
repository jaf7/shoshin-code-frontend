import React, { Component, PureComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { updateEditorContent, emitEditorContent, getSessionContent, setExerciseId, teardownSession, generateEditStream, updateSessionWithSocketResponse } from '../actions/actions'
import { ActionCable } from 'react-actioncable-provider'

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
      this.props.getSessionContent(this.props.userId, this.props.exerciseId)
      updateKey++
      this.forceUpdate()
    }
  }

  componentWillReceiveProps(nextProps) {

      if ( this.props.sessionContent !== nextProps.sessionContent ) {
        console.log('sessionContent: ', nextProps.sessionContent)
      }

  }

  shouldComponentUpdate(nextProps, nextState) {
    // return !this.props.loggedIn ? false : nextProps.sessionLoaded !== this.props.sessionLoaded ? true : false
    // return nextProps.sessionLoaded !== this.props.sessionLoaded ? true : false
    // return nextProps.exerciseId !== this.props.exerciseId ? true : false
    return nextProps.sessionContent !== this.props.sessionContent ? true : false

  }

  componentWillUnmount() {
    this.props.teardownSession()
  }

  keyListener = (e) => {
    // console.log(`e keys ${Object.keys(e)}`)
  }

  handleChange = ( newValue ) => {
    // console.log('---------------- 1) handleChange newValue --------------')
    // console.log( newValue )
    // console.log('---------------- 1) handleChange newValue --------------')
    this.props.updateContent( newValue )
    this.props.generateEdit( newValue, editorId )
  }

  handleReceivedEditStream = ( editStream ) => {
    // if this is a read-only instance, update the sessionContent directly - state.user.editorSession.content
    // this will update the viewed text value in the editor (value= prop)
    console.log('editorId: ', editorId, 'sender_id: ', editStream.sender_id)
    editStream.sender_id !== editorId ? this.props.addSocketResponse( editStream.text ) : null
  }

  isReadOnlyMode = () => {
    return window.location.href.includes('readonly') ? true : false
  }

  render() {
    this.isReadOnlyMode() ? console.log('READ ONLY') : console.log('NOT READ ONLY')
    const readOnlyState = this.isReadOnlyMode() 

    return(
      <div id={editorId} style={{'height':'100%', 'width':'100%'}} onKeyUp={this.keyListener} key={updateKey} >
        <ActionCable
          channel={{ channel: 'EditsChannel' }}
          onReceived={ data => {
            // console.log('---------------- 3) received data --------------')
            // console.log( data.edit )
            // console.log('---------------- 3) received data --------------')
            this.handleReceivedEditStream( data.edit )
          }}
        />
      
        { this.isReadOnlyMode() ?
          <AceEditor
            readOnly={true}
            mode="javascript"
            theme="dawn"
            fontSize={15}
            highlightActiveLine={true}
            value={this.props.sessionContent}
            onChange={null}
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
          :
          <AceEditor
            mode="javascript"
            theme="dawn"
            fontSize={15}
            highlightActiveLine={true}
            value={this.props.sessionContent}
            onChange={this.handleChange}
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
        }
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
    generateEdit: generateEditStream,
    addSocketResponse: updateSessionWithSocketResponse,
    getSessionContent: getSessionContent,
    setExerciseId: setExerciseId,
    teardownSession: teardownSession
  }, dispatch)
}

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( Editor ) )