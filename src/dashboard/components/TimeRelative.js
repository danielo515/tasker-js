import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { distanceInWordsToNow, differenceInMinutes } from 'date-fns';

const second = 1000;
const minute = 60 * second;

export default class TimeRelative extends Component {
    constructor(props) {
        super(props);
        this.state = { text: distanceInWordsToNow(props.startedAt, { includeSeconds: true }) };
        this.timeout = null;
        this.startedAt = props.startedAt;
    }

    tick() {
        this.setState(() => ({
            text: distanceInWordsToNow(this.startedAt, { includeSeconds: true })
        }));
        const nextTimeout = differenceInMinutes(Date.now(), this.startedAt) == 0 ? 5 * second : minute;
        this.timeout = setTimeout(() => this.tick(), nextTimeout);
    }

    componentDidMount() {
        this.timeout = setTimeout(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }
    
    render() {
        return (
            <span>
                {this.state.text}
            </span>
        );
    }
}

TimeRelative.propTypes={
    startedAt: PropTypes.number.isRequired,
};

