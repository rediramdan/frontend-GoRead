import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import './styles/fontawesome/css/all.min.css'
import './styles/fontawesome/css/fontawesome.min.css'
import './styles/app/index.css'

import BooksList from './pages/BooksList';
import Manage from './pages/Manage';
import RefreshToken from './pages/RefreshToken';
import BookDetail from './pages/BookDetail';
import BookEdit from './pages/BookEdit';
import Login from './pages/Login';
import Register from './pages/Register';


function App() {
  return (
    <>
      <Router>
        <Route path='/' render={(props) => (<BooksList {...props}/>)} exact/>
        <Route path='/manage' render={(props) => (<Manage {...props}/>)} exact/>
        <Route path='/refresh-token' render={(props) => (<RefreshToken {...props}/>)} exact/>
        <Route path='/book/:bookId' exact render={(props) => (<BookDetail {...props}/>)} />
        <Route path='/book/edit/:bookId' render={(props) => (<BookEdit {...props}/>)} />
        <Route path='/login' render={(props) => (<Login {...props}/>)} />
        <Route path='/register' render={(props) => (<Register {...props}/>)} />
      </Router>
    </>
  )
}

export default App;
