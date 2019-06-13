import { Component } from 'react';
import PropTypes from 'prop-types';

export default class Tick extends Component {
    constructor(props) {
        super(props);
        const {interval} = this.props;
        this.state = {count:0};
        this.interval = interval * 1000;
        this.intervalId = null;
    }

    tick() {
        this.setState(({count}) => ({ count: count+1 }));
    }

    componentDidMount() {
        this.intervalId = setInterval(this.tick.bind(this), this.interval);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }
    
    render() {
        const {children, interval:_, ...props} = this.props;
        return children({...props});
    }
}

Tick.propTypes={
    children: PropTypes.func.isRequired,
    interval: PropTypes.number,
};

Tick.defaultProps = {
    interval: 10,//every 10 seconds by default
};

