import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
/* import Bootstrap from 'react-bootstrap'; */



// component import
import App from './components/App/App';
import NotFound from './components/App/NotFound';
import Home from './components/Home/Home';
import listProfile from './components/Profile/listUser';
import detailProfile from './components/Profile/profil';
import listAppartement from './components/Appartements/appartement';
import detailAppartement from './components/Appartements/singleAppart';

import {
    BrowserRouter as Router,
    Route,
    Link ,
    Switch
  } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Router>
    <App>
      <Switch>
        <Route exact path="/"           component={Home}/>
        <Route exact path="/appart"     component={listAppartement}/>
        <Route path="/appart/:id"       component={detailAppartement}/>
        <Route exact path="/profil"     component={listProfile}/>
        <Route path="/profil/:id"       component={detailProfile}/>
        <Route component={NotFound}/>
      </Switch>
    </App>
  </Router>, document.getElementById('root'));

registerServiceWorker();


