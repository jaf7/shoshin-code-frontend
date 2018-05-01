import { API_ROOT, HEADERS } from '../constants'

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

export const fetchExercises = () => {
  return dispatch => {
    dispatch({ type: 'FETCHING_EXERCISES' })
    fetch(`${API_ROOT}/`, {
      method: 'GET',
      headers: HEADERS
    })
    .then(res => res.json())
    .then(data => {
      
      console.log(`data in actions fetch: ${data}`)
      dispatch({ type: 'FETCH_EXERCISES', payload: data })
    })
  }
}
  