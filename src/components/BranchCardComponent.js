import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

function BranchCardComponent(props) {
    return (
        <Fragment>
            <div className="card mb-3">
                <div className="row no-gutters">
                    <div className="col-auto">
                        <img src={props.branch.img} className="img-fluid" alt={props.branch.title} />
                    </div>
                    <div className="col">
                        <div className="card-block px-2">
                            <h4 className="card-title">{props.branch.title}</h4>
                            <p className="card-text">{props.branch.description}</p>

                        </div>
                    </div>
                </div>
                <div className="card-footer text-right">
                    <Link to={`/branch/${props.branch.url}`} className="btn btn-primary">Take A Look</Link>
                </div>
            </div>
        </Fragment>
    )
}

export default BranchCardComponent
