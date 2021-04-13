import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import {
    Label,
    Input,
    Button,
    Form,
    FormGroup,
    Alert
} from 'reactstrap';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';
import { addSim } from '../actions/branchActions';
import { clearErrors } from '../actions/errorActions';
import FileUploadPage from './FileUploadPage';
import TextField from '@material-ui/core/TextField';

const filter = createFilterOptions();
class AddSimPage extends Component {
    state = {
        modal: true,
        simulation: '',
        name: '',
        branch: 'cse',
        subject: '',
        introduction: '',
        theory: '',
        objective: [],
        procedure: [],
        selectedFile: null,
        msg: null,
        isSubmit: false,
        navigate: false,
        subjectList: []
    }

    static propTypes = {
        isSuccess: PropTypes.bool,
        error: PropTypes.object.isRequired,
        addSim: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }
    componentDidMount() {
        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        Axios.get('/topic/subjectList', config)
            .then(res => {
                let listSubject = [];
                res.data.forEach(element => {
                    listSubject.push({title: element})
                });
                this.setState({
                    subjectList: listSubject
                })
            })
            .catch(err => {
                console.log(err);
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
        if (this.state.isSubmit) {
            if (isSuccess) {
                this.setState({
                    navigate: true,
                    isSubmit: false
                })
            }
        }
    }

    onChange = e => {
        console.log(this.state);
        if (e.target.name === "objective" || e.target.name === "procedure") {
            this.setState({ [e.target.name]: e.target.value.split('\n') })
        }
        else {
            this.setState({ [e.target.name]: e.target.value })
        }
        if (e.target.name === "name" || e.target.name === "branch") {
            let sim = this.state.name.substring(0, 8).replace(/\s/g, '') + Date.now().toString();
            this.setState({
                simulation: sim
            })
        }
    }

    onSubmit = e => {
        e.preventDefault();
        const { simulation, name, branch, subject, introduction, theory, objective, procedure } = this.state;

        const newSim = {
            simulation, name, branch, subject, introduction, theory, objective, procedure
        }
        this.props.addSim(newSim);

        this.submitToggle();
    }
    submitToggle = () => {
        this.setState({
            isSubmit: !this.state.isSubmit
        });
    }
    render() {
        if (this.state.navigate) {
            return (
                <FileUploadPage name={this.state.simulation} />
            )
        }
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
                                onChange={this.onChange}
                                className="col-sm-10"
                                required
                            />
                        </FormGroup>
                        <FormGroup className="row">
                            <Label for="branch" className="col-sm-2 col-form-label font-weight-bold">Branch</Label>
                            <Input
                                type="select"
                                name="branch"
                                id="branch"
                                value={this.state.branch}
                                className="col-sm-10"
                                onChange={this.onChange}
                            >
                                <option value="cse">Computer Science and Engineering</option>
                                <option value="mech">Mechanical Engineering</option>
                                <option value="etrx">Electronics Engineering</option>
                                <option value="et">Electrical Engineering</option>
                                <option value="etc">Electronics And Telecommunication Engineering</option>
                                <option value="it">Infomation Technology</option>
                                <option value="ce">Civil Engineering</option>
                                <option value="aiml">AIML</option>
                            </Input>
                        </FormGroup>
                        {/* <FormGroup className="row">
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
                        </FormGroup> */}
                        <FormGroup className="row">
                            <Label for="subject" className="col-sm-2 col-form-label font-weight-bold">Subject</Label>
                            <Autocomplete
                                value={this.state.subject}
                                onChange={(event, newValue) => {
                                    if (typeof newValue === 'string') {
                                        this.setState({
                                            subject: newValue,
                                        });
                                    } else if (newValue && newValue.inputValue) {
                                        // Create a new value from the user input
                                        this.setState({
                                            subject: newValue.inputValue,
                                        });
                                    } else {
                                        this.setState({
                                            subject: newValue.title
                                        });
                                    }
                                }}
                                filterOptions={(options, params) => {
                                    const filtered = filter(options, params);

                                    // Suggest the creation of a new value
                                    if (params.inputValue !== '') {
                                        filtered.push({
                                            inputValue: params.inputValue,
                                            title: `Add "${params.inputValue}"`,
                                        });
                                    }

                                    return filtered;
                                }}
                                name="subject"
                                id="subject"
                                selectOnFocus
                                clearOnBlur
                                handleHomeEndKeys
                                style={{ width: "80%" }}
                                options={this.state.subjectList}
                                getOptionLabel={(option) => {
                                    // Value selected with enter, right from the input
                                    if (typeof option === 'string') {
                                      return option;
                                    }
                                    // Add "xxx" option created dynamically
                                    if (option.inputValue) {
                                      return option.inputValue;
                                    }
                                    // Regular option
                                    return option.title;
                                  }}
                                renderOption={(option) => option.title}
                                size="small"
                                freeSolo
                                renderInput={(params) => <TextField {...params}
                                    label="subject"
                                    variant="outlined"
                                    onChange={this.onChange}
                                    className="col-sm-10"
                                    
                                    required
                                />}
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
