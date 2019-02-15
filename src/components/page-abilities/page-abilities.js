import React, { Component } from 'react';
import GeneralItemList from '../general-item-list';
import PokemonService from '../../services/poke-api';
import AbilityItem from './ability-item';
import SearchPanel from '../search-panel';
import AbilityDetails from './ability-details';

import './page-abilities.css';

export default class PageAbilities extends Component {
  pokemonService = new PokemonService();

  state = {
    searchQuery: '',
    selectedAbility: null,
  }

  renderAbilities = (item) => {
    const opt = {};
    opt.name = item.name;
    opt.description = item.description;
    return opt;
  }

  onSearchChange = (query) => {
    this.setState({ searchQuery: query });
  }

  onAbilitySelected = (name) => {
    this.setState({ selectedAbility: name });
  }

  render() {
    const { searchQuery, selectedAbility } = this.state;
    const { onAbilitySelected } = this;

    return (
      <div>
        <SearchPanel onSearchChange={this.onSearchChange} />

        <div className="wrapperz">
          <GeneralItemList
            getData={this.pokemonService.getAbilitiesNamesList}
            Item={AbilityItem}
            renderItem={this.renderAbilities}
            searchQuery={searchQuery}
            itemSelected={onAbilitySelected}
          />

          <AbilityDetails name={selectedAbility} />
        </div>
      </div>
    );
  }
}
