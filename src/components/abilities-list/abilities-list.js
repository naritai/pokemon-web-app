import React, { Component } from 'react';
import PokemonService from '../../services/poke-api';
import AbilityItemDetails from '../ability-item-details';
import LoaderIndicator from '../loader-indicator';

import './abilities-list.css';

export default class AbilitiesList extends Component {
  pokemonService = new PokemonService();

  state = { 
    abilities: null, 
    loading: true,
    error: false
  }

  componentDidMount() {
    this.updateAbilitiesList();
  }

  onError() {
    this.setState({ error: true });
  }

  updateAbilitiesList = () => {
    this.pokemonService.getAbilitiesNamesList()
      .then(( abilities ) => {
        this.setState({ abilities, loading: false })
      })
      .catch(this.onError);
  }

  renderItems(items) {
    return items.map(({abilityName, description}) => 
      <li key={ abilityName }> 
        <AbilityItemDetails 
          abilityName={ abilityName }
          description={ description } /> 
      </li>)
  }

  render() {
    const { abilities, loading, error } = this.state;
    let errorMessage = error ? <span>Something went wrong, sorry</span> : null;
    let loadingSpinner = loading ? <LoaderIndicator /> : null;

    let elements = null;
    
    if (abilities) {
      elements = this.renderItems(abilities);
    }

    return (
      <div className="abilities-list">
        { loadingSpinner }
        { errorMessage }
        <ul className="abilities-items">
          { elements }
        </ul>
      </div>
    )
  }
}