import React, { Component, PureComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { updateEditorContent, emitEditorContent, getSessionContent, setExerciseId, setSessionId, teardownSession, generateEditStream, updateSessionWithSocketResponse } from '../actions/actions'
import { ActionCable } from 'react-actioncable-provider'
import uuid from 'uuid/v1'
import clipboard from 'clipboard-polyfill'
// import brace from 'brace'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/monokai'
import 'brace/theme/dawn'

let updateKey = 0

class Editor extends Component {
  constructor() {
    super()
    this.state = { 
      sessionId: '',
      editorId: ''
    }
  }

  componentDidMount() {
    if ( this.props.loggedIn ) {
      this.props.getSessionContent(this.props.userId, this.props.exerciseId)
      updateKey++
      this.forceUpdate()
    }
  }

  componentWillReceiveProps(nextProps) {
    if ( this.props.sessionContent !== nextProps.sessionContent ) {
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.sessionContent !== this.props.sessionContent ? true : false

  }

  componentWillUnmount() {
    this.props.teardownSession()
  }

  getSessionId = () => {
    const locationMatch = window.location.href.match(/uuid=(.*)/)
    return Array.isArray(locationMatch) ? locationMatch[1] : locationMatch || uuid()
  }

  writeShareUrlToClipboard = ( sessionId ) => {
    let url = window.location.href.concat(`?readonly&uuid=${ sessionId }`)
    clipboard.writeText( url )
    .then(() => console.log('copied to clipboard: ', url))
    .catch( err => console.error('Could not copy url: ', err))
  }

  handleChange = ( newValue ) => {
    this.props.updateContent( newValue )
    this.props.generateEdit( newValue, this.state.editorId, this.state.sessionId )
    this.refs.editsChannel.send( {text: newValue, sender_id: this.state.editorId, session: this.state.sessionId} )
  }

  handleReceivedEditStream = ( data ) => {
    console.log('### sessionId in receivedEditStream ### ', data.session)
    data.sender_id !== this.state.editorId ? this.props.addSocketResponse( data.text ) : null
  }

  isReadOnlyMode = () => {
    return window.location.href.includes('readonly') ? true : false
  }

  render() {
    const readOnly = this.isReadOnlyMode()
    const sessionId = this.getSessionId()
    const editorId = uuid()
    console.log('### editorId in render ### ', editorId)
    this.setState({
      sessionId: sessionId,
      editorId: editorId
    }, this.writeShareUrlToClipboard(this.state.sessionId) )

    return(
      <div id={this.state.editorId} style={{'height':'100%', 'width':'100%'}} key={updateKey} >
        <ActionCable
          ref='editsChannel'
          channel={{ channel: 'EditsChannel', session: `${sessionId}` }}
          onReceived={ data => {
            this.handleReceivedEditStream( data )
          }}
        />
        <AceEditor
          readOnly={ readOnly }
          mode="javascript"
          theme="dawn"
          fontSize={15}
          highlightActiveLine={true}
          value={this.props.sessionContent}
          onChange={ !readOnly ? this.handleChange : null }
          debounceChangePeriod={200}
          name={this.state.editorId}
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
    generateEdit: generateEditStream,
    addSocketResponse: updateSessionWithSocketResponse,
    getSessionContent: getSessionContent,
    setExerciseId: setExerciseId,
    setSessionId: setSessionId,
    teardownSession: teardownSession
  }, dispatch)
}

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( Editor ) )