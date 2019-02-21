import React, { Component } from 'react';
import './error-boundry.css';

class ErrorBoundry extends Component {
  state = {
    hasError: false,
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <span>Sorry, some error has been happened... </span>;
    }
    return this.props.children;
  }
}

export default ErrorBoundry;
