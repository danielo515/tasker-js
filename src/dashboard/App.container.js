import { connect } from 'react-redux';
import App from './App';

import { start, stop, pause, createTaskModal } from './store';

const mapStateToProps = ({ tasks }) => ({
    tasks
});

const mapDispatchToProps = dispatch => {

    return { 
        start: start(dispatch), 
        stop: stop(dispatch),
        pause: pause(dispatch),
        openModal: createTaskModal(dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
