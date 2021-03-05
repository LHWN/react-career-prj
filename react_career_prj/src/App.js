import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Home, Auth } from './pages';
import Homepage from './components/Home';
import SignIn from './components/SignIn/SignIn';

function App() {
  return (
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/auth" component={Auth} />
      {/* <Route path="/" component={Homepage} exact />
      <Route path="/signIn" component={SignIn} /> */}
    </div>
  );
}

export default App;
