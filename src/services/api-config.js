let backendHost

const hostname = window && window.location && window.location.hostname

if ( hostname === 'shoshin-code-frontend.herokuapp.com' ) {
  backendHost = 'https://shoshin-code-backend.herokuapp.com'
} else if ( hostname === 'localhost' ) {
  backendHost = 'http://localhost:3001'
}

export const API_ROOT = backendHost
export const API_WS_ROOT = `${backendHost}/cable`


// TODO
// Change to using process.env
// https://medium.com/@tacomanator/environments-with-create-react-app-7b645312c09d

