import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';
import TopicComponent from './TopicComponent';

import TopicSideNav from './TopicSideNav';

function TopicPage({match}) {
    let { topic } = useParams();
    useEffect(() => {
        fetchTopic();
    }, []);

    const [topicDetails, setTopicDetails] = useState({});

    const fetchTopic = () => {
        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        console.log(match);
        Axios.get(`/topic/${match.params.topic}`, config)
            .then(res => {
                setTopicDetails(res.data[0]);
                console.log(res.data[0]);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div>
            <TopicSideNav />
            <Switch>
                <Route path="/branch/:branch/:topic/:option">
                    <TopicComponent topic={topicDetails} />
                </Route>
            </Switch>

        </div>
    )
}

export default TopicPage
