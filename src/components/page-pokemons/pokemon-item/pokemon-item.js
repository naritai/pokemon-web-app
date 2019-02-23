import React, { Component } from 'react';
import LoaderIndicatorSmall from '../../spinners/loader-indicator-small';

import './pokemon-item.css';
import imageNotFound from './not-found.png';

export default class PokemonItem extends Component {
  state = {
    image: null,
    loading: true,
  }

  componentDidMount() {
    this.uploadPokemonImage();
  }

  onImageLoaded = (image) => {
    this.setState({ image, loading: false });
  }

  onError = () => {
    this.setState({ loading: false });
  }

  uploadPokemonImage = () => {
    this.props.getData(this.props.options.name)
      .then(data => this.onImageLoaded(data))
      .catch(this.onError);
  }

  render() {
    const { options } = this.props;
    const { image, loading } = this.state;

    const picture = image ? (
      <img
        className="item-image"
        src={image}
        alt={options}
        width="95px"
        height="90px"
      />
    )
      : (
        <img
          src={imageNotFound}
          width="95px"
          height="90px"
          alt="error-icon"
        />
      );

    const spinner = loading ? <LoaderIndicatorSmall /> : null;

    return (
      <div className="pokemon-item">
        {spinner}
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{options.name}</h5>
            {picture}
          </div>
        </div>
      </div>
    );
  }
}
