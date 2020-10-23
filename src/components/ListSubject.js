import Axios from 'axios';
import React, { useState, useEffect, Fragment, useLayoutEffect } from 'react';
import ListCardComponent from './ListCardComponent';

function ListSubject({ match }) {
    useEffect(() => {
        fetchTopics();
    }, []);

    const [topics, setTopics] = useState([]);

    const fetchTopics = () => {
        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        console.log(match);
        Axios.get(`/topic/branchData/${match.params.branch}`, config)
            .then(res => {
                setTopics(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <Fragment>
            <h1>List of available labs</h1>
            {(topics.length == 0) ? (<div><br/><br/><br/><h5>NO LABS ADDED YET!</h5><br/><h6><small>Sorry! but we are working on this!</small></h6></div>) :
                (<div className="container" style={{ marginTop: 20 }}>
                    {topics.map((element) => (
                        <ListCardComponent topic={element} />
                    ))}

                </div>)
            }
        </Fragment>
    )
}

export default ListSubject
