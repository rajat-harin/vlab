import React, { Component } from 'react';
import {
    Label,
    Input,
    Button,
    Form,
    FormGroup,
    Alert,
    CustomInput
} from 'reactstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSingleSim, updateSim } from '../actions/branchActions';
import { clearErrors } from '../actions/errorActions';

import Spinner from './Spinner';
import { withRouter } from 'react-router-dom';
import FileUploadPage from './FileUploadPage';

class UpdateSimPage extends Component {
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
        msg: null,
        isNewUpload: false,
        isSubmit: false
    }

    static propTypes = {

        clearErrors: PropTypes.func.isRequired,
        getSingleSim: PropTypes.func.isRequired,
        singleExp: PropTypes.object.isRequired,
        msg: PropTypes.string.isRequired
    }

    componentDidMount() {
        this.props.getSingleSim(this.props.match.params.id)
    }
    componentDidUpdate(prevProps) {
        if (this.props.singleExp !== prevProps.singleExp) {
            let { simulation, name, branch, subject, introduction, theory, objective, procedure } = this.props.singleExp;
            this.setState({
                simulation,
                name,
                branch,
                subject,
                introduction,
                theory,
                objective,
                procedure
            })
        }
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
        if (e.target.name === "objective" || e.target.name === "procedure") {
            this.setState({ [e.target.name]: e.target.value.split(',') })
        }
        else if(e.target.name === "isNewUpload") {
            this.setState({ [e.target.name]: e.target.checked })
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
        this.props.updateSim(newSim);

        this.submitToggle();
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
        if(this.state.isSubmit && this.state.isNewUpload)
        {
            return (
                <FileUploadPage name= {this.state.simulation} />
            )
        }
        if(this.props.isSuccess && this.state.msg)
        {
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
                <h1>Update Experiment</h1>
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

                    <Form onSubmit={this.onSubmit}>
                        <FormGroup className="row">
                            <Label for="simulation" className="col-sm-2 col-form-label font-weight-bold">Simulation</Label>
                            <Input
                                type="text"
                                name="simulation"
                                id="simulation"
                                value={this.state.simulation}
                                className="col-sm-10"
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup className="row">
                            <Label for="name" className="col-sm-2 col-form-label font-weight-bold">Name</Label>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Name of Experiment"
                                value={this.state.name}
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
                                value={this.state.branch}
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
                                value={this.state.subject}
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
                                value={this.state.introduction}
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
                                value={this.state.theory}
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
                                value={this.state.objective.join('\n')}
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
                                value={this.state.procedure.join('\n')}
                                onChange={this.onChange}
                                className="col-sm-10"
                                required
                            />
                        </FormGroup>
                        <FormGroup className="row">
                        <Label for="subject" className="col-sm-2 col-form-label font-weight-bold"> </Label>
                            <CustomInput 
                                type="switch" 
                                id="isNewUpload" 
                                name="isNewUpload" 
                                className="col-sm-10" 
                                checked = {this.state.isNewUpload}
                                onChange={this.onChange}
                                label="Turn this on if you want to upload updated simulation file." 
                            />
                        </FormGroup>
                        <br />
                        <Button color='dark' style={{ float: "right" }}>Update</Button>
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
    { getSingleSim, clearErrors, updateSim }
)(UpdateSimPage));
