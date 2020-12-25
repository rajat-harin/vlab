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
import { forgot } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import { Fragment } from 'react';

class ForgotPasswordPage extends Component {
    state = {
        redirect: false,
        email: '',
        msg: null,
        isForgotSuccess: false,
        successMassage: null,
        isLoading: false
    }

    static propTypes = {
        error: PropTypes.object.isRequired,
        clearErrors: PropTypes.func.isRequired,
        forgot: PropTypes.func.isRequired,
        isForgotSuccess: PropTypes.bool.isRequired,
        message: PropTypes.string
    }
    componentDidMount() {
        //const { error } = this.props;
        // if (isAuthenticated) {
        //     this.setState({
        //         redirect: true
        //     });
        // }

    }

    componentDidUpdate(prevProps) {
        const { error, isForgotSuccess, message } = this.props;
        if (error !== prevProps.error) {
            //CHECK for register error
            if (error.id === 'FORGOT_FAIL') {
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
                    isLoading: false,
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

        const { email } = this.state;
        const user = {
            email
        }
        this.setState({
            isLoading: true
        })
        this.props.forgot(user);
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
                            <br />
                            <Button color='dark' 
                                style={{
                                    width: "100%"
                            }}>
                                {this.state.isLoading
                                    ? 
                                    (
                                        <Fragment>
                                            <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                            &nbsp;Loading... 
                                        </Fragment>
                                    )
                                    :
                                    <Fragment>
                                        Send password reset email
                                    </Fragment>
                                }
                            </Button>
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
    { clearErrors, forgot }
)(ForgotPasswordPage);
