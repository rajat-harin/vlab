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

import LoginModal from './Auth/LoginModal';
import Logout from './Auth/Logout';
import RegisterModal from './Auth/RegisterModal';
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
                    <RegisterModal />
                </NavItem>
                <NavItem>
                    <LoginModal />
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

