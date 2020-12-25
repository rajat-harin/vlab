import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { NavLink as RRNavLink, Route, Switch } from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'reactstrap';

import TopicComponent from './TopicComponent';

function TopicPage({match}) {
    useEffect(() => {
        fetchTopic();
    }, []);

    const [topicDetails, setTopicDetails] = useState({});
    const [items, setItems] = useState([]);

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
        Axios.get(`/topic/${match.params.topic}`, config)
            .then(res => {
                setTopicDetails(res.data[0]);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div>
            <br/>
            <Nav tabs>
                {
                    console.log(match)
                }
                {
                    items.map(item => (
                        <NavItem>
                            <NavLink
                            
                            to={`/branch/${match.params.branch}/${match.params.subject}/${match.params.simulation}${item.path}`} 
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
