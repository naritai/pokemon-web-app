import React, { Component } from 'react';
import PokemonService from '../../services/poke-api';
import LoaderIndicatorSmall from '../loader-indicator-small';

import './pokemon-item.css';
import imageNotFound from './not-found.png';

export default class PokemonItem extends Component {
  pokemonService = new PokemonService();

  state = {
    image: null,
    loading: true,
    error: false
  }

  componentDidMount() {
    this.uploadPokemonImage();
  }

  onImageLoaded = (image) => {
    this.setState({ image, loading: false });
  }

  onError = () => {
    this.setState({ error: true, loading: false });
  }

  uploadPokemonImage = () => {
    this.pokemonService.getPokemonImage(this.props.name)
      .then(data => this.onImageLoaded(data))
      .catch(this.onError);
  }

  render() {
    const { name } = this.props;
    const { image, loading } = this.state;

    const picture = image ? 
      <img className="item-image" src={image} alt={name} width="95px" height="90px" /> :
      <img src={imageNotFound} width="95px" height="90px" alt="error-icon"/>;

    const spinner = loading ? <LoaderIndicatorSmall /> : null;

    return (
      <div className="pokemon-item">
        { spinner }
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{ name }</h5>
            { picture }
          </div>
        </div>
      </div>
    )
  }
}