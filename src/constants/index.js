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

export const API_ROOT = 'http://localhost:3009'
export const API_WS_ROOT = 'ws://localhost:3000/cable'
export const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
}

