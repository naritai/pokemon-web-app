import React, { Component } from 'react';
import PokemonDetails from './pokemon-details';
import GeneralItemList from '../general-item-list';
import PokemonItem from './pokemon-item';
import PokemonService from '../../services/poke-api';
import SearchPanel from '../search-panel';

import './page-pokemons.css';

export default class PagePokemons extends Component {
  pokemonService = new PokemonService();

  state = {
    selectedPokemon: null,
    searchQuery: '',
  }

  onPokemonSelected = (name) => {
    this.setState({ selectedPokemon: name });
  }

  onSearchChange = (query) => {
    this.setState({ searchQuery: query });
  }

  renderPokemons = (item) => {
    const opt = {};
    opt.name = item.name;
    return opt;
  }

  render() {
    const { selectedPokemon, searchQuery } = this.state;
    const { onPokemonSelected } = this;

    return (
      <div>
        <SearchPanel onSearchChange={this.onSearchChange} />

        <div className="containerz">

          <GeneralItemList
            getData={this.pokemonService.getPokemonsList}
            Item={PokemonItem}
            renderItem={this.renderPokemons}
            searchQuery={searchQuery}
            itemSelected={onPokemonSelected}
          />

          <PokemonDetails name={selectedPokemon} />
        </div>
      </div>
    );
  }
}
