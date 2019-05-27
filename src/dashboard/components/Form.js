
import React, { PureComponent } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';

const Wrapper = styled(Paper)`
    padding: 1em;
`;

export default class Form extends PureComponent {
    constructor(props){
        super(props);
        this.state = {name:''};
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    handleChange(event){
        this.setState({name: event.target.value});
    }

    submit(){
        this.props.start(this.state.name)();
        this.setState({name:''});
    }

  

    render() {
        const { isOpen } = this.props;
        const {name} = this.state;
        return (
            <Dialog open={isOpen}>
                <DialogTitle id="habit-dialog-title">Create new habit</DialogTitle>
                <Wrapper>
                    <form noValidate autoComplete="off">
                        <TextField
                            id="outlined-name"
                            label="Name"
                            value={name}
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                        />
                        <Button color='primary' variant='outlined' onClick={this.submit}>
                            create
                        </Button>
                    </form>
                </Wrapper>
            </Dialog>
        );
    }
}
