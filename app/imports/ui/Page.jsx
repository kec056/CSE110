import React from 'react';
import { Component, PropTypes } from 'react';

import { Link } from 'react-router';
/*
export default React.createClass( {
    render() {
        return (
            <div>My new page</div>
        );
    }
})
*/

export default class Page extends Component {
    render() {
        return (
            <div>
                <h1>My new page</h1>
                <ul>
                    <li><Link to="/">Home</Link></li>
                </ul>
            </div>
        );
    }
}