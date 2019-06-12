import { connect } from 'react-redux';
import App from './App';

import { start, stop, pause, createTaskModal } from './redux/store';

const mapStateToProps = ({ tasks }) => ({
    tasks
});

export default connect(mapStateToProps, { start, stop, pause, createTaskModal })(App);
