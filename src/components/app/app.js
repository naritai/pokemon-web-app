import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import ErrorBoundry from '../error-boundry';
import PageIndex from '../page-index';
import Header from '../header';
import PagePokemons from '../page-pokemons';

import { PokemonApiProvider } from '../poke-api-context';
import PokemonService from '../../services/poke-api';

import './app.css';

const pokeApi = new PokemonService();

const App = () => (
  <ErrorBoundry>
    <PokemonApiProvider value={pokeApi}>
      <Router>
        <Switch>
          <div className="app">
            <Header />

            <Route path="/" component={PageIndex} exact />
            <Route path="/pokemons/:id?" component={PagePokemons} />
            <Redirect to="/" />
          </div>
        </Switch>
      </Router>
    </PokemonApiProvider>
  </ErrorBoundry>
);

export default App;
