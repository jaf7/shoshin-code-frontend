const defaultState = {
  user: {
    name: '',
    id: 'e3ac7030-521a-11e8-9c2d-fa7ae01bbebc',
    loggedIn: false,
    exerciseCollection: [],
    exerciseCollectionLoaded: false,
    editorSession: {
      uuid: 'unauthorized',
      loaded: false,
      content: "\/\/ Welcome. The Shoshin Repl currently implements a complete ECMAScript 3 environment and a partial ECMAScript 6 environment using vm.js, a JS bytecode compiler. Most patterns you would use to solve problems here are supported (including object destructuring and generators!) The next version (in development) will implement a Node.js API instance bootstrapped in the browser. Thank you for using Shoshin!\r\n\/\/ (Remember you can share a live view of your session using the left menu)\r\n\r\n\/\/ type CMD-ENTER TO EVALUATE YOUR CODE :)\r\nconsole.log(\'Hello World!\')"
    },
    error: {
      status: false,
      message: ''
    }
  },
  editor: {
    currentContent: '',
    emitContent: '',
    key: 0
  },
  exercises: {
    loaded: false,
    data: [],
    currentId: 'a06b3126-521a-11e8-9c2d-fa7ae01bbebc',
    currentSlug: ''
  },
  isWelcomeView: false
}

export function rootReducer( state = defaultState, action ) {

  switch( action.type ) {
    case 'FETCHING_EXERCISES': 
      return { ...state,
        exercises: { ...state.exercises,
          loaded: false
        }
      }
    case 'FETCH_EXERCISES':
      return { ...state,
        exercises: { ...state.exercises,
          loaded: true,
          data: action.payload
        }
      }
    case 'SETTING_USER_EXERCISE_COLLECTION':
      return { ...state,
        user: { ...state.user,
          exerciseCollectionLoaded: false
        }
      }
    case 'SET_USER_EXERCISE_COLLECTION':
      return { ...state,
        user: { ...state.user,
          exerciseCollectionLoaded: true,
          exerciseCollection: action.payload.userExercises
        }
      }
    case 'UPDATE_EDITOR_CONTENT':
      return {
        ...state,  editor: { ...state.editor, currentContent: action.payload.currentContent }  
      }
    case 'EMIT_EDITOR_CONTENT':
      return {
        ...state, editor: { ...state.editor, emitContent: action.payload.emitContent }
      }
    case 'CLEAR_EMITTED_CONTENT':
      return {
        ...state, editor: { ...state.editor, emitContent: '' }
      }
    case 'GETTING_SESSION_CONTENT':
      return { ...state,
        user: { ...state.user,
          editorSession: { ...state.user.editorSession,
            loaded: { ...!state.user.editorSession.loaded }
          }
        }
      }
    case 'SET_USER_EDITOR_SESSION':
      return { ...state,
        user: { ...state.user,
          editorSession: { 
            loaded: true,
            content: action.payload.editorContent ? action.payload.editorContent : "\/\/ Welcome. The Shoshin Repl currently implements a complete ECMAScript 3 environment and a partial ECMAScript 6 environment using vm.js, a JS bytecode compiler. Most patterns you would use to solve problems here are supported (including object destructuring and generators!) The next version (in development) will implement a Node.js API instance bootstrapped in the browser. Thank you for using Shoshin!\r\n\/\/ (Remember you can share a live view of your session using the left menu)\r\n\r\n\/\/ type CMD-ENTER TO EVALUATE YOUR CODE :)\r\nconsole.log(\'Hello World!\')"
          }
        },
        editor: { ...state.editor,
          currentContent: action.payload.editorContent ? action.payload.editorContent : "\/\/ Welcome. The Shoshin Repl currently implements a complete ECMAScript 3 environment and a partial ECMAScript 6 environment using vm.js, a JS bytecode compiler. Most patterns you would use to solve problems here are supported (including object destructuring and generators!) The next version (in development) will implement a Node.js API instance bootstrapped in the browser. Thank you for using Shoshin!\r\n\/\/ (Remember you can share a live view of your session using the left menu)\r\n\r\n\/\/ type CMD-ENTER TO EVALUATE YOUR CODE :)\r\nconsole.log(\'Hello World!\')",
          emitContent: state.editor.emitContent
        }
      }
    case 'UPDATE_SESSION_CONTENT_WITH_SOCKET_RESPONSE':
      return { ...state,
        user: { ...state.user,
          editorSession: { ...state.user.editorSession,
            content: action.payload.text
          }
        }
      }
    case 'APPEND_SHARE_URL_TO_SESSION_CONTENT':
      return { ...state,
        user: { ...state.user,
          editorSession: { ...state.user.editorSession,
            content: state.user.editorSession.content.concat(action.payload.urlText)
          }
        }
      }
    case 'UPDATE_EDITOR_KEY':
      return { ...state,
        editor: { ...state.editor,
          key: state.editor.key + 1
        }
      }
    case 'SET_CURRENT_EXERCISE_ID':
      return { ...state,
        exercises: { ...state.exercises,
          currentId: action.payload.id
        }
      }
    case 'SET_CURRENT_SESSION_ID':
      return { ...state,
        user: { ...state.user,
          editorSession: { ...state.user.editorSession,
            uuid: action.payload.id
          }
        }
      }
    case 'SET_CURRENT_EXERCISE_SLUG':
      return { ...state,
        exercises: { ...state.exercises,
          currentSlug: action.payload.slug
        }
      }
    case 'TEARDOWN_SESSION':
      return { ...state,
        exercises: { ...state.exercises,
          currentId: 'a06b3126-521a-11e8-9c2d-fa7ae01bbebc'
        },
        user: { ...state.user,
          editorSession: { ...state.user.editorSession,
            uuid: 'unauthorized',
            loaded: false,
            content: "\/\/ Welcome. The Shoshin Repl currently implements a complete ECMAScript 3 environment and a partial ECMAScript 6 environment using vm.js, a JS bytecode compiler. Most patterns you would use to solve problems here are supported (including object destructuring and generators!) The next version (in development) will implement a Node.js API instance bootstrapped in the browser. Thank you for using Shoshin!\r\n\/\/ (Remember you can share a live view of your session using the left menu)\r\n\r\n\/\/ type CMD-ENTER TO EVALUATE YOUR CODE :)\r\nconsole.log(\'Hello World!\')"
          }
        }
      }
    case 'TOGGLE_IS_WELCOME_VIEW':
      return { ...state,
        isWelcomeView: !state.isWelcomeView
      }
    case 'SET_USER_LOGIN_ERROR':
      return { ...state,
        user: { ...state.user,
          error: {
           status: true,
           message: action.userObject.error
          }      
        }
      }
    case 'UNSET_USER_LOGIN_ERROR':
      return { ...state,
        user: { ...state.user,
          error: {
           status: false,
           message: ''
          }      
        }
      }
    case 'SET_CURRENT_USER':
      return { ...state,
        user: { ...state.user,
          name: action.userObject.username,
          loggedIn: true,
          id: action.userObject.id
        }
      }
    case 'LOGOUT_USER': 
      return { ...state,
        user: { ...state.user,
          name: '',
          id: 'e3ac7030-521a-11e8-9c2d-fa7ae01bbebc',
          loggedIn: false,
          exerciseCollection: []
        }
      }
    default:
      return state
  }

} 