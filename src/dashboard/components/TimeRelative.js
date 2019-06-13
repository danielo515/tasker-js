import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { distanceInWordsToNow, differenceInMinutes } from 'date-fns';

const second = 1000;
const minute = 60 * second;

export default class TimeRelative extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.timeout = null;
        this.startedAt = props.startedAt;
        this.suffix = props.suffix;
    }

    static getDerivedStateFromProps({startedAt}){
        return { text: distanceInWordsToNow(startedAt, { includeSeconds: true }) };
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
        return (<div> {this.state.text} {!!this.suffix && this.suffix}</div>);
    }
}

TimeRelative.propTypes={
    startedAt: PropTypes.number.isRequired,
    suffix: PropTypes.string,
};

