import React from 'react'
import { Link } from 'react-router-dom'
import './header.css'

const Header = () => {
  return (
    <header className='main-header'>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <Link className='navbar-brand' to='/'>
          Poke!
        </Link>

        <ul className='navbar-nav'>
          <li className='nav-item'>
            <Link className='nav-link' to='/pokemons'>
              Pokemons
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/abilities'>
              Abilities
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/about'>
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
