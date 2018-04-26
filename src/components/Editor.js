import React, { Component } from 'react'

import uuid from 'uuid/v1'
import brace from 'brace'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/monokai'

const editorId = uuid()

class Editor extends Component {
  constructor() {
    super()
    this.state = {
      content: ''
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.content !== nextState.content) {
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

  emitContent = () => {
    this.props.setContent(this.state.content)
  }

  render() {
    return(
      <div id={editorId} style={{'height':'100%', 'width':'100%'}} onKeyUp={this.keyListener} >
        <AceEditor
          defaultValue={this.state.content}
          mode="javascript"
          theme="monokai"
          onChange={this.onChange}
          debounceChangePeriod={200}
          name={editorId}
          editorProps={{$blockScrolling: true}}
          width="auto"
          commands={[
            {
              name: 'sendCode',
              bindKey: {win: 'Ctrl-Enter', mac: 'Command-Enter'},
              exec: () => { this.emitContent() }
            }]}
        />
      </div>
    )
  }
}

export default Editor