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
        console.log( `STRING ARG: ${arg}` )
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

      <div className="repl-cell md-paper md-paper--1 md-card md-background--card md-cell md-cell--4" style={{'padding':'.4rem', 'textAlign':'left', 'fontFamily':'monospace' }} >
        <div style={{'minHeight':'30rem', 'height':'100%', 'backgroundColor':'#1D292D', 'padding':'1rem', 'color':'cornsilk', 'fontFamily':'PT monospace', 'fontSize':'1.4rem'}}>
                { typeof(output) === 'undefined' ? 'output undefined' : '=> ' + output.toString() }
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