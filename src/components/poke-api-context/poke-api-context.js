import React from 'react';

const {
  Provider: PokemonApiProvider,
  Consumer: PokemonApiConsumer,
} = React.createContext();

export {
  PokemonApiProvider,
  PokemonApiConsumer,
};
