import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import AppBranchPage from './AppBranchPage';

class AppHomepage extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired
    }
    render() {
        const { user, isAuthenticated } = this.props.auth;
        const authUser = (
            <Fragment>
                <h1>
                    <strong className="navbar-text ml-mr-3">
                        {user ? `Hi! ${user.username}` : ''}
                    </strong>
                </h1>
                <div className="container">
                    <AppBranchPage />
                    {/* <div className="row">
                        <div className="col-md-4 mb-3">
                            <TopicComponent topic={topic} />
                        </div>
                        <div className="col-md-4 mb-3">
                            <TopicComponent topic={topic} />
                        </div>
                        <div className="col-md-4 mb-3">
                            <TopicComponent topic={topic} />
                        </div>
                        <div className="col-md-4 mb-3">
                            <TopicComponent topic={topic} />
                        </div>
                    </div> */}
                </div>
            </Fragment>
        )
        const guestUser = (
            <Fragment>
                <section className="cover">
                    <div className="tagline">
                        <h6>Sometimes it's hard to visualise in mind.</h6>
                        <h1>We are here<br />to help...</h1>
                    </div>
                </section>
                <section className="goals">
                    <div className="objective">
                        <h1>Our Goals</h1>

                    </div>
                </section>
            </Fragment>
        )
        return (
            <Fragment>
                {isAuthenticated ? authUser : guestUser}
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(
    mapStateToProps,
    null
)(AppHomepage);
