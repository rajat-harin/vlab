import Axios from 'axios';
import { ChevronRight } from 'bootstrap-icons-react';
import React, { useState, useEffect } from 'react';
import { Link, NavLink as RRNavLink, Route, Switch } from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'reactstrap';

import TopicComponent from './TopicComponent';

function TopicPage({match}) {
    useEffect(() => {
        fetchTopic();
    }, []);
    const [topicDetails, setTopicDetails] = useState({});
    const [items, setItems] = useState([]);
    const [simName, setSimName] = useState("undefined");
    const fetchTopic = () => {
        let menu = [
            {
                title: 'Introduction',
                path: '/introduction'
            },
            {
                title: 'Theory',
                path: '/theory'
            },
            {
                title: 'Objective',
                path: '/objective'
            },
            {
                title: 'Procedure',
                path: '/procedure'
            },
            {
                title: 'Simulation',
                path: '/simulation'
            },
            {
                title: 'Quiz',
                path: '/quiz'
            }
        ]
        setItems(menu);
        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        console.log(match);
        Axios.get(`/topic/all/${match.params.topic}`, config)
            .then(res => {
                setTopicDetails(res.data[0]);
            })
            .catch(err => {
                console.log(err);
            })
        setSimName(match.params.topic ? match.params.topic : match.params.simulation);
    }

    return (
        <div>
            <div>
                <br></br>
            <div className="courseNavigation text-left">
                            <Link to={`/branch/${match.params.branch}`} className="btn btn-light btn-lg">
                                Subjects({match.params.branch})
                            </Link>
                            <ChevronRight/>
                            <Link to={`/branch/${match.params.branch}/${match.params.subject}`} className="btn btn-light btn-lg">
                                {match.params.subject}
                            </Link>
                            <ChevronRight/>
                            <Link to={`/branch/${match.params.branch}/${match.params.subject}/${simName}/introduction`} className="btn btn-light btn-lg">
                                {simName}
                            </Link>
                            </div>
                            <hr/>
            </div>
            <br/>
            <Nav tabs>
                {
                    items.map(item => (
                        <NavItem>
                            <NavLink
                            
                            to={`/branch/${match.params.branch}/${match.params.subject}/${simName}${item.path}`} 
                            tag={RRNavLink}
                            >
                                {item.title.toUpperCase()}
                            </NavLink>
                        </NavItem>
                    ))
                }
            </Nav>
        
            <Switch>
                <Route path="/branch/:branch/:subject/:topic/:option">
                    <TopicComponent topic={topicDetails} />
                </Route>
            </Switch>

        </div>
    )
}

export default TopicPage
