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
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import { Link, Redirect } from 'react-router-dom';
class LoginPage extends Component {
    state = {
        redirect: false,
        email: '',
        password: '',
        msg: null
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }
    componentDidMount() {
        const { isAuthenticated } = this.props;
        if (isAuthenticated) {
            this.setState({
                redirect: true
            });
        }

    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            //CHECK for register error
            if (error.id === 'LOGIN_FAIL') {
                this.setState({ msg: error.msg.msg })
            }
            else {
                this.setState({ msg: null })
            }
        }
        if (!this.state.redirect) {
            if (isAuthenticated) {
                this.setState({
                    redirect: true
                });
            }
        }
    }

    toggle = () => {
        //clear errors
        this.props.clearErrors();
        this.setState({
            redirect: !this.state.redirect
        });
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault();

        const { email, password } = this.state;
        const user = {
            email,
            password
        }
        this.props.login(user);



        //this.toggle();
    }
    render() {
        if (this.state.redirect) {
            return (
                <Redirect
                    to="/"
                />
            );
        }
        return (
            <div className="container" style={{
                height: "90vh"
            }}>
                <div style={{

                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                }}>
                    <img src="/logo.png" width="60" height="60" className="d-inline-block align-top" alt="" loading="lazy" />
                    <h1>
                        Sign in to VLab
                    </h1>
                    <br></br>
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
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="email"> Email</Label>
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
                                <Label for="password"> Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    onChange={this.onChange}
                                    required
                                />
                                <small>
                                    <strong>
                                        <Link to="/forgot"> Forgot password?</Link>
                                    </strong>
                                </small>
                            </FormGroup>

                            <br />
                            <Button color='dark' style={{
                                width: "100%"
                            }}>Login</Button>
                        </Form>
                    </div>
                    <br />
                    <div className="card">
                        <div className="card-body">
                            New To Vlab?
                                <Link to="/register"> Create an account</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(
    mapStateToProps,
    { login, clearErrors }
)(LoginPage);
