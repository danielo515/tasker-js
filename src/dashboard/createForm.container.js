import { connect } from 'react-redux';
import Form from './components/Form';
import { start } from './redux/store';

const mapStateToProps = ({ ui }) => ({
    isOpen: ui.create_open
});

const mapDispatchToProps = dispatch => {

    return { 
        start: start(dispatch)
    };
};

export default connect(mapStateToProps,{ start })(Form);
