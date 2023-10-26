import { PopoverPosition } from '@blueprintjs/core';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';

export default function PaymentGrid(props) {

    // console.log("in PaymentGrid()")
    // console.log(props.paymentsMap)
    // console.log(props.people)

    // console.log("Card.Text:")
    // for (let i = 0; i < props.people.length; i += 1) {
    //     props.paymentsMap.get(props.people[i]).forEach((value, key) => {
    //         console.log(key)
    //         console.log(value)
    //     })
    // }

    return (
        <Row xs={1} md={2} className="g-4">
        {Array.from({ length: props.people.length }).map((_, idx) => (
            <Col key={idx}>
            <Card>
                <Card.Body>
                    <Card.Title> {props.people[idx]} </Card.Title>
                </Card.Body>
                <ListGroup>
                    {props.paymentsMap.get(props.people[idx]).forEach((value, key) => {
                        <ListGroup.Item> {key} : you owe $ {value} </ListGroup.Item>
                    })}
                </ListGroup>
            </Card>
            </Col>
        ))}
        </Row>
    );
}
//                 <Card.Text>{props.paymentsMap.get(props.people[idx]).size}</Card.Text>

                // <Card.Text>
                //     {props.paymentsMap.get(props.people[idx]).forEach((value, key) => {
                //         <li> {key} : you owe $ {value} </li>
                //     })}
                // </Card.Text>