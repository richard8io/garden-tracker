import React from 'react';
import { Route } from 'react-router-dom';
import { Alert } from '../helpers/notifications';
import Header from './Header';
import Login from './Login';
import Users from './Users';
import Beds from './Beds';
import Sectors from './Sectors';
import './App.css';

// ========================================

const App = () => (
  <div>
    <Header />
    <Route path="/login/:id?" component={Login} />
    <Route path="/users/:id?" component={Users} />
    <Route path="/beds/:id?" component={Beds} />
    <Route path="/sectors/:id?" component={Sectors} />
    <Alert stack={ { limit: 3 } } />
  </div>
);

export default App;