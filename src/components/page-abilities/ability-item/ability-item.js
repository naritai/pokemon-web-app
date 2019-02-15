import React from 'react';
import './ability-item.css';

const AbilityItem = ({ options }) => (
  <div className="abiliti-item">
    <span className="ability-title">{options.name}</span>
    <p className="ability-description">{options.description}</p>
  </div>
);

export default AbilityItem;
