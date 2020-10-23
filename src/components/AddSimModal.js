import React, { Component } from 'react';
import {
    NavLink,
    Modal,
    ModalBody,
    ModalHeader,
    Label,
    Input,
    Button,
    Form,
    FormGroup, Alert
} from 'reactstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addSim } from '../actions/branchActions';
import { clearErrors } from '../actions/errorActions';
class AddSimModal extends Component {
    state = {
        modal: false,
        simulation:'',
        name: '',
        branch: '',
        subject: '',
        introduction:'',
        theory: '',
        objective: [],
        procedure: [],
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
                this.toggle();
            }
        }
    }

    toggle = () => {
        //clear errors
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
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
            <div>
                <NavLink onClick={this.toggle} href="#">
                    Add Simulation
                </NavLink>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add New Experiment</ModalHeader>
                    <ModalBody>
                        {this.state.msg ?
                            (
                                <Alert color='danger'>
                                    { this.state.msg}
                                </Alert>
                            ) : null
                        }
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="simulation">Simulation</Label>
                                <Input
                                    type="text"
                                    name="simulation"
                                    id="simulation"
                                    placeholder="Name of Simulation(No white spaces)"
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                    type="name"
                                    name="name"
                                    id="name"
                                    placeholder="Name of Experiment"
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="branch">Branch</Label>
                                <Input
                                    type="branch"
                                    name="branch"
                                    id="branch"
                                    placeholder="Branch"
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="subject">Subject</Label>
                                <Input
                                    type="subject"
                                    name="subject"
                                    id="subject"
                                    placeholder="subject"
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="introduction">Introduction</Label>
                                <Input
                                    type="introduction"
                                    name="introduction"
                                    id="introduction"
                                    placeholder="introduction"
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="theory">Theory</Label>
                                <Input
                                    type="theory"
                                    name="theory"
                                    id="theory"
                                    placeholder="theory"
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="objective">Objective</Label>
                                <Input
                                    type="objective"
                                    name="objective"
                                    id="objective"
                                    placeholder="objective"
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="procedure">Procedure</Label>
                                <Input
                                    type="procedure"
                                    name="procedure"
                                    id="procedure"
                                    placeholder="procedure"
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                            <Button color='dark'>Add</Button>
                        </Form>
                    </ModalBody>
                </Modal>
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
)(AddSimModal);
