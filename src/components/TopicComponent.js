import React from 'react'
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
                    <CardTitle>{option}</CardTitle>
                    {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
                    <CardText>{props.topic[option]}</CardText>
                </CardBody>
            </Card>
        </div>
    );

}

export default TopicComponent;
