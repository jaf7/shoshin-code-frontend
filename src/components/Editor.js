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

// const editorId = uuid()
// const sessionId = window.location.href.match(/uuid=(.*)/) || uuid()
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
    // if ( this.props.loggedIn ) {
      // this.getSessionId()
      // this.props.setSessionId(sessionId)

      // this.setEditorId()
      // this.getSessionId()
      // .then(id => {
      //   this.writeShareUrlToClipboard( id )
      //   this.setState({ sessionId: id }, console.log('---## sessionId in state (firefox?) ##--->', id))
      // })

      // this.writeShareUrlToClipboard()
    if ( this.props.loggedIn ) {
      this.props.getSessionContent(this.props.userId, this.props.exerciseId)
      updateKey++
      this.forceUpdate()
    }
  }

  componentWillReceiveProps(nextProps) {
    if ( this.props.sessionContent !== nextProps.sessionContent ) {
      console.log('sessionContent: ', nextProps.sessionContent)
      // this.setEditorId()
      // this.getSessionId()
      // .then(id => {
      //   this.writeShareUrlToClipboard( id )
      //   this.setState({ sessionId: id }, console.log('---## sessionId in state (firefox?) ##--->', id))
      // })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.sessionContent !== this.props.sessionContent ? true : false

  }

  componentWillUnmount() {
    this.props.teardownSession()
  }

  // setEditorId = () => {
  //   this.setState({ editorId: uuid() })
  // }

  // getSessionId = () => {
  //   return new Promise((resolve,reject) => {
  //     const locationMatch = window.location.href.match(/uuid=(.*)/)
  //     typeof locationMatch === 'Array' ? resolve(locationMatch[1]) : resolve( locationMatch || uuid() )
  //   })
  // }

  getSessionId = () => {
    const locationMatch = window.location.href.match(/uuid=(.*)/)
    return Array.isArray(locationMatch) ? locationMatch[1] : locationMatch || uuid()
  }

  writeShareUrlToClipboard = ( sessionId ) => {
    let url = window.location.href.concat(`?readonly&uuid=${ sessionId }`)
    // navigator.clipboard.writeText( url )
    clipboard.writeText( url )
    .then(() => console.log('copied to clipboard: ', url))
    .catch( err => console.error('Could not copy url: ', err))
  }

  handleChange = ( newValue ) => {
    this.props.updateContent( newValue )
    this.props.generateEdit( newValue, this.state.editorId, this.state.sessionId ) // would need sessionId here to match broadcast channel
    this.refs.editsChannel.send( {text: newValue, sender_id: this.state.editorId, session: this.state.sessionId} )
  }

  handleReceivedEditStream = ( data ) => {
    // if this is a read-only instance, update the sessionContent directly - state.user.editorSession.content
    // this will update the viewed text value in the editor (value= prop)
    // console.log('this.state.editorId: ', this.state.editorId, 'sessionId: ', editStream.sender_id)
    console.log('receivedEditStream sessionId: ', data.session)
    // editStream.sender_id !== this.state.editorId ? this.props.addSocketResponse( editStream.text ) : null
    data.sender_id !== this.state.editorId ? this.props.addSocketResponse( data.text ) : null
  }

  isReadOnlyMode = () => {
    return window.location.href.includes('readonly') ? true : false
  }

  // getSessionId = () => {
  //   const url = window.location.href
  //   const uuidMatch = url.match(/uuid=(.*)/)
  //   return uuidMatch
  // }

  render() {
    // this.isReadOnlyMode() ? console.log('READ ONLY') : console.log('NOT READ ONLY')
    const readOnly = this.isReadOnlyMode()
    // const sessionId = readOnly ? this.getSessionId() : uuid()
    // const sessionId = this.getSessionId() || uuid()
    const sessionId = this.getSessionId()
    const editorId = uuid()
    console.log('###--- editorId in render ---### : ', editorId)
    this.setState({
      sessionId: sessionId,
      editorId: editorId
    }, this.writeShareUrlToClipboard(this.state.sessionId) )

    return(
      <div id={this.state.editorId} style={{'height':'100%', 'width':'100%'}} key={updateKey} >
        <ActionCable
        // is this equivalent to the obj passed as 1st arg to subscriptions.create ?
        // http://edgeguides.rubyonrails.org/action_cable_overview.html#passing-parameters-to-channels
          ref='editsChannel'
          channel={{ channel: 'EditsChannel', session: `${sessionId}` }}
          onReceived={ data => {
            console.log('============ EditsChannel received data ============')
            console.log( data )
            console.log('============ EditsChannel received data ============')
            // if !readOnly
            // this.handleReceivedEditStream( data.edit )
            // this.handleReceivedEditStream( data.text )
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