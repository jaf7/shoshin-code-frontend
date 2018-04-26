import React, { Component } from 'react'

// import vm from 'vm.js'
// const Vm = require('vm.js') 
// const vm = new Vm()

import Interpreter from 'js-interpreter'

class Repl extends Component {
  constructor() {
    super()
    this.state = {
      resolvedValue: ''
    }
  }

  // handleRun = (content) => {
  //   const sandbox = { console: console }
  //   const context = vm.createContext(sandbox)

  //   try {
  //   vm.runInContext(`${content}`, context);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  initApi = (interpreter, scope) => {

    var alertWrapper = function(text) {
      return alert(arguments.length ? text : '')
    }
    interpreter.setProperty( scope, 'alert', interpreter.createNativeFunction(alertWrapper) )

    // interpreter.nativeToPseudo({
    //   log(...args) { console.log(...args) }
    // })

    // var consoleWrapper = function(text) {
    //   return console.log(arguments.length ? text : '')
    // }
    // interpreter.setProperty( scope, 'console.log', interpreter.createNativeFunction(consoleWrapper) )
  }

  handleRun = (content, initFn) => {
    if ( content.includes('console.log') ) {
      let arg = content.match(/\(([^)]+)\)/)
      console.log(`ARG: ${arg[1]}`)
    } else {
      const emittedCode = content
      const currentRun = new Interpreter(emittedCode, initFn)

      currentRun.run()
      console.log(`EMITTED: ${emittedCode}`)
      console.log(`INTERP ${currentRun.value}`)
      return currentRun.value
    }
  }

  render() {
    const output = this.handleRun(this.props.editorContent, this.initApi)

    return (

      <div className="md-paper md-paper--1 md-card md-background--card md-cell md-cell--6" style={{'padding':'.4rem', 'textAlign':'left', 'fontFamily':'monospace' }} >
        <div style={{'height':'100%', 'backgroundColor':'#F7F7F7'}}>
          {/*<Cell size={12}>*/}
            {/*<div className="md-text-container">*/}
              {/*<textarea>*/}
                {/*Interpreter*/}
                { this.props.editorContent.includes('console.log') ? 'see console' : output.toString() }


              {/*</textarea>*/}
            {/*</div>*/}
          {/*</Cell>*/}
        </div>
      </div>

    )
  }       

}

export default Repl