import React from 'react';
import './ability-item-details.css';

const AbilityItemDetails = ({ abilityName, description }) => (
  <div className="abiliti-item-details">
    <span className="ability-title">{abilityName}</span>
    <p className="ability-description">{description}</p>
  </div>
);

export default AbilityItemDetails;
