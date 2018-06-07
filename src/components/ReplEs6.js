import React, { Component } from 'react'
import { connect } from 'react-redux'

import Vm from 'vm.js'
import Interpreter from 'js-interpreter'
import { debugout } from '../utils/debugout'

class Repl extends Component {
  constructor() {
    super()
    this.state = {
      resolvedValue: ''
    }
  }

  handleRun = ( emittedCode ) => {

    const vm = new Vm()
    const logger = new debugout()

    vm.realm.global.console = {
      log: (args) => logger.log.call(vm.realm.global, args)
    }

    const lineCount = ( text ) => {
      let newLines = 0
      for( let i = 0; i < text.length; i++ ) {
        if ( text[i] === '\n' ) {
            newLines++
        }
      }
      return newLines
    }

    const interpret = ( code ) => {
      try {
        const numLines = lineCount( code )
        const evaluated = vm.eval( code )
        const resultWithLogOutput = logger.getSlice(2,numLines-1).concat( evaluated )
        logger.clear()
        return resultWithLogOutput
      } catch (e) {
        let errorMessage = `${e.name}: ${e.message}`
        return errorMessage
      }
    }

    // if ( emittedCode.includes('console.log') ) {
    //   const pattern = /\((.*?)\)/;
    //   const matchedArguments = emittedCode.match( pattern )[0]
    //   const argumentList = matchedArguments.replace(/^\(*|\)*$/g, '').split(',').map(e => e.trim())

    //   console.log('matchedArguments: ', matchedArguments)
    //   console.log('argumentList: ', argumentList)

    //   const results = argumentList.map( arg => interpret(arg) )
    //   // console.log('results: ', results)

    // } else {
    //   return interpret( emittedCode )
    // }

    return interpret( emittedCode )
  }

  render() {
    const output = this.handleRun(this.props.emittedContent)

    return (

      <div className="repl-cell md-paper md-paper--1 md-card md-background--card md-cell md-cell--4" style={{'padding':'.4rem', 'textAlign':'left' }} >
        <div style={{'whiteSpace':'pre-wrap','minHeight':'30rem', 'height':'100%', 'backgroundColor':'#1D292D', 'padding':'1rem', 'color':'#00E710', 'fontFamily':'PT monospace', 'fontSize':'1.2rem'}}>
                { typeof(output) === 'undefined' ? 'output undefined' : '=> ' + output }
        </div>
      </div>

    )
  }       
}

const mapStateToProps = state => {
  return {
    emittedContent: state.editor.emitContent
  }
}

export default connect(mapStateToProps)(Repl)