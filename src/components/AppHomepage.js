import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import AppBranchPage from './AppBranchPage';
import { Link } from 'react-router-dom';
class AppHomepage extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired
    }
    render() {
        const { isAuthenticated } = this.props.auth;
        const authUser = (
            <Fragment>
                <h1 style={{margin : "30px 0px"}}>
                    Take a Look at your branch
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
                    <div className="row" style={{marginTop: 20, height: "100vh"}}>
                    <div className="col-md-6 tagline" style={{top:"30%"}}>
                        <h6>don't know what is going on in practicals..</h6>
                        <h1>We are here<br />to help...</h1>
                    </div>
                    <div className="col-md-6 " style={{top:"10%"}}>
                    <img src="/images/cover.png" alt="cover" style={{width:"70%"}}></img>
                    </div>
                    </div>
                </section>
                <section className="goals" style={{ padding: 20, marginTop: 20 }}>
                    <div className="objective">
                        <h1>Our Goals</h1>
                        <br />

                        <div className="row obj-text">
                            <div className="col md-3">
                                <div className="card mb-3" style={{ maxWidth: 540 }}>
                                    <div className="row no-gutters">
                                        <div className="col-md-4">
                                            <img src="/images/remote.jpg" className="card-img" style={{ height: 100, width: 100 }} alt="..." />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">Ease of Access</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col md-3">
                                <div className="card mb-3" style={{ maxWidth: 540 }}>
                                    <div className="row no-gutters">
                                        <div className="col-md-4">
                                            <img src="/images/fun.jpg" className="card-img" style={{ height: 100, width: 100 }} alt="..." />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">Fun learning</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col md-3">
                                <div className="card mb-3" style={{ maxWidth: 540 }}>
                                    <div className="row no-gutters">
                                        <div className="col-md-4">
                                            <img src="/images/experiment.jpg" className="card-img" style={{ height: 100, width: 100 }} alt="..." />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">Remote Experimentation</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col md-3">
                                <div className="card mb-3" style={{ maxWidth: 540 }}>
                                    <div className="row no-gutters">
                                        <div className="col-md-4">
                                            <img src="/images/cost.jpg" className="card-img" style={{ height: 100, width: 100 }} alt="..." />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">Cost Effective</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="footer" style={{height: 300}}>
                    <footer>
                        <div className="ftr">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-3 col-lg-3 col-xs-12 col-sm-12">
                                        <p className="ftr_head">Quick Links</p>
                                        <ul className="ftr_details">
                                            <li>
                                                <Link to="/" target="_blank">
                                                    Lab Feedback Form
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-md-3 col-lg-3 col-xs-12 col-sm-12">
                                        <p className="ftr_head">About VLAB</p>
                                        <ul className="ftr_details">
                                            <li><Link to="/">Home</Link></li>
                                            <li><Link to="/about">About us</Link></li>
                                        </ul>
                                    </div>
                                    <div className="col-md-4 col-lg-4 col-xs-12 col-sm-12">
                                        <p className="ftr_head"><u>Get In Touch With Us</u></p>
                                        <ul className="ftr_lst">
                                            <li></li>
                                            <li><i className="fa fa-envelope ftr_fa_icn"></i>&nbsp;&nbsp;support@xyz.net</li>
                                            <li><i className="fa fa-phone ftr_fa_icn"></i>&nbsp;&nbsp; Phone(L) - XXX-XXXXXXX</li>
                                            <li>
                                                <i className="fa fa-map-marker ftr_fa_icn"></i>
                                                &nbsp;&nbsp;CRPF GATE NO. 3 <br />
                                                Hingna Road <br />
                                                Digdoh Hills<br />
                                                Nagpur- 440016<br />
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>
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
