import { connect } from 'react-redux';
import { startTask, stopTask } from '../tasks';
import  App from './App';



const mapStateToProps = ({tasks}) => ({
    tasks
});

const mapDispatchToProps = dispatch => {
    const start = title => () => {
        return dispatch({type: 'update', payload: {task: startTask(title)}});
    };
    const stop = title => () => {
        return dispatch({type: 'update', payload: {task: stopTask(title)}});
    };

    return { start, stop };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
