import Axios from 'axios';
import React, { useState, useEffect, Fragment } from 'react';
import SubjectCardComponent from './SubjectCardComponent';

function ListSubjects({ match }) {
    useEffect(() => {
        fetchSubjects();
    }, [ ]);

    const [subjects, setSubjects] = useState([]);

    const fetchSubjects = () => {
        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        console.log(match);
        Axios.get(`/topic/subject/${match.params.branch}`, config)
            .then(res => {
                console.log("sending subject request...");
                setSubjects(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <Fragment>
            <h1>List of Subjects</h1>
            {
                (subjects.length === 0)
                ?
                (<div><br/><br/><br/><h5>NO LABS ADDED YET!</h5><br/><h6><small>Sorry! but we are working on this!</small></h6></div>)
                :
                (
                    <div className="container" style={{ marginTop: 20 }}>
                        {
                            subjects.map((element) => (
                                <SubjectCardComponent subject={element} branch={match.params.branch} />
                            ))
                        }
                </div>)
            }
        </Fragment>
    )
}

export default ListSubjects
