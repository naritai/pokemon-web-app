import React, { Component } from 'react';
import LoaderIndicator from '../spinners/loader-indicator';
import './general-item-list.css';

export default class GeneralItemList extends Component {
  state = {
    itemList: null,
    error: false,
    loading: true,
    searchQuery: '',
  }

  componentDidMount() {
    this.updateList();
  }

  onListLoaded = (itemList) => {
    this.setState({ itemList, loading: false });
  }

  onError() {
    this.setState({ error: true });
  }

  updateList() {
    const { getData } = this.props;

    getData()
      .then(itemList => this.onListLoaded(itemList))
      .catch(this.onError);
  }

  search(items, query) {
    if (query === '') return items;

    return items.filter(item => item.name.indexOf(query) !== -1);
  }

  onItemSelected = (name) => {
    const { itemSelected } = this.props;
    itemSelected(name);
  }

  renderItems(itemList) {
    const { searchQuery } = this.props;

    return this.search(itemList, searchQuery).map((item) => {
      const { renderItem, Item } = this.props;
      const options = renderItem(item);

      return (
        <li key={options.name} onClick={() => this.onItemSelected(options.name)}>
          <Item options={options} />
        </li>
      );
    });
  }

  render() {
    const { itemList, loading } = this.state;
    const spinner = loading ? <LoaderIndicator /> : null;

    let elements;

    if (itemList) elements = this.renderItems(itemList);

    return (
      <div>
        <div>
          <ul className="item-list">
            {spinner}
            {elements}
          </ul>
        </div>
      </div>
    );
  }
}
