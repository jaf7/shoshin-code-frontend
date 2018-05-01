import React, { Component } from 'react'
import { connect } from 'react-redux'

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

    // none of the below are the source of 'console is undefined' so it must be what's passed in
    // but if you try log('hello') you get 'log is undefined' also
    // interpreter.nativeToPseudo({
    //   log(...args) { console.log(...args) }
    // })
    // var consoleWrapper = function(text) {
    //   return console.log(arguments.length ? text : '')
    // }
    // interpreter.setProperty( scope, 'log', interpreter.createNativeFunction(consoleWrapper) )
  }

  handleRun = ( content, initFunction ) => {
    let emittedCode = content

    if ( emittedCode.includes('console.log') ) {
      let pattern = /\((.*?)\)/;
      let arg = emittedCode.match( pattern )[0]
      if ( typeof arg === 'string' ) {
        console.log( `STRING ARG: ${arg}` ) // work on making this the output first
        return arg.slice( 2, arg.length - 2 )
      } else {
        console.log( `NON-STRING CONSOLE ARG: ${arg[1]}` )
        // interpret( arg, initFunction )
      }
    } else {
      return interpret( emittedCode, initFunction )
    }

    function interpret( code, init ) {
      try {
        const currentRun = new Interpreter( code, init )
        currentRun.run()
        const value = currentRun.value
        console.log( `EMITTED: ${emittedCode}` )
        console.log( `INTERP ${value} ${typeof(value)}` )
        return value
      } catch (e) {
        let errorMessage = `${e.name}: ${e.message}`
        console.log('error name: ', e.name)
        console.log('error message: ', e.message)
        return errorMessage
      }
    }
  }

  render() {
    const output = this.handleRun(this.props.emitContent, this.initApi)

    return (

      <div className="md-paper md-paper--1 md-card md-background--card md-cell md-cell--6" style={{'padding':'.4rem', 'textAlign':'left', 'fontFamily':'monospace' }} >
        <div style={{'height':'100%', 'backgroundColor':'#F7F7F7'}}>
          {/*<Cell size={12}>*/}
            {/*<div className="md-text-container">*/}
              {/*<textarea>*/}
                {/*Interpreter*/}
                {/*{ this.props.emitContent.includes('console.log') ? 'see console' : typeof(output) === 'undefined' ? 'undefined' : output.toString() }*/}
                { typeof(output) === 'undefined' ? 'output undefined' : output.toString() }


              {/*</textarea>*/}
            {/*</div>*/}
          {/*</Cell>*/}
        </div>
      </div>

    )
  }       

}

const mapStateToProps = state => {
  return {
    emitContent: state.editor.emitContent
  }
}

export default connect(mapStateToProps)(Repl)