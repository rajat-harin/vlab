import React, { Component } from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import AddSimPage from './AddSimPage';
import './ControlPanelPage.css';
import store from '../store';
import { loadSim } from '../actions/branchActions';
import SearchSimPage from './SearchSimPage';
import UpdateSimPage from './UpdateSimPage';
import DropSimPage from './DropSimPage';

export default class ControlPanelPage extends Component {
    state = {}
    componentDidMount() {
        store.dispatch(loadSim())
    }
    render() {
        return (
            <div className="page-content container-lg p-responsive clearfix">
                <div className="d-flex flex-md-row flex-column px-md-0 px-3">
                    <div className="col-md-3 col-12 pr-md-4 pr-0">
                        <nav className="menu position-relative" aria-label="Personal settings">
                            <div className="menu-heading details-overlay details-reset">
                                Simulation
                            </div>
                            <MenuLink
                                to={'/cpanel/addSim'}
                                label="Add Simulation"
                                checker = {'/cpanel/addSim'}
                            />
                            <MenuLink
                                to={'/cpanel/searchSim'}
                                label="Search Simulation"
                                checker = {'/cpanel/searchSim'}
                            />
                            <MenuLink
                                to={'/cpanel/searchSim'}
                                label="Update Simulation"
                                disabled = {true}
                                checker = {'/cpanel/updateSim'}
                            />
                            <MenuLink
                                to={'/cpanel/searchSim'}
                                label="Drop Simulation"
                                disabled = {true}
                                checker = {'/cpanel/dropSim'}
                            />
                        </nav>
                    </div>
                    <div className="col-md-9 col-12">
                        {/* <Switch> */}
                            {/* <Route exact path="/cpanel/upload/:id" >
                                < FileUploadPage />
                            </Route> */}
                            <Route exact path="/cpanel/addSim">
                                < AddSimPage />
                            </Route>
                            <Route exact path="/cpanel/searchSim">
                                < SearchSimPage />
                            </Route>
                            <Route exact path="/cpanel/updateSim/:id">
                                < UpdateSimPage />
                            </Route>
                            <Route exact path="/cpanel/dropSim/:id">
                                < DropSimPage />
                            </Route>

                        {/* </Switch> */}
                    </div>
                </div>
            </div>
        );
    }
}

function MenuLink({ label, to, activeOnlyWhenExact, disabled, checker }) {
    let match = useRouteMatch({
        path: checker,
        exact: activeOnlyWhenExact
    });
    if (disabled) {
        return (
            <Link className={match ? "js-selected-navigation-item selected menu-item" : "js-selected-navigation-item menu-item disabled"} to={to} aria-disabled={true}>{label}</Link>
        );
    }
    else{
    return (
        <Link className={match ? "js-selected-navigation-item selected menu-item" : "js-selected-navigation-item menu-item"} to={to} >{label}</Link>
    );
}
}