import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

function BranchCardComponent(props) {
    return (
        <Fragment>
            <div className="card mb-3 text-left">
                <div className="row no-gutters">
                    <div className="col-md-4">
                    <img src={props.branch.img} className="img-fluid" alt={props.branch.title}/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{props.branch.title}</h5>
                            <p className="card-text">{props.branch.description}</p>
                        </div>
                        <div className="" style = {{padding:20}}>
                        <Link to={`/branch/${props.branch.url}`} className="btn btn-primary">Take A Look</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card mb-3">
                <div className="row no-gutters">
                    <div className="col-auto">
                        
                    </div>
                    <div className="col">
                        <div className="card-block px-2">
                            
                        </div>
                        <div className="col">
                            
                        </div>
                    </div>
                </div>
                {/* <div className="card-footer text-right">
                    
                </div> */}
            </div>
        </Fragment>
    )
}

export default BranchCardComponent
