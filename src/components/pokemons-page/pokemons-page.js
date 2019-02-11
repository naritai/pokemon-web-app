import React, { Component } from 'react';
import PokemonList from '../pokemon-list';
import PokemonDetails from '../pokemon-details';
import SearchPanel from '../search-panel';

import './pokemons-page.css';

export default class PokemonsPage extends Component {
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
      <div>
        <SearchPanel onSearchChange={ this.onSearchChange } />

        <div className="container">
          <PokemonList 
            onPokemonSelected={ this.onPokemonSelected } 
            term={ pokemonSearchQuery } />

          <PokemonDetails name={ selectedPokemon } />
        </div>
      </div>
    )
  }
}
