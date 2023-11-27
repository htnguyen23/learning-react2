import { PopoverPosition } from '@blueprintjs/core';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';

export default function PaymentGrid( {people, paymentsMap} ) {

     //console.log("in PaymentGrid()")
     //console.log("people")
     //console.log(people)
     //console.log(props.paymentsMap)

    const sumArray = (arr) => {
        return arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    }
    
    return (
        <div>
            <Row xs={1} md={2} className="g-4">
            {Array.from({ length: people.length }).map((_, idx) => (
                <Col key={idx}>
                <Card>
                    <Card.Body>
                        <Card.Title> {people[idx]} </Card.Title>
                        <Card.Text>
                            {Array.from(paymentsMap.get(people[idx])).map(([key, value]) => (
                                <li style={{textAlign: 'left', paddingLeft: '38%'}} 
                                    key={key} >
                                you owe {key} ${sumArray(value)}
                                </li>
                            ))}
                        </Card.Text>
                    </Card.Body>
                </Card>
                </Col>
            ))}
            </Row>
        </div>
    );
}
