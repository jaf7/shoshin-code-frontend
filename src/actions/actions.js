import { adapter } from '../services/api'

export const fetchUser = ( history ) => dispatch => {
  adapter.auth.getCurrentUser().then(userObject => {
    if (userObject.error) {
      dispatch({ type: 'SET_USER_LOGIN_ERROR', userObject })
      history.replace('/')
    } else {
      dispatch({ type: 'UNSET_USER_LOGIN_ERROR' })
      dispatch({ type: 'SET_CURRENT_USER', userObject })
    }
  })
}

export const loginUser = ( username, password, history ) => dispatch => { 
  adapter.auth.login( {username, password} ).then(userObject => {
    if (userObject.error) {
      dispatch({ type: 'SET_USER_LOGIN_ERROR', userObject })
      history.replace('/')
    } else {
      dispatch({ type: 'UNSET_USER_LOGIN_ERROR' })
      dispatch({ type: 'SET_CURRENT_USER', userObject })
      localStorage.setItem('token', userObject.jwt)
      history.replace('/')
    }
  })
}

export const logoutUser = ( history ) => dispatch => {
  localStorage.removeItem('token')
  history.replace('/')
  dispatch({ type: 'LOGOUT_USER' })
}

export const fetchExercises = () => {
  return dispatch => {
    dispatch({ type: 'FETCHING_EXERCISES' })
    adapter.data.retrieveExercises().then(data => {
      dispatch({ type: 'FETCH_EXERCISES', payload: data })
    })
  }
}

export const getUserExerciseCollection = (userId) => dispatch => {
  dispatch({ type: 'SETTING_USER_EXERCISE_COLLECTION' })
  adapter.data.retrieveUserExerciseCollection( {userId} ).then(data => {
    dispatch({ type: 'SET_USER_EXERCISE_COLLECTION', payload: data })
  })
}

export const removeExerciseFromCollection = ( userId, exerciseId ) => dispatch => {
  adapter.data.removeExerciseFromCollection( {userId, exerciseId} ).then(data => {
  })
}

export const getSessionContent = ( userId, exerciseId ) => dispatch => {
  dispatch({ type: 'GETTING_SESSION_CONTENT' })
  adapter.data.retrieveSessionContent( {userId, exerciseId} ).then(data => {
    dispatch({ type: 'SET_USER_EDITOR_SESSION', payload: data })
  })
}

export const saveSessionContent = ( userId, exerciseId, sessionContent ) => dispatch => {
  adapter.data.updateSessionContent( {userId, exerciseId, sessionContent} ).then(data => {
    dispatch({ type: 'SET_USER_EDITOR_SESSION', payload: data })
  })
}

export const updateEditorKey = ( key ) => dispatch => {
  dispatch({ type: 'UPDATE_EDITOR_KEY' })
}

export const teardownSession = () => dispatch => {
  dispatch({ type: 'TEARDOWN_SESSION' })
}

export const setExerciseId = (exerciseId) => dispatch => {
  dispatch({ 
    type: 'SET_CURRENT_EXERCISE_ID',
    payload: {id: exerciseId} 
  })
}

export const setSessionId = (sessionId) => dispatch => {
  dispatch({
    type: 'SET_CURRENT_SESSION_ID',
    payload: {id: sessionId}
  })
}

export const setExerciseSlug = (slug) => dispatch => {
  dispatch({
    type: 'SET_CURRENT_EXERCISE_SLUG',
    payload: {slug: slug}
  })
}

export const updateEditorContent = newValue => {
  return {
    type: 'UPDATE_EDITOR_CONTENT',
    payload: { currentContent: newValue }
  }
}

export const emitEditorContent = content => { 
  return {
    type: 'EMIT_EDITOR_CONTENT',
    payload: { emitContent: content }
  }
}

export const clearEmittedContent = () => {
  return { type: 'CLEAR_EMITTED_CONTENT' }
}

export const addToEdits = ( newValue, editorId, sessionId ) => dispatch => {
  localStorage.setItem(`${sessionId}`, `${newValue}`)
  // console.log('#### lS in addToEdits ####')
  // const content = localStorage.getItem(`${sessionId}`)
  // console.log(content)
  // console.log('#### lS in addToEdits ####')
  // adapter.data.createEdit( {newValue, editorId, sessionId} ).then(data => {
  // })
}

export const updateSessionWithSocketResponse = ( text ) => dispatch => {
  dispatch ({
    type: 'UPDATE_SESSION_CONTENT_WITH_SOCKET_RESPONSE',
    payload: {text: text}
  })
}

// export const addShareUrlToSession = ( shareUrlText ) => dispatch => {
//   dispatch({
//     type: 'APPEND_SHARE_URL_TO_SESSION_CONTENT',
//     payload: {urlText: shareUrlText}
//   })
// }

export const toggleIsWelcomeView = () => {
  return { type: 'TOGGLE_IS_WELCOME_VIEW' }
}

export const goHome = ( history ) => dispatch => {
  history.replace('/')
}

export const unsetLoginError = () => {
  return { type: 'UNSET_USER_LOGIN_ERROR' }
}
