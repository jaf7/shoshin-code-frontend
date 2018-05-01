const defaultState = {
  editor: {
    currentContent: '',
    emitContent: ''
  },
  exercises: {
    loaded: false,
    data: []
  }
}

export function rootReducer( state = defaultState, action ) {

  switch( action.type ) {
    case 'FETCHING_EXERCISES': 
      console.log('fetching exercises')
      return {...state,
        exercises: {
          loaded: false
        }
      }
    case 'FETCH_EXERCISES':
      console.log(`payload in reducer: ${action.payload}`)
      return {...state,
        exercises: {
          loaded: true,
          data: action.payload
        }
        // ...state, exercises: action.payload
        // ...state, exercises: { ...action.payload }
      }
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