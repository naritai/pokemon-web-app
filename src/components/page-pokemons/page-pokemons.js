/* eslint react/no-multi-comp: 0 */

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PokemonDetails from './pokemon-details';
import Record from './record';
import GeneralItemList from '../general-item-list';
import PokemonItem from './pokemon-item';
import SearchPanel from '../search-panel';

import './page-pokemons.css';

class PagePokemons extends Component {
  state = {
    searchQuery: '',
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
    const { searchQuery } = this.state;
    const { match } = this.props;
    const { id } = match.params;

    return (
      <div>
        <SearchPanel onSearchChange={this.onSearchChange} />

        <div className="containerz">
          <GeneralItemList
            Item={PokemonItem}
            renderItem={this.renderPokemons}
            searchQuery={searchQuery}
          />

          <PokemonDetails name={id}>
            <Record field="name" label="Name" />
            <Record field="weight" label="Weight" />
            <Record field="height" label="Height" />
          </PokemonDetails>
        </div>
      </div>
    );
  }
}

export default withRouter(PagePokemons);
