 // production
// export const API_ROOT = 'http://afc0fddd.ngrok.io'
// export const API_WS_ROOT = 'ws://afc0fddd.ngrok.io/cable'

// export const API_ROOT = 'https://8f9666a9.ngrok.io'
// export const API_WS_ROOT = 'ws://8f9666a9.ngrok.io/cable'

// Anyone who wants to run the server has to:
//
// 1. clone down the repo
// 2. run ./ngrok http 3001 in the ~ directory (change to correct port number)
// 3. replace the URLs in this file with the URLs output by that command
// 4. run rails s -p 3001 in the backend directory
// 5. navigate to the URL in the browser (should see data)
// 6. run npm install && npm start in the frontend

export const API_ROOT = 'https://shoshin-code-backend.herokuapp.com'
export const API_WS_ROOT = 'wss://shoshin-code-backend.herokuapp.com/cable' 

// export const API_ROOT = 'http://localhost:3001'
// export const API_WS_ROOT = 'ws://localhost:3001/cable' 

const token = localStorage.getItem('token')
export const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: token
}

const retrieveExercises = () => {
  return fetch(`${API_ROOT}/`, {
      method: 'GET',
      headers: HEADERS
    })
    .then(res => res.json())
}

const retrieveUserExerciseCollection = data => {
  // console.log('************retrieveExerciseCollection***************')
  return fetch(`${API_ROOT}/user_exercises`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify( data )
  }).then(res => res.json())
}

const retrieveSessionContent = data => {
  // console.log('************retrieveSessionContent***************')
  return fetch(`${API_ROOT}/current_session`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify( data )
  }).then(res => res.json())
}

const updateSessionContent = data => {
  // console.log('************updateSessionContent***************')
  // console.log('udpate data: ', data)
  return fetch(`${API_ROOT}/current_session`, {
    method: 'PATCH',
    headers: HEADERS,
    body: JSON.stringify( data )
  }).then(res => res.json())
}

const createEdit = data => {
  return fetch(`${API_ROOT}/edits`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify( data )
  })
}


const removeExerciseFromCollection = data => {
  return fetch(`${API_ROOT}/remove_session`, {
    method: 'PATCH',
    headers: HEADERS,
    body: JSON.stringify( data )
  }).then(res => res.json())
}

// const getWithToken = url => {
//   const token = localStorage.getItem('token');
//   return fetch(url, {
//     headers: { Authorization: token }
//   }).then(res => res.json())
// }
const getWithToken = api_url => {
  const token = localStorage.getItem('token')
  return fetch(api_url, {
    headers: HEADERS
  }).then(res => res.json())
}

const getCurrentUser = () => {
  return getWithToken(`${API_ROOT}/current_user`)
}

const login = data => {
  return fetch(`${API_ROOT}/auth`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify( data )
  })
  .then(res => res.json())
}

export const adapter = {
  auth: {
    login,
    getCurrentUser
  },
  data: {
    retrieveExercises,
    retrieveSessionContent,
    updateSessionContent,
    createEdit,
    retrieveUserExerciseCollection,
    removeExerciseFromCollection
  }
}