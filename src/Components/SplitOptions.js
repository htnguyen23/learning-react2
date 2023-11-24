import '../App.css';
import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { H3, Dialog, Classes, Overlay, FormGroup, InputGroup, 
        RadioGroup, Radio, Collapse, Button, Pre, Drawer, CheckboxCard} from '@blueprintjs/core';

export default function SplitOptions(props) {

    // const [equalSplit, setEqualSplit] = useState(0)   // boolean for the expense being split equally (0) or not (1)
    
    // const handleSplit = (selectedValue) => {
    //     console.log("equalSplit before: ", equalSplit)
    //     setEqualSplit(selectedValue.target.value)
    //     console.log("equalSplit after: ", equalSplit)

    //     // Handle math for equal payment
    //     let cost = props.expense.amount / props.people.length
    //     props.people.forEach((elem, index) => {
    //         props.payerChange.push({name: props.people, cost: [cost]})
    //     })

    //     // Handle math for unequal payment
    // }; 

    const [showPayers, setShowPayers] = useState(false)
    const [personPaidChild, setPersonPaidChild] = useState(props.people[0])
    const [showSplit, setShowSplit] = useState(false)
    const [equality, setEquality] = useState("equally")    
    const [showUnequal, setShowUnequal] = useState(false)   // state doesn't update in time to open Drawer

    const showPayersButton = () => {
        setShowPayers(!showPayers)
    }

    const payerClicked = (eName) => {
        setPersonPaidChild(eName)
        props.setPersonPaid(eName)
    }

    const showSplitButton = () => {
        setShowSplit(!showSplit)
    }

    const unequalButton = () => {
        setEquality("not equally ") 
        props.setEqual(false)
        setShowUnequal(true)
    }
    
    const equalButton = () => {
        setEquality("equally")
        props.setEqual(true)
        setShowUnequal(false)
    }

    const [showUnequalCollapse1, setShowUnequalCollapse1] = useState(false)
    const unequalCollapse1Button = () => {
        setShowUnequalCollapse1(true)
        setShowUnequalCollapse2(false)
    }
    const [showUnequalCollapse2, setShowUnequalCollapse2] = useState(false)
    const unequalCollapse2Button = () => {
        setShowUnequalCollapse1(false)
        setShowUnequalCollapse2(true)
    }


    const splitEqually = () => {
        // Handle math for equal payment
        let eachCost = props.expense.amount / props.people.length
        let payerChangeChild = []
        props.people.forEach((elem, index) => {
            payerChangeChild.push({name: elem, cost: eachCost})
            // console.log("in payerChangeChild: " + payerChangeChild[index])
        })
        //console.log("in equalButton in SplitOptions.js")
        props.setPayerChangeChild(payerChangeChild)
    }
    //console.log("testing no function: " + equality)

    return ( 
        <div > 
            <div>
                <strong>  Paid by  </strong>
                <Button onClick={showPayersButton}>
                    {(!showPayers && personPaidChild)}
                    <Collapse isOpen={showPayers}>
                        {props.people.map((item, i) => (
                            <Button key={i} onClick={(eName) => payerClicked(item)} > {item} </Button>
                        ))}
                    </Collapse>
                </Button>
                <strong>  Split by everyone </strong>
                <Button onClick={showSplitButton}>
                    {(!showSplit && equality)}
                    <Collapse isOpen={showSplit}>
                        <Button onClick={equalButton} > equally </Button>
                        <Button onClick={unequalButton} > not equally </Button>
                    </Collapse>
                </Button>

                <Drawer 
                    isOpen={showUnequal}
                    title="someone's paying more..." 
                    isCloseButtonShown={true} 
                    canOutsideClickClose={false}
                    onClose={equalButton}
                    > 
 
                    <Button 
                        id="unequalCollapse1Button" 
                        onClick={unequalCollapse1Button} > some pay some don't
                    </Button>
                    <Collapse 
                        id="unequalCollapse1" 
                        isOpen={showUnequalCollapse1}>
                            <Pre>Dummy TEXT</Pre>
                            {props.people.map((item, i) => (
                                <CheckboxCard key={i} > {item} </CheckboxCard>
                            ))}
                    </Collapse>

                    <Button 
                        id="unequalCollapse2Button" 
                        onClick={unequalCollapse2Button} > some pay specific amounts
                    </Button>
                    <Collapse 
                        id="unequalCollapse2" 
                        isOpen={showUnequalCollapse2}>
                            <Pre>Dummy TEXT</Pre>
                            
                    </Collapse>
                </Drawer>
                
            </div>
        </div > 
    ); 
    }

// TODO use control card for adding who's paying and who's not