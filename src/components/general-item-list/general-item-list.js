/* eslint react/no-multi-comp: 0 */
/* eslint react/prop-types: 0 */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { PokemonApiConsumer } from '../poke-api-context';
import PokemonService from '../../services/poke-api';
import { withData } from '../hoc-helpers';
import './general-item-list.css';

const GeneralItemList = ({ searchQuery, data,
  renderItem, Item, history, match }) => {

  const search = (items, query) => {
    if (query === '') return items;
    return items.filter(item => item.name.indexOf(query) !== -1);
  };

  const onItemSelected = (name) => {
    history.push(name);
  };

  const renderElements = () => {
    const elements = search(data, searchQuery).map((item) => {
      const options = renderItem(item);

      // Test Context API
      return (
        <li key={options.name}
            // при клике добавить к URL имя покемона, которое получит из URL компонент PokemonDetails
            onClick={() => onItemSelected(options.name)}>
          <PokemonApiConsumer>
            {
              (pokeApi) => {
                return (
                  <Item options={options} getData={pokeApi.getPokemonImage}/>
                )
              }
            }
          </PokemonApiConsumer>
        </li>
      );
    });

    return elements;
  };

  return (
    <div>
      <div>
        <ul className="item-list">
          {data ? renderElements() : null}
        </ul>
      </div>
    </div>
  );
};

// Test Default Props
GeneralItemList.defaultProps = {
  itemSelected: () => console.log('Hello there!'),
};

const { getPokemonsList } = new PokemonService();

export default withData(withRouter(GeneralItemList), getPokemonsList);
