import { API_ROOT, API_WS_ROOT } from './api-config'

const token = localStorage.getItem('token')

export const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: token
}


const getCurrentUser = () => {
  return getWithToken(`${API_ROOT}/current_user`)
}

const getWithToken = api_url => {
  return fetch(api_url, {
    headers: HEADERS
  }).then(res => res.json())
}

const login = data => {
  return fetch(`${API_ROOT}/auth`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify( data )
  })
  .then(res => res.json())
}

const retrieveExercises = () => {
  return fetch(`${API_ROOT}/`, {
      method: 'GET',
      headers: HEADERS
    })
    .then(res => res.json())
}

const retrieveUserExerciseCollection = data => {
  return fetch(`${API_ROOT}/user_exercises?userId=${data.userId}`, {
    method: 'GET',
    headers: HEADERS
  }).then(res => res.json())
}

// const retrieveUserExerciseCollection = data => {
//   return fetch(`${API_ROOT}/user_exercises`, {
//     method: 'POST',
//     headers: HEADERS,
//     body: JSON.stringify( data )
//   }).then(res => res.json())
// }

const removeExerciseFromCollection = data => {
  return fetch(`${API_ROOT}/remove_session`, {
    method: 'PATCH',
    headers: HEADERS,
    body: JSON.stringify( data )
  }).then(res => res.json())
}

const retrieveSessionContent = data => {
  return fetch(`${API_ROOT}/current_session?userId=${data.userId}&exerciseId=${data.exerciseId}`, {
    method: 'GET',
    headers: HEADERS
  }).then(res => res.json())
}

// const retrieveSessionContent = data => {
//   return fetch(`${API_ROOT}/current_session`, {
//     method: 'POST',
//     headers: HEADERS,
//     body: JSON.stringify( data )
//   }).then(res => res.json())
// }

const updateSessionContent = data => {
  return fetch(`${API_ROOT}/current_session`, {
    method: 'PATCH',
    headers: HEADERS,
    body: JSON.stringify( data )
  }).then(res => res.json())
}

// Keep for maybe implementing edits history
// const createEdit = data => {
//   return fetch(`${API_ROOT}/edits`, {
//     method: 'POST',
//     headers: HEADERS,
//     body: JSON.stringify( data )
//   })
// }

export const adapter = {
  auth: {
    login,
    getCurrentUser
  },
  data: {
    retrieveExercises,
    retrieveSessionContent,
    updateSessionContent,
    // createEdit,
    retrieveUserExerciseCollection,
    removeExerciseFromCollection
  }
}