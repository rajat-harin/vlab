import React, { Component } from 'react';
import {
    Table,
    Input,
    Label,
    Form,
    FormGroup,
    Alert
} from 'reactstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearErrors } from '../actions/errorActions';
import { Link } from 'react-router-dom';

class SearchSimPage extends Component {
    state = {
        searchText: ''
    }

    static propTypes = {
        clearErrors: PropTypes.func.isRequired,
        exps: PropTypes.array.isRequired
    }
    componentDidMount() {

    }

    componentDidUpdate(prevProps) {

    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSearch = e => {
        e.preventDefault();

    }

    onSubmit = e => {
        e.preventDefault();

    }
    render() {
        let fcount = 0;
        return (
            <div className="text-left">
                <Form>
                    <h2>Search:</h2>
                    <br/>
                    <FormGroup className="row">
                        <Label for="simulation" className="col-sm-2 col-form-label font-weight-bold">Name of experiment: </Label>
                        <Input
                            type="text"
                            name="searchText"
                            id="searchText"
                            placeholder="Search..."
                            className="col-sm-10"
                            style={{
                                border: 'none',
                                borderRadius: '0px',
                                borderBottom: '1px solid',
                            }}
                            onInput={(e) => {
                                this.onChange(e)
                            }}
                        />
                    </FormGroup>
                </Form>
                <hr />
                <Table hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Simulation Tag</th>
                            <th>Name</th>
                            <th>Branch</th>
                            <th>Subject</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.exps.filter(
                                ({ name }) => {
                                    let id = String(name)
                                    return id.toLowerCase().includes(this.state.searchText.toLowerCase())
                                }
                            )
                            .map(item => (
                                <tr>
                                    <th scope="row">{++fcount}</th>
                                    <td>{item.simulation}</td>
                                    <td>{item.name}</td>
                                    <td>{item.branch}</td>
                                    <td>{item.subject}</td>
                                    <td><Link to={`/cpanel/updateSim/${item._id}`} className="btn btn-primary btn-sm">Update</Link></td>
                                    <td><Link to={`/cpanel/dropSim/${item._id}`} className="btn btn-danger btn-sm">Drop</Link></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>

            </div>
        )
    }

}

const mapStateToProps = state => ({
    exps: state.branch.exps,
    isSuccess: state.branch.isSuccess,
    error: state.error
})

export default connect(
    mapStateToProps,
    { clearErrors }
)(SearchSimPage);
