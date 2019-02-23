import React, { Component } from 'react';
import LoaderIndicator from '../spinners/loader-indicator';

const withData = (View, getData) => {
  return class extends Component {
    state = {
      data: null,
      loading: true,
      searchQuery: '',
    }
  
    componentDidMount() {
      this.updateList();
    }
  
    onListLoaded = (data) => {
      this.setState({ data, loading: false });
    }
  
    updateList() {
      getData()
        .then(data => this.onListLoaded(data));
    }

    render() {
      const { data, loading } = this.state;

      if (loading) {
        return <LoaderIndicator />;
      }

      return (
        <View {...this.props} data={data} />
      )
    }
  };
};

export default withData;
