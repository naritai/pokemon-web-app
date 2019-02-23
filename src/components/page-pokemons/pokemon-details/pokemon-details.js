/* eslint jsx-a11y/alt-text: 0 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PokemonService from '../../../services/poke-api';
import LoaderIndicatorSmall from '../../spinners/loader-indicator-small';
import noneImage from './none.png';
import './pokemon-details.css';

export default class PokemonDetails extends Component {
  static propTypes = {
    name: PropTypes.string,
  };

  pokemonService = new PokemonService()

  state = {
    pokemon: null,
    loading: false,
  }

  componentDidMount() {
    this.updatePokemon();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.name !== this.props.name) {
      this.updatePokemon();
    }
  }

  updatePokemon = () => {
    const { name } = this.props;
    if (!name) return;

    this.setState({ loading: true });
    this.pokemonService
      .getPokemonDetails(name)
      .then((pokemon) => {
        this.setState({ pokemon, loading: false });
      });
  }

  render() {
    const { pokemon, loading } = this.state;
    const load = loading ? <LoaderIndicatorSmall /> : null;

    if (!pokemon) return null;

    const {
      height, weight, name, image, evolves,
    } = pokemon;

    const evolvesInto = (
      <img
        className="image"
        src={evolves ? evolves[1] : noneImage}
        height="120px"
        width="120px"
      />
    );


    return (
      <div className="pokemon-details">
        {load}
        <div>
          <ul>
            <li>
              {
                React.Children.map(this.props.children, (child) => {
                  return React.cloneElement(child, { pokemon });
                })
              }
            </li>
          </ul>
          <img className="image" src={image} height="120px" width="120px" />
        </div>
        {evolvesInto}
      </div>
    );
  }
};
