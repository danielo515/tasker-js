import { connect } from 'react-redux';
import App from './App';

import { start, stop, pause } from './store';

const mapStateToProps = ({ tasks }) => ({
    tasks
});

const mapDispatchToProps = dispatch => {

    return { 
        start: start(dispatch), 
        stop: stop(dispatch),
        pause: pause(dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
