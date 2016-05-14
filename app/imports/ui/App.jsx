import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';

import FaList from 'react-icons/lib/fa/list';
import FaCalendarCheckO from 'react-icons/lib/fa/calendar-check-o';
import FaFacebookOfficial from 'react-icons/lib/fa/facebook-official';

var Menu = require('react-burger-menu').slide;

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
        };
    }

    render() {
        return (
            <div class="container">
                <div class="bm-menu">
                    <Menu class="bm-item-list" isOpen={this.state.isOpen}>
                        <Link id="tasks" to="/">
                            <FaList />
                            <span>Tasks</span>
                        </Link>
                        <Link id="calendar" to="/calendar">
                            <FaCalendarCheckO />
                            <span>Calendar</span>
                        </Link>
                        <Link id="social" to="#">
                            <FaFacebookOfficial />
                            <span>Social</span>
                        </Link>
                    </Menu>
                </div>

                {this.props.children}

            </div>
        );
    }

}
