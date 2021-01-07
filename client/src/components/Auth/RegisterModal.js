import React, { Component } from 'react';
import {
    Label,
    Input,
    Button,
    Form,
    FormGroup, Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';
class RegisterModal extends Component {
    state = {
        modal: false,
        name: '',
        email: '',
        password: '',
        isAdmin: false,
        sendingEmail: false,
        msg: null,
        successMassage: null
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        isRegisterSuccess: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
        message: PropTypes.string
    }

    componentDidUpdate(prevProps) {
        const { error, message } = this.props;
        if (error !== prevProps.error) {
            //CHECK for register error
            if (error.id === 'REGISTER_FAIL') {
                this.setState({ msg: error.msg.msg })
            }
            else {
                this.setState({ msg: null })
            }
        }
        if (message !== prevProps.message) {
            this.setState({
                successMassage: message
            })
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
        this.setState({ sendingEmail: true })
        const { name, email, password, isAdmin } = this.state;
        const newUser = {
            username: name,
            email,
            password,
            isAdmin
        }
        this.props.register(newUser);

        // this.toggle();
    }
    render() {
        return (
            <div className="container" style={{
                height: "90vh"
            }}>
                <br />
                <br />
                JOIN VLAB
                <br />

                <h1>Create your account</h1>
                <br />
                <br />
                <div style={{

                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                }}>

                    <div className="card text-left" style={{
                        width: "480px",
                        padding: "25px",
                    }}>
                        {this.state.msg ?
                            (
                                <Alert color='danger'>
                                    { this.state.msg}
                                </Alert>
                            ) : null
                        }
                        {this.state.successMassage ?
                            (
                                <Alert color='success'>
                                    { this.state.successMassage}
                                </Alert>
                            ) : null
                        }
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Name"
                                    onChange={this.onChange}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    onChange={this.onChange}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    onChange={this.onChange}
                                    required
                                />
                            </FormGroup>
                            {this.state.successMassage === 'Your email was already confirmed' ?
                                        (
                                            <Link to="/login" className="btn btn-dark active" role="button" aria-pressed="true">Login</Link>
                                        ) : 
                            <Button color='dark' disabled={this.state.sendingEmail}>
                                {this.state.sendingEmail
                                    ?
                                    <Fragment> <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                    &nbsp;&nbsp;Loading...
                                    </Fragment>
                                    : 
                                    "Register"
                                    
                                }
                            </Button>
                            }
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            Already have an account?
                                <Link to="/login"> Sign in</Link>

                        </Form>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isAdmin: state.auth.isAdmin,
    isRegisterSuccess: state.auth.isRegisterSuccess,
    message: state.auth.msg,
    error: state.error
})

export default connect(
    mapStateToProps,
    { register, clearErrors }
)(RegisterModal);
