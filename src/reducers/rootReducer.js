const defaultState = {
  editor: {
    currentContent: '',
    emitContent: ''
  }
}

export function rootReducer( state = defaultState, action ) {

  switch( action.type ) {
    case 'UPDATE_EDITOR_CONTENT':
      return {
        ...state,  editor: { ...state.editor, currentContent: action.payload.currentContent }  
      }
    case 'EMIT_EDITOR_CONTENT':
      return {
        ...state, editor: { ...state.editor, emitContent: action.payload.emitContent }
      }
    default:
      return state
  }

}