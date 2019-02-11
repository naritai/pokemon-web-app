import React from 'react';
import './header.css';

const Header = () => {
  return (
    <header className="main-header"> 
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Poke!</a>

        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#">Pokemons</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Abilities</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">About</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;
