import Axios from 'axios';
import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import {
    Label,
    CustomInput,
    Button,
    Form,
    FormGroup, Alert,
    FormText,
    Progress
} from 'reactstrap';


class FileUploadPage extends Component {
    state = {
        selectedFile: null,
        loaded: 0,
        msg: null,
        isSuccess: false,
        simulation: null
    }

    componentDidMount() {
        if (!this.state.simulation) {
            this.setState({
                simulation: this.props.match.params.simulation
            })
        }
    }

    onChange = e => {
        var files = e.target.files[0]

        if (this.checkMimeType(e)) {
            // if return true allow to setState
            this.setState({
                selectedFile: files
            })

        }
    }
    checkMimeType = (event) => {
        //getting file object
        let files = event.target.files
        //define message container
        let err = ''
        // list allow mime type
        const types = ['application/zip', 'application/x-7z-compressed', 'application/x-zip-compressed']
        // loop access array
        for (var x = 0; x < files.length; x++) {
            // compare file type find doesn't matach
            if (types.every(type => files[x].type !== type)) {
                // create error message and assign to container   
                err += files[x].type + ' is not a supported format\n';
            }
        };

        if (err !== '') { // if message not same old that mean has error 
            event.target.value = null // discard selected file
            this.setState({
                msg: err
            })
            return false;
        }
        return true;

    }

    onSubmit = e => {
        e.preventDefault();
        const data = new FormData()
        data.append('file', this.state.selectedFile)
        console.log(this.state.selectedFile);
        Axios.post(`http://localhost:5000/upload/${this.state.simulation}`, data, {
            onUploadProgress: ProgressEvent => {
                this.setState({
                    loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
                })
            },
        }).then(res => { // then print response status
            if (this.state.loaded == 100) {
                this.setState({
                    isSuccess: true,
                    msg: 'File Uploaded Successfully!'
                })
            }
            console.log(res.statusText)
        }).catch(err => {
            console.log(err);
            this.setState({
                isSuccess: false,
                msg: err
            })

        })
    }
    render() {
        if (this.state.isSuccess) {
            return (
                <Fragment>
                    <div className="container" style={{
                        height: "90vh"
                    }}>
                        <div style={{

                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                        }}>
                            <Alert color='primary'>
                                {this.state.msg}
                            </Alert>
                        </div>
                    </div>
                    <Redirect to= "/"/>
                </Fragment>
            );
        }
        return (
            <div className="container text-left">
                <br />
                <h1>Upload Simulation File for {this.state.simulation}</h1>
                <br /><br />
                <div>

                    <div className="card" style={{ padding: "50px" }}>
                        {(this.state.msg) ?
                            (
                                <Alert color='danger'>
                                    {this.state.msg}
                                </Alert>
                            ) : null
                        }
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup className="row">
                                <Label for="simFile" className="col-sm-2 col-form-label font-weight-bold">File</Label>
                                <CustomInput
                                    type="file"
                                    name="simFile"
                                    id="simFile"
                                    onChange={this.onChange}
                                    className="col-sm-10"
                                    required
                                />
                                <FormText className="col-sm-2 col-form-label font-weight-bold"></FormText>
                                <FormText color="muted" className="col-sm-10">
                                    Add Simulation folder in Zipped File and use name used in simulation field. e.g. simulation.zip.<br />
                                also root html file should be named index.html
                            </FormText>
                            </FormGroup>
                            <br />
                            <Progress max="100" color="success" value={this.state.loaded} >{Math.round(this.state.loaded, 2)}%</Progress>
                            <br />
                            <Button color='dark' style={{ float: "right" }}>Upload</Button>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }

}

export default FileUploadPage;
