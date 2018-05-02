import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateEditorContent } from '../actions/actions' 
import { emitEditorContent } from '../actions/actions'
import uuid from 'uuid/v1'
// import brace from 'brace'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/monokai'
import 'brace/theme/dawn'

const editorId = uuid()

class Editor extends Component {
  // constructor() {
  //   super()
  //   this.state = {
  //     content: ''
  //   }
  // }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.content !== nextProps.content) {
      return false
    } else {
      return true
    }
  }

  onChange = (newValue, e) => {
    // console.log(`event ${Object.keys(e)}`)
    // console.log(`start ${e.start}, end ${e.end}, action ${e.action}, lines ${e.lines}`)
    this.setState({ content: newValue }, () => console.log(this.state.content))
  }

  keyListener = (e) => {
    // console.log(`e keys ${Object.keys(e)}`)
  }

  // emitContent = () => {
  //   this.props.setContent(this.state.content)
  // }
 
  render() {
    return(
      <div id={editorId} style={{'height':'100%', 'width':'100%'}} onKeyUp={this.keyListener} >
        <AceEditor
          defaultValue="" // changed to redux store
          mode="javascript"
          theme="dawn"

          onChange={this.props.updateContent}
          debounceChangePeriod={200}
          name={editorId}
          editorProps={{$blockScrolling: false}}
          width="auto"
          commands={[
            {
              name: 'sendCode',
              bindKey: {win: 'Ctrl-Enter', mac: 'Command-Enter'},
              exec: () => { this.props.emitContent(this.props.content) }
            }]}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    content: state.editor.currentContent
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateContent: newValue => dispatch( updateEditorContent(newValue) ),
    emitContent: content => dispatch( emitEditorContent(content) )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor) // pass component into fn returned by connect(). connect() takes a callback.