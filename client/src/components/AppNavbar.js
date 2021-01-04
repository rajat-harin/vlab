import React, { Component, Fragment } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavLink,
    NavItem,
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Logout from './Auth/Logout';
import { NavLink as RRNavLink } from 'react-router-dom';

class AppNavbar extends Component {
    state = {
        isOpen: false
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const { user, isAuthenticated } = this.props.auth;
        let isAdmin = (this.props.auth.user) ? this.props.auth.user.isAdmin : false;
        const authLinks = (
            <Fragment>
                <NavItem>
                    <strong className="navbar-text ml-mr-3">
                        {user ? `Hi! ${user.username}` : ''}
                    </strong>
                </NavItem>
                <NavItem>
                    <Logout />
                </NavItem>
            </Fragment>
        );
        const guestLinks = (
            <Fragment>
                <NavItem>
                    <NavLink to="/register" className="anchors" tag={RRNavLink}>Register</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/login" className="anchors" tag={RRNavLink}> Login </NavLink>
                </NavItem>
                {/* <NavItem>
                    <RegisterModal />
                </NavItem> */}
            </Fragment>
        )
        const adminLinks = (
            <Fragment>
                <NavItem>
                    <NavLink to="/addSim" className="anchors" tag={RRNavLink}>Add Simulation</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/cpanel/general" className="anchors" tag={RRNavLink}>Admin Panel</NavLink>
                </NavItem>
            </Fragment>
        )
        return (
            <div>
                <Navbar color="dark" dark expand="lg" fixed="top" className="trans">
                    <NavbarBrand to="/" tag={RRNavLink}>
                        <img src="/logo.png" width="30" height="30" className="d-inline-block align-top" alt="" loading="lazy" />
                            GHRCE vLab
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} className="mr-2" />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav navbar className="ml-md-auto navilinks">
                            <NavItem>
                                <NavLink to="/" className="anchors" tag={RRNavLink}>Home <span className="sr-only">(current)</span></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/about" className="anchors" tag={RRNavLink}>About</NavLink>
                            </NavItem>
                            {isAdmin ? adminLinks : (<Fragment></Fragment>)}
                            {isAuthenticated ? authLinks : guestLinks}

                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }

}
const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(
    mapStateToProps,
    null
)(AppNavbar);

