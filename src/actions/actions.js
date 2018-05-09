import { adapter } from '../services/api' 

export const updateEditorContent = newValue => {
  return {
    type: 'UPDATE_EDITOR_CONTENT',
    payload: { currentContent: newValue }
  }
}

export const generateEditStream = ( newValue, editorId ) => dispatch => {
  adapter.data.createEdit( {newValue, editorId} ).then(data => {
    console.log('----------- 2) response from socket server -------------')
    console.log(data)
    console.log('----------- 2) response from socket server -------------')
  })
}

export const updateSessionWithSocketResponse = ( text ) => dispatch => {
  // console.log('updateSession action, text: ', text)
  dispatch ({
    type: 'UPDATE_SESSION_CONTENT_WITH_SOCKET_RESPONSE',
    payload: {text: text}
  })
}

export const addShareUrlToSession = ( shareUrlText ) => dispatch => {
  dispatch({
    type: 'APPEND_SHARE_URL_TO_SESSION_CONTENT',
    payload: {urlText: shareUrlText}
  })
}
export const emitEditorContent = content => { 
  return {
    type: 'EMIT_EDITOR_CONTENT',
    payload: { emitContent: content }
  }
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
    // console.log('---------DELETED RESPONSE (ed sessions): ', data)
  })
}

export const getSessionContent = ( userId, exerciseId ) => dispatch => {
  dispatch({ type: 'GETTING_SESSION_CONTENT' })
  adapter.data.retrieveSessionContent( {userId, exerciseId} ).then(data => {
    dispatch({ type: 'SET_USER_EDITOR_SESSION', payload: data })
  })
}

export const saveSessionContent = ( userId, exerciseId, sessionContent ) => dispatch => {
  // console.log('*********ACTION saveSessionContent*************')
  // console.log('userId: ', userId)
  // console.log('exerciseId: ', exerciseId)
  // console.log('sessionContent: ', sessionContent)
  // console.log('^^^^^^^^^ACTION saveSessionContent^^^^^^^^^')
  adapter.data.updateSessionContent( {userId, exerciseId, sessionContent} ).then(data => {
    dispatch({ type: 'SET_USER_EDITOR_SESSION', payload: data })
  })
}

export const updateEditorKey = ( key ) => dispatch => {
  // console.log('*********ACTION udpateEditorKey*************')
  dispatch({ type: 'UPDATE_EDITOR_KEY' })
}

export const teardownSession = () => dispatch => {
  // console.log('*********ACTION teardownSession*************')
  dispatch({ type: 'TEARDOWN_SESSION' })
}

export const setExerciseId = (exerciseId) => dispatch => {
  dispatch({ 
    type: 'SET_CURRENT_EXERCISE_ID',
    payload: {id: exerciseId} 
  })
}

export const setExerciseSlug = (slug) => dispatch => {
  dispatch({
    type: 'SET_CURRENT_EXERCISE_SLUG',
    payload: {slug: slug}
  })
}

export const toggleIsWelcomeView = () => {
  return { type: 'TOGGLE_IS_WELCOME_VIEW' }
}

export const goHome = ( history ) => dispatch => {
  history.replace('/')
}

export const unsetLoginError = () => {
  return { type: 'UNSET_USER_LOGIN_ERROR' }
}

export const fetchUser = ( history ) => dispatch => {
  // console.log('**********fetchUser*********')
  adapter.auth.getCurrentUser().then(userObject => {
    if (userObject.error) {
      dispatch({ type: 'SET_USER_LOGIN_ERROR', userObject })
      history.replace('/')
    } else {
      dispatch({ type: 'UNSET_USER_LOGIN_ERROR' })
      dispatch({ type: 'SET_CURRENT_USER', userObject })
      // no token setting or history manipulation
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
