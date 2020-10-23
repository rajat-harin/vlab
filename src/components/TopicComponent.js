import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom';
import {
    Card, CardText, CardBody,
    CardTitle
} from 'reactstrap';


const TopicComponent = (props) => {
    let { option } = useParams();

    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle>{option.toUpperCase()}</CardTitle>
                    {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
                    <CardText>{props.topic[option]}</CardText>
                    {
                        (option == "simulation")
                        ? 
                        (<Fragment>
                            <iframe src={`/sims/${props.topic.simulation}.html`} title="simulation" style={{width: "100%", height:"700px"}}></iframe>
                        </Fragment>)
                        :
                        (<Fragment></Fragment>)
                    }
                </CardBody>
            </Card>
        </div>
    );

}

export default TopicComponent;
