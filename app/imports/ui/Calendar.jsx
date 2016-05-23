import React from 'react';
import { Component, PropTypes } from 'react';

import { Link } from 'react-router';

export default class Calendar extends Component {
  render() {
    return (
      <div className="container">

        <ul>
          <li><Link to="/">Home</Link></li>
        </ul>
      </div>
    );
  }
}