import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from '../header';
import PagePokemons from '../page-pokemons';
import PageAbilities from '../page-abilities';
import PageAbout from '../page-about';
import PageIndex from '../page-index';


import './app.css';

const App = () => (
  <Router>
    <div className="app">
      <Header />

      <Route path="/" component={PageIndex} exact />
      <Route path="/pokemons" component={PagePokemons} />
      <Route path="/pokemons/:id" component={PagePokemons} exact />

      <Route path="/abilities" component={PageAbilities} />
      <Route path="/about" component={PageAbout} />

    </div>
  </Router>
);

export default App;
