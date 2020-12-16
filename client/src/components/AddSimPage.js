import React, { Component } from 'react';
import {
    Label,
    Input,
    Button,
    Form,
    FormGroup, Alert,
    FormText
} from 'reactstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addSim } from '../actions/branchActions';
import { clearErrors } from '../actions/errorActions';
import { Redirect } from 'react-router-dom';
class AddSimPage extends Component {
    state = {
        modal: true,
        simulation: '',
        name: '',
        branch: '',
        subject: '',
        introduction: '',
        theory: '',
        objective: [],
        procedure: [],
        selectedFile: null,
        msg: null
    }

    static propTypes = {
        isSuccess: PropTypes.bool,
        error: PropTypes.object.isRequired,
        addSim: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
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
        if (this.state.modal) {
            if (isSuccess) {
                this.setState({ msg: "Topic Added Successfully!!!" })
                this.toggle();
                this.props.history.push(`/addSim/${this.state.simulation}`)
            }
        }
    }

    toggle = () => {
        //clear errors
        //this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = e => {
        if (e.target.name === "objective" || e.target.name === "procedure") {
            this.setState({ [e.target.name]: e.target.value.split('\n') })
        }
        else {
            this.setState({ [e.target.name]: e.target.value })
        }
    }

    onSubmit = e => {
        e.preventDefault();

        const { simulation, name, branch, subject, introduction, theory, objective, procedure } = this.state;
        const newSim = {
            simulation, name, branch, subject, introduction, theory, objective, procedure
        }
        this.props.addSim(newSim);

        //this.toggle();
    }
    render() {
        return (
            <div className="container text-left">
                <br />
                <h1>Add New Experiment</h1>
                <br /><br />
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
                    {
                    }
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup className="row">
                            <Label for="simulation" className="col-sm-2 col-form-label font-weight-bold">Simulation</Label>
                            <Input
                                type="text"
                                name="simulation"
                                id="simulation"
                                placeholder="Name of Simulation(No white spaces)"
                                onChange={this.onChange}
                                className="col-sm-10"
                                required
                            />
                        </FormGroup>
                        <FormGroup className="row">
                            <Label for="name" className="col-sm-2 col-form-label font-weight-bold">Name</Label>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Name of Experiment"
                                onChange={this.onChange}
                                className="col-sm-10"
                                required
                            />
                        </FormGroup>
                        <FormGroup className="row">
                            <Label for="branch" className="col-sm-2 col-form-label font-weight-bold">Branch</Label>
                            <Input
                                type="text"
                                name="branch"
                                id="branch"
                                placeholder="Branch"
                                onChange={this.onChange}
                                className="col-sm-10"
                                required
                            />
                        </FormGroup>
                        <FormGroup className="row">
                            <Label for="subject" className="col-sm-2 col-form-label font-weight-bold">Subject</Label>
                            <Input
                                type="text"
                                name="subject"
                                id="subject"
                                placeholder="subject"
                                onChange={this.onChange}
                                className="col-sm-10"
                                required
                            />
                        </FormGroup>
                        <FormGroup className="row">
                            <Label for="introduction" className="col-sm-2 col-form-label font-weight-bold">Introduction</Label>
                            <Input
                                type="textarea"
                                name="introduction"
                                id="introduction"
                                placeholder="introduction"
                                onChange={this.onChange}
                                className="col-sm-10"
                                required
                            />
                        </FormGroup>
                        <FormGroup className="row">
                            <Label for="theory" className="col-sm-2 col-form-label font-weight-bold">Theory</Label>
                            <Input
                                type="textarea"
                                name="theory"
                                id="theory"
                                placeholder="theory"
                                onChange={this.onChange}
                                className="col-sm-10"
                                required
                            />
                        </FormGroup>
                        <FormGroup className="row">
                            <Label for="objective" className="col-sm-2 col-form-label font-weight-bold">Objective</Label>
                            <Input
                                type="textarea"
                                name="objective"
                                id="objective"
                                placeholder="objective"
                                onChange={this.onChange}
                                className="col-sm-10"
                                required
                            />
                        </FormGroup>
                        <FormGroup className="row">
                            <Label for="procedure" className="col-sm-2 col-form-label font-weight-bold">Procedure</Label>
                            <Input
                                type="textarea"
                                name="procedure"
                                id="procedure"
                                placeholder="procedure"
                                onChange={this.onChange}
                                className="col-sm-10"
                                required
                            />
                        </FormGroup>
                        <br />
                        <Button color='dark' style={{ float: "right" }}>Add</Button>
                    </Form>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => ({
    isSuccess: state.branch.isSuccess,
    error: state.error
})

export default connect(
    mapStateToProps,
    { addSim, clearErrors }
)(AddSimPage);