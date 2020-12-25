import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom';
import {
    Card, CardText, CardBody,
    CardTitle
} from 'reactstrap';


const TopicComponent = ({topic}) => {
    let { option } = useParams();
    const newIntro = String(topic.introduction)
    const iTag = newIntro.split('\n').map((item, key) => {
        return <Fragment key={key}>{item}<br/></Fragment>
    })

    const newTheory = String(topic.theory)
    const tTag = newTheory.split('\n').map((item, key) => {
          return <Fragment key={key}>{item}<br/></Fragment>
    })
     
    const obj = String(topic.objective);
    const oTag = obj.split(',').map((item, key) => <li key={key}>{item}<br/></li> )

    const proc = String(topic.procedure);
    const pTag = proc.split(',').map((item, key) => <li key={key}>{item}<br/></li> )
    
    return (
        <div>
            <Card>
                <CardBody>
                    <CardTitle>{option.toUpperCase()}</CardTitle>
                    {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
                    <CardText className="text-left">
                    {
                        (option === "introduction") //change here
                        ?
                        (<Fragment>{iTag}</Fragment>)
                        :
                        (
                            (option === "objective")
                            ?
                            (<Fragment>{oTag}</Fragment>)
                            :
                            (
                                (option === "procedure")
                                ?
                                (<Fragment>{pTag}</Fragment>)
                                :
                                (
                                    (option === "theory")
                                    ?
                                    (<Fragment>{tTag}</Fragment>)
                                    :
                                    (<Fragment></Fragment>)
                                    )
                            )
                        )

                    }
                    </CardText>
                    {
                        (option === "simulation")
                        ? 
                        (<Fragment>
                            <iframe src={`/sims/${topic.simulation}/index.html`} title="simulation" style={{width: "100%", height:"700px"}}></iframe>
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
