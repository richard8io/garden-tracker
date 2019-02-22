import React from 'react';
import { Route } from 'react-router-dom';
import { Alert } from '../helpers/notifications';
import Editor from './Editor';
import './App.css';
import Beds from './Beds';

// ========================================

const App = () => (
  <div>
    <Route path="/users/:id?" component={Editor} />
    <Route path="/beds/:id?" component={Beds} />
    <Alert stack={ { limit: 3 } } />
  </div>
);

export default App;