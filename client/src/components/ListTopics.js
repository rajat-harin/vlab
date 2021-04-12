import Axios from 'axios';
import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import ListCardComponent from './ListCardComponent';
import { ChevronRight } from 'bootstrap-icons-react';

function ListTopics({ match }) {
    useEffect(() => {
        fetchTopics();
    }, [ ]);

    const [topics, setTopics] = useState([]);

    const fetchTopics = () => {
        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        console.log(match);
        Axios.get(`/topic/branchData/${match.params.branch}/${match.params.subject}`, config)
            .then(res => {
                setTopics(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <Fragment>
            <div className="container">
                <br></br>
            <div className="courseNavigation text-left">
                            <Link to={`/branch/${match.params.branch}`} className="btn btn-light btn-lg">
                                Subjects({match.params.branch})
                            </Link>
                            <ChevronRight/>
                            <Link to={`/branch/${match.params.branch}/${match.params.subject}`} className="btn btn-light btn-lg">
                                {match.params.subject}
                            </Link>
                            </div>
                            <hr/>
            </div>
            <h1>List of available labs</h1>
            {(topics.length === 0) ? (<div><br/><br/><br/><h5>NO LABS ADDED YET!</h5><br/><h6><small>Sorry! but we are working on this!</small></h6></div>) :
                (<div className="container" style={{ marginTop: 20 }}>
                    {topics.map((element) => (
                        <ListCardComponent topic={element} />
                    ))}

                </div>)
            }
        </Fragment>
    )
}

export default ListTopics
