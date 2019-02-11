import React, { Component } from 'react'
import PokemonItem from '../pokemon-item'
import PokemonService from '../../services/poke-api'
import LoaderIndicator from '../loader-indicator'

import './pokemon-list.css'

export default class PokemonList extends Component {
  pokemonService = new PokemonService()

  state = {
    pokemonList: null,
    loading: true,
    error: false
  }

  componentDidMount () {
    this.updatePokemonList()
  }

  onPokemonListLoaded = data => {
    this.setState({ pokemonList: data, loading: false })
  }

  onError = () => {
    this.setState({ error: true, loading: false })
  }

  updatePokemonList () {
    this.pokemonService
      .getPokemonsList()
      .then(data => this.onPokemonListLoaded(data))
      .catch(this.onError)
  }

  onItemSelected = name => {
    this.props.onPokemonSelected(name)
  }

  renderItems () {
    const { pokemonList } = this.state
    const { term } = this.props

    return this.search(pokemonList, term).map(({ name }) => (
      <li key={name} onClick={() => this.onItemSelected(name)}>
        <PokemonItem name={name} />{' '}
      </li>
    ))
  }

  search (items, label) {
    if (label === '') return items

    return items.filter(item => item.name.indexOf(label) !== -1)
  }

  render () {
    const { pokemonList, loading, error } = this.state
    const spinner = loading ? <LoaderIndicator /> : null
    const errorMessage = error ? (
      <span>Something went wrong, sorry.</span>
    ) : null

    let elements
    if (pokemonList) elements = this.renderItems()

    return (
      <div className='pokemon-list'>
        {spinner}
        <ul className='pokemon-list'>
          {errorMessage}
          {elements}
        </ul>
      </div>
    )
  }
}
