import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { CatImageDetailsPage } from './containers/CatImageDetailsPage';
import { HomePage } from './containers/HomePage';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Switch>
          <Route path="/:catImageId" component={CatImageDetailsPage} />
          <Route path="/" component={HomePage} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
