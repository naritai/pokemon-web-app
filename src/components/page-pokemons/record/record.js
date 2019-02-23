import React from 'react';
import './record.css';

const Record = ({ pokemon, field, label }) => {
  return (
    <div>
      <h2>
        <span>{label}: </span>
        <span>{pokemon[field]}</span>
      </h2>
    </div>
  );
};

export default Record;
