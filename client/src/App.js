import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Home from './components/pages/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Update from './components/auth/Update';
import Alerts from './components/layouts/Alerts';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';

import AuthState from './context/auth/authState';
import ProductState from './context/product/ProductState';
import AlertState from './context/alert/alertState';
import './App.css';



if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  return (
    <AuthState>
      <ProductState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className="container">
                <Alerts />
              </div>
              <Switch>
                <PrivateRoute exact path='/' component={Home} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/update/:_id' component={Update} />
              </Switch>
            </Fragment>
          </Router>
        </AlertState>
      </ProductState>
    </AuthState>
  );
}

export default App;
