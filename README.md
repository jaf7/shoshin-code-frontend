# Shoshin Code
A coding practice and mentorship application that integrates coding exercises with an editor and repl, offers real-time session sharing across a network and session saving for any editor/exercise combination. Features ES6 evaluation & error handling, code highlighting, secure user authentication, WebSocket session streaming and exercises from the CodeWars API.

## Motivation
This app is born from a deep appreciation of online coding environments like [Repl.it](https://repl.it). I wanted to use and offer to others a tool that combines the salient features of such environments with real-time session sharing to support mentorship and exercises in the spirit of code Katas. I wanted a clean, elegant experience with crisp interactions that doesn't get in the way and lets the user focus on learning. 

## Demo
➡️  &nbsp; Use it [here](https://shoshin-code-frontend.herokuapp.com/)! (Feedback welcome! @janthonyfields)

➡️  &nbsp; Watch a 2 minute demo [here](https://youtu.be/ZMLLfiwjtxo)

[![Watch demo](https://i.imgur.com/UrAkFo9.png)](https://youtu.be/ZMLLfiwjtxo)
<br></br>
<img src="https://i.imgur.com/0lC6aM3.png">
<br></br>
<img src="https://i.imgur.com/z3TFN0B.png">
<br></br>
<img src="https://i.imgur.com/mOIRbKO.png">

## Installation
Nothing to install. Shoshin runs in your browser, including the sandboxed JavaScript interpreter.

## Built With
* [React](https://reactjs.org/)
* [Redux](https://github.com/reduxjs/redux/blob/master/README.md)
* [React Router](https://reacttraining.com/react-router/)
* [Rails](https://rubyonrails.org/) RESTful API with [PostgreSQL](https://www.postgresql.org/) (Rails backend repo [here](https://github.com/jaf7/shoshin-code-backend))
* [ActionCable](http://guides.rubyonrails.org/action_cable_overview.html) WebSockets with [Redis Pub/Sub](https://redis.io/topics/pubsub)
* [JWT](https://jwt.io/) / [ruby-jwt](https://github.com/jwt/ruby-jwt/blob/master/README.md) / [Bcrypt](https://github.com/codahale/bcrypt-ruby/blob/master/README.md) hashing
* [Ace Editor](https://github.com/ajaxorg/ace/blob/master/Readme.md)
* [React-Ace](https://github.com/securingsincity/react-ace)
* [VM.js](https://github.com/tarruda/vm.js/) ES6 bytecode compiler and VM
* [React-MD](https://react-md.mlaursen.com/) Material Design Library
* Custom SASS additions using [node-sass-chokidar](https://www.npmjs.com/package/node-sass-chokidar) preprocessor

## To-do
 - [ ] Implement chat using Pusher Chatkit with WebSockets
 - [ ] Add read/write access toggling for 2nd party
 - [ ] Protect against infinite loops
 - [ ] Implement naming & saving of free-form sessions
 - [ ] Experiment with replacing VM.js interpreter with Node.js, inspired by [olydis](https://github.com/olydis/node-in-browser/blob/master/README.md)

 ### Backend
 The Rails backend repo is [here](https://github.com/jaf7/shoshin-code-backend)
<br></br>
## License

The MIT License (MIT)

Copyright (c) 2018 by Anthony Fields

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.