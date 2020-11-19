import React, { Component, Fragment } from 'react';
import { logout } from '../../actions/authActions';
import { connect } from 'react-redux';
import { NavLink } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

class Logout extends Component {
    static propTypes = {
        logout: PropTypes.func.isRequired
    }
    render() {
        return (
            <Fragment>
                <NavLink onClick={this.props.logout} to="/" tag={RRNavLink}>
                    Logout
                </NavLink>
            </Fragment>
        )
    }
}

export default connect(
    null,
    { logout }
)(Logout);