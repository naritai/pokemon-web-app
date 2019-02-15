import React, { Component } from 'react';
import './search-panel.css';

export default class SearchPanel extends Component {
  state = {
    term: '',
  }

  searchItems = (event) => {
    const newQuery = event.target.value.toLowerCase();
    this.setState({ term: newQuery });
    this.props.onSearchChange(newQuery);
  }

  render() {
    return (
      <div className="search-panel">
        <input
          type="text"
          placeholder="Start typing here..."
          value={this.state.term}
          onChange={this.searchItems}
        />

        <span className="icon-wrapper">
          <i className="icon fa fa-search" />
        </span>
      </div>
    );
  }
}
