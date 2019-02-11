import React, { Component } from 'react';
import Header from '../header';
import PokemonList from '../pokemon-list';
import SearchPanel from '../search-panel';
import PokemonDetails from '../pokemon-details';
import AbilitiesList from '../abilities-list';

import './app.css';

export default class App extends Component {
  state = {
    pokemonSearchQuery: '',
    selectedPokemon: null
  }

  onSearchChange = (query) => {
    this.setState({ pokemonSearchQuery: query });
  }

  onPokemonSelected = (name) => {
    this.setState({ selectedPokemon: name })
  }

  render() {
    const { pokemonSearchQuery, selectedPokemon } = this.state;
    
    return (
      <div className="app">
        <Header />
        
        <SearchPanel onSearchChange={ this.onSearchChange } />

        <div className="container">
          <PokemonList onPokemonSelected={ this.onPokemonSelected } 
                       term={ pokemonSearchQuery } />

            <PokemonDetails name={ selectedPokemon } />
        </div>

        <AbilitiesList />
      </div>
    )
  }
}