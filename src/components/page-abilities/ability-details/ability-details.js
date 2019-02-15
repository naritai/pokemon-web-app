import React, { Component } from 'react';
import LoaderIndicatorSmall from '../../spinners/loader-indicator-small';
import './ability-details.css';

export default class AbilityDetails extends Component {
  state = {
    ability: null,
    loading: false,
  }

  componentDidUpdate(prevProps) {
    if (prevProps.name !== this.props.name) {
      this.setState({ loading: true });
      this.updateAbility();
    }
  }

  updateAbility = () => {
    const { name } = this.props;
    if (!name) {
      return;
    }
    console.log(name);

    this.setState({ ability: name, loading: false });
  }

  didComponentMount() {
    this.updateAbility();
  }

  render() {
    const { ability, loading } = this.state;
    const loadingIndicator = loading ? <LoaderIndicatorSmall /> : null;

    let data = ability;

    if (loadingIndicator !== null) data = null;

    return (
      <div className="ability-details">
        {loadingIndicator}
        <h1>{data}</h1>
      </div>
    );
  }
}
