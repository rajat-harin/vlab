import Axios from 'axios';
import React, { useState, useEffect } from 'react';

function ListSubject({ match }) {
    useEffect(() => {
        fetchBranch();
    }, []);

    const [branch, setBranch] = useState({});

    const fetchBranch = () => {
        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        Axios.get(`/topic/branchData/${match.params.name}`, config)
            .then(res => {
                setBranch(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div>
            {console.log(branch)}
        </div>
    )
}

export default ListSubject
