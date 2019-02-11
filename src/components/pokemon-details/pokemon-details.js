import React, { Component } from 'react';
import PokemonService from '../../services/poke-api';
import LoaderIndicatorSmall from '../loader-indicator-small';

import './pokemon-details.css';
import noneImage from './none.png';

export default class PokemonDetails extends Component {
  pokemonService = new PokemonService();

  state = {
    pokemon: null,
    loading: false,
    hasError: false,
    defaultTitle: true
  }

  didComponentMount() {
    this.updatePokemon();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.name !== this.props.name) {
      this.setState({ loading: true });
      this.updatePokemon();
    }
  }

  onError() {
    this.setState({ hasError: true, loading: false });
  }

  updatePokemon = () => {
    const { name } = this.props;
    if (!name) { return }

    this.pokemonService.getPokemonDetails(name)
        .then((pokemon) => {
          console.log(pokemon)
          this.setState(
            { pokemon, 
              loading: false,
              defaultTitle: false });
        })
        .catch(() => this.onError)
  }

  render() {
    const { pokemon, loading, defaultTitle } = this.state;
    const loadingIndicator = loading ? <LoaderIndicatorSmall /> : null;
    const defTitle = defaultTitle ? 
      <p className="default-title">Choose your pokemon to see details!</p> : null;

    let details = null;
    if (pokemon) {
      const { experience, height, 
        weight, id, name, image, evolves } = pokemon;

      const uppercase = name.charAt(0).toUpperCase() + name.slice(1);
      
      const nextGeneration = evolves ? 
        <img className="image" src={evolves[1]} alt={evolves[0]} height="120px" width="120px" />  : 
        <img className="image" src={noneImage} alt={'Not evolves'} height="120px" width="120px" />;

      details = (
        <div className="custom-card">
          <div className="custom-title-wrapper">
            <span className="id">#{ id } </span>
            <h3 className="custom-title">{ uppercase }</h3>
          </div>
          
          <div className="characteristic">
            <p className="height">Height: <span>{ height }</span> cm.</p>
            <p className="weight">Weight: <span>{ weight }</span> kg.</p>
            <p className="experience">Base experience: <span>{ experience }</span> </p>
          </div>

          <div className="evolution-title"><span>Evolves to:</span></div>

          <div className="evolution">
            <img className="image" src={image} alt={uppercase} height="120px" width="120px" />
            <div class="arrow"></div>
            { nextGeneration }
          </div>
        </div>
      )
    }

    if (loadingIndicator !== null) details = null;

    return (
      <div className="pokemon-details">
        { defTitle }
        { loadingIndicator }
        { details }
      </div>
    )
  }
}