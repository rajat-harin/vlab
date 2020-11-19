import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'reactstrap';


function TopicSideNav() {
    let { url } = useRouteMatch();

    useEffect(() => {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);

    const fetchItems = () => {
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
    }

    return (
        <div>
            <Nav tabs>
                {
                    items.map(item => (
                        <NavItem>
                            <NavLink href={`${url}${item.path}`} >{item.title.toUpperCase()}</NavLink>
                        </NavItem>
                    ))
                }
            </Nav>
        </div>
    )
}

export default TopicSideNav
