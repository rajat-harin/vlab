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
import { forgotReset } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import { Fragment } from 'react';

class ForgotPasswordPage extends Component {
    state = {
        sub: false,
        password: '',
        cpassword: '',
        msg: null,
        isForgotSuccess: false,
        resetPasswordToken: null,
        successMassage: null
    }

    static propTypes = {
        error: PropTypes.object.isRequired,
        clearErrors: PropTypes.func.isRequired,
        forgot: PropTypes.func.isRequired,
        isForgotSuccess: PropTypes.bool.isRequired,
        message: PropTypes.string
    }
    componentDidMount() {
        const { token } = this.props.match.params

        if (!this.state.passwordToken) {
            this.setState({
                resetPasswordToken: token
            });
        }

    }

    componentDidUpdate(prevProps) {
        const { error, isForgotSuccess, message } = this.props;
        if (error !== prevProps.error) {
            //CHECK for register error
            if (error.id === 'FORGOTRESET_FAIL') {
                this.setState({ msg: error.msg.msg })
            }
            else {
                this.setState({ msg: null })
            }
        }
        if (!this.state.isForgotSuccess) {
            if (isForgotSuccess) {
                this.setState({
                    isForgotSuccess: true,
                    successMassage: message
                });
            }
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault();
        if (this.state.cpassword === this.state.password) {
            const { password, resetPasswordToken } = this.state;
            const user = {
                password,
                resetPasswordToken
            }
            this.props.forgotReset(user);
        }
        else{
            this.setState({
                msg: 'Password does not match!'
            })
        }
    }
    render() {
        if (this.state.isForgotSuccess) {
            return (
                <Fragment>
                    <div className="container" style={{
                        height: "90vh"
                    }}>
                        <div style={{

                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                        }}>
                            <Alert color='primary'>
                                {this.state.successMassage}
                            </Alert>
                        </div>
                    </div>
                </Fragment>
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
                        Reset Your Password
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
                                <Label for="password"> Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    minlength="8"
                                    onChange={this.onChange}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Confirm Password</Label>
                                <Input
                                    type="password"
                                    name="cpassword"
                                    id="cpassword"
                                    placeholder="Confirm Password"
                                    onChange={this.onChange}
                                    required
                                />
                            </FormGroup>
                            <br />
                            <Button color='dark' style={{
                                width: "100%"
                            }}>Reset password</Button>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => ({
    error: state.error,
    isForgotSuccess: state.auth.isForgotSuccess,
    message: state.auth.msg
})

export default connect(
    mapStateToProps,
    { clearErrors, forgotReset }
)(ForgotPasswordPage);
