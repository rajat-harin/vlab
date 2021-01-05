import React, { Component } from 'react';
import {
    Label,
    Input,
    Button,
    Form,
    FormGroup,
    Alert,
    FormText
} from 'reactstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { dropSim } from '../actions/branchActions';
import { clearErrors } from '../actions/errorActions';

import Spinner from './Spinner';
import { withRouter } from 'react-router-dom';
const crypto = require("crypto");

class DropSimPage extends Component {
    state = {
        id: null,
        code: null,
        check: null,
        msg: null,
        isSubmit: false
    }

    static propTypes = {

        clearErrors: PropTypes.func.isRequired,
        dropSim: PropTypes.func.isRequired,
        msg: PropTypes.string.isRequired
    }

    componentDidMount() {
        this.setState({
            code: crypto.randomBytes(4).toString('hex'),
            id: this.props.match.params.id
        })
        
    }
    componentDidUpdate(prevProps) {
        const { error, isSuccess } = this.props;
        if (error !== prevProps.error) {
            //CHECK for register error
            if (error.id === 'ADD_BRANCH_FAIL') {
                this.setState({ msg: error.msg.msg })
            }
            else {
                this.setState({ msg: null })
            }
        }
        if (isSuccess && this.props.msg !== prevProps.msg) {
            this.setState({ msg: this.props.msg })
        }

    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault();
        const { id } = this.state;

        if (this.state.code === this.state.check) {
            const newSim = {
                id
            }
            this.props.dropSim(newSim);
            this.submitToggle();
        }
        else {
            this.setState({
                msg: 'You have entered wrong code.'
            })
        }

        
    }
    submitToggle = () => {
        this.setState({
            isSubmit: !this.state.isSubmit
        });
    }
    render() {
        if (this.props.isLoading) {
            return (
                <Spinner />
            )
        }
        if (this.props.error && this.props.error.id === 'LOAD_SINGLE_SIM_FAIL') {
            return (
                <div style={{ height: '80vh' }}>
                    <div style={{

                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                    }}>
                        <Alert color='primary'>
                            {this.props.error.msg.msg}
                        </Alert>
                    </div>
                </div>
            )
        }
        if (this.props.isSubmit && this.state.msg) {
            return (
                <div>
                    {(this.state.msg) ?
                        (
                            (this.props.isSuccess) ?
                                (
                                    <Alert color='primary'>
                                        { this.state.msg}
                                    </Alert>
                                ) :
                                (<Alert color='danger'>
                                    {this.state.msg}
                                </Alert>)
                        ) : null
                    }
                </div>
            )
        }
        return (
            <div className="container text-left">
                <br />
                <h1>Delete Existing Experiment</h1>
                <br /><br />
                <div className="card" style={{ padding: "50px" }}>
                    {(this.state.msg) ?
                        (
                            (this.props.isSuccess) ?
                                (
                                    <Alert color='primary'>
                                        { this.state.msg}
                                    </Alert>
                                ) :
                                (<Alert color='danger'>
                                    {this.state.msg}
                                </Alert>)
                        ) : null
                    }

                    <Form onSubmit={this.onSubmit}>
                        <FormText color="dark">
                            Submitting this form will delete the experimment. 
                            please read below information before you procede for Deletion of Experiment.
                            <br/>
                        </FormText>
                        <FormText color="danger">
                            
                            <ul>
                                <li>
                                    Deleting the Experiment will delete all the related data and simulation files.
                                </li>
                                <li>
                                    This operation is irreversible so, please follow with caution.
                                </li>
                            </ul>
                            <br/>
                        </FormText>
                        <FormText color="dark">
                            Please enter the code below in the input field if you are sure to delete the Experiment.
                            <br/>
                        </FormText>
                        <div className="col-sm-12 text-center p-3">
                            <h5>{this.state.code}</h5>
                        </div>
                        <FormGroup className="row ">
                            <Input
                                type="text"
                                name="check"
                                id="check"
                                value={this.state.check}
                                onChange={this.onChange}
                                className="col-sm-4 offset-sm-4"
                            />
                        </FormGroup>
                        <br />
                        <Button color='dark' style={{ float: "right" }}>Drop</Button>
                    </Form>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => ({
    isSuccess: state.branch.isSuccess,
    singleExp: state.branch.singleExp,
    error: state.error,
    msg: state.branch.msg
})

export default withRouter(connect(
    mapStateToProps,
    { clearErrors, dropSim }
)(DropSimPage));
