import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { clearEmittedContent } from '../actions/actions'

import Vm from 'vm.js'
import { debugout } from '../utils/debugout'

const styles = {
        wrapper: {
          padding: '.4rem',
          textAlign: 'left'
        },
        replDiv: {
          whiteSpace: 'pre-wrap',
          minHeight: '30rem',
          height: '100%',
          backgroundColor: '#1D292D',
          padding: '1rem',
          color: '#00E710',
          fontFamily: 'PT monospace',
          fontSize: '1.2rem'
        }
      }

class Repl extends Component {

  componentDidMount() {
    this.props.clearContent()
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

    return interpret( emittedCode )
  }

  render() {

    const output = this.handleRun(this.props.emittedContent)

    return (

      <div className="repl-cell md-paper md-paper--1 md-card md-background--card md-cell md-cell--4" style={styles.wrapper} >
        <div style={styles.replDiv}>
                { '=> ' + output }
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

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    clearContent: clearEmittedContent
  }, dispatch)
}

export default connect( mapStateToProps, mapDispatchToProps )( Repl )