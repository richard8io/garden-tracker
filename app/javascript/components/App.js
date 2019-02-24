import React from 'react';
import { Route } from 'react-router-dom';
import { Alert } from '../helpers/notifications';
import Header from './Header';
import Users from './Users';
import Beds from './Beds';
import Sectors from './Sectors';
import './App.css';

// ========================================

const App = () => (
  <div>
    <Header />
    <Route path="/users/:id?" component={Users} />
    <Route path="/beds/:id?" component={Beds} />
    <Route path="/sectors/:id?" component={Sectors} />
    <Alert stack={ { limit: 3 } } />
  </div>
);

export default App;