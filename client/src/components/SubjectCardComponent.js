import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

function SubjectCardComponent(props) {
    console.log(props);
    return (
        <Fragment>
            <div className="card mb-3 text-left">
                <div className="row no-gutters">
                    <div className="col">
                        <div className="card-body">
                            <h5 className="card-title">{props.subject._id.toUpperCase()}</h5>
                            <p className="card-text"><strong>Number of Labs Available: {props.subject.count}</strong></p>
                        </div>
                        <div className="" style = {{padding:20}}>
                        <Link to={`/branch/${props.branch}/${props.subject._id}`} className="btn btn-primary">Start</Link>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default SubjectCardComponent
