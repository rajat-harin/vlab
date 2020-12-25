import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

function ListCardComponent(props) {
    console.log(props);
    return (
        <Fragment>
            <div className="card mb-3 text-left">
                <div className="row no-gutters">
                    <div className="col">
                        <div className="card-body">
                            <h5 className="card-title">{props.topic.name.toUpperCase()}</h5>
                            <p className="card-text">{props.topic.subject}</p>
                            <p className="card-text"><small class="text-muted">{props.topic.introduction.substring(0,300)}...</small></p>
                        </div>
                        <div className="" style = {{padding:20}}>
                        <Link to={`/branch/${props.topic.branch}/${props.topic.subject}/${props.topic.simulation}/introduction`} className="btn btn-primary">Start</Link>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ListCardComponent
