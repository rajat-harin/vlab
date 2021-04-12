import Axios from 'axios';
import React, { Component, Fragment } from 'react';
import { } from 'react';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input } from 'reactstrap';
import SubjectCardComponent from './SubjectCardComponent';

class ListSubjects extends Component {
    state = {
        subjects: [],
        selectSub: ''
    }
    componentDidMount() {
        this.fetchSubjects();
    }

    fetchSubjects = () => {
        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        Axios.get(`/topic/subject/${this.props.match.params.branch}`, config)
            .then(res => {
                console.log("sending subject request...");
                this.setState({
                    subjects: res.data
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    // onNavButtonClick = e => {
    //     let link  = "/branch/"+this.props.match.params.branch;
    //     console.log(link);
    //     <Redirect to = {{pathname: link}}/>
    // }
    render() {
        let fCount = 0;
        return (
            <Fragment>
                <br />

                <Form>
                    <FormGroup>
                        <div className="container">
                            <div className="courseNavigation text-left">
                            <Link to={`/branch/${this.props.match.params.branch}`} className="btn btn-light btn-lg">
                                Subjects({this.props.match.params.branch})
                            </Link>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-sm">
                                    <div className="container text-left">
                                        <h1>Subjects Offered</h1>
                                    </div>
                                </div>
                                <div className="col-sm"></div>
                                <div className="col-sm">
                                    <Input
                                        type="text"
                                        name="selectSub"
                                        id="selectSub"
                                        placeholder="Search"
                                        style={{
                                            border: 'none',
                                            borderRadius: '0px',
                                            borderBottom: '1px solid',
                                        }}
                                        onInput={(e) => {
                                            this.onChange(e)
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </FormGroup>
                </Form>
                <br />
                {

                    (this.state.subjects.length === 0)
                        ?
                        (<div><br /><br /><br /><h5>NO LABS ADDED YET!</h5><br /><h6><small>Sorry! but we are working on this!</small></h6></div>)
                        :
                        (
                            <div className="container" style={{ marginTop: 20 }}>
                                {
                                    this.state.subjects.filter(
                                        ({ _id }) => {
                                            let id = String(_id)
                                            console.log("in filter")
                                            console.log(this.state.selectSub);
                                            console.log(id.toLowerCase().includes(this.state.selectSub));

                                            return id.toLowerCase().includes(this.state.selectSub.toLowerCase())
                                        }
                                    ).map((element) => {
                                        ++fCount
                                        return(<SubjectCardComponent subject={element} branch={this.props.match.params.branch} />)
                                    }
                                    )
                                }
                            </div>)
                }
                {
                    (fCount===0)
                    ?
                    (<div><br /><br /><br /><h5>NO LABS FOUND!</h5><br /><h6><small>Make sure You spelled all things correctly !</small></h6></div>)
                    :
                    null
                }
            </Fragment>
        )
    }
}

export default ListSubjects
