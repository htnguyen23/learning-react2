import '../App.css';
import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { H3, Dialog, Classes, Overlay, FormGroup, InputGroup, 
        RadioGroup, Radio, Collapse, Button, Pre, Drawer} from '@blueprintjs/core';

export default function SplitOptions(props) {

    const [equalSplit, setEqualSplit] = useState(0)   // boolean for the expense being split equally (0) or not (1)
    
    const handleSplit = (selectedValue) => {
        console.log("equalSplit before: ", equalSplit)
        setEqualSplit(selectedValue.target.value)
        console.log("equalSplit after: ", equalSplit)

        // Handle math for equal payment
        let cost = props.expense.amount / props.people.length
        props.people.forEach((elem, index) => {
            props.payerChange.push({name: props.people.name, cost: [cost]})
        })

        // Handle math for unequal payment
    }; 

    const [showPayers, setShowPayers] = useState(false)
    const [personPaid, setPersonPaid] = useState(props.people[0].name)
    const [showSplit, setShowSplit] = useState(false)
    const [unequal, setUnequal] = useState("equally")
    const equality = {"equal": 1, "not equal": 0}

    const showPayersButton = () => {
        setShowPayers(!showPayers)
    }

    const payerClicked = (eName) => {
        setPersonPaid(eName)
    }

    const showSplitButton = () => {
        setShowSplit(!showSplit)
    }

    const showUnequalSplit = (eUnequal) => {
        setUnequal(eUnequal)
    }


    return ( 
        <div > 
            <div>
                <strong>  Paid by  </strong>
                <Button onClick={showPayersButton}>
                    {(!showPayers && personPaid)}
                    <Collapse isOpen={showPayers}>
                        {props.people.map((item, i) => (
                            <Button key={i} onClick={(eName) => payerClicked(item.name)} > {item.name} </Button>
                        ))}
                    </Collapse>
                </Button>

                <strong>  Split by everyone </strong>
                <Button onClick={showSplitButton}>
                    {(!showSplit && unequal)}
                    <Collapse isOpen={showSplit}>
                        <Button onClick={(e) => showUnequalSplit("equally")} > equally </Button>
                        <Button onClick={(e) => showUnequalSplit("not equally")} > not equally </Button>
                        <Drawer isOpen={(unequal=='not equally')}>UNEQUAL OPTION</Drawer>
                    </Collapse>
                </Button>
                
            </div>
        </div > 
    ); 
    }


            // <Row className="mb-3">
            //     <Form.Group as={Col} controlId="payers">
            //         <RadioGroup
            //             name="group1"
            //             label="Who paid?"
            //             selectedValue={payer}
            //             onChange={handlePayer} >
            //             {props.people.map((item, i) => (
            //                 <Radio key={i} value={item.name} label={item.name}> </Radio>
            //             ))}
            //         </RadioGroup>
            //     </Form.Group>
            // </Row>

// <Form.Group as={Col} controlId="payersSplit">
//     <RadioGroup
//         name="group2"
//         label="How is it being split?"
//         selectedValue={equalSplit}
//         onChange={handleSplit} >
//             <Radio key={"splitChoice1"} value={0} label={"Equally"}> </Radio>
//             <Radio key={"splitChoice2"} value={1} label={"Someone is paying more"}> </Radio>
//     </RadioGroup>
// </Form.Group>

