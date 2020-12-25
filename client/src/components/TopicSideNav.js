import React, { useState, useEffect } from 'react';
import { Redirect, useRouteMatch } from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'reactstrap';


function TopicSideNav({match}) {
    let { url } = useRouteMatch();
    let tabName = '';

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
        console.log(match);
        //tabName = String(match.params.topic)
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
                            active = {
                                tabName === item.title.toLowerCase() 
                                ?
                                'true'
                                :
                                'false'
                            }
                            href={`${url}${item.path}`} 
                            >
                                {item.title.toUpperCase()}
                            </NavLink>
                        </NavItem>
                    ))
                }
            </Nav>
        </div>
    )
}

export default TopicSideNav
