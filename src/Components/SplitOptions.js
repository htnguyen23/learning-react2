import '../App.css';
import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { H3, Dialog, Classes, Overlay, FormGroup, InputGroup, 
        RadioGroup, Radio, Collapse, Button, Pre, Drawer, CheckboxCard, Checkbox} from '@blueprintjs/core';

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

    // For unequal split drawer
    const handleSubmit = async () => {
        setShowUnequal(false)
        if (Uneq1ShowCollapse) {
            try {
                const result = await addToPayerChangeArrChild();
                console.log(result)
                const result2 = await props.payerChangeArrToMap();
                console.log(result2)
            } catch (error) {
                console.error('Error', error);
            }
        }
        else if (Uneq2ShowCollapse) {
            console.log("Uneq2ShowCollapse")
        }
        props.showFormClose()
    }

    const [Uneq1ShowCollapse, setUneq1ShowCollapse] = useState(false)
    const uneq1CollapseButton = () => {
        setUneq1ShowCollapse(true)
        setUneq2ShowCollapse(false)
    }

    let uneq1PayerArr = []
    let uneq1PayerAmount = 0
    //const [uneq1PayerAmount, setUneq1PayerAmount] = useState(0)   // HTML elem for reporting amount: <Pre>Each person is paying: ${(uneq1PayerAmount > props.expense.amount) ? 0 : uneq1PayerAmount} </Pre>
    const uneq1CheckboxOnChange = (e) => {
        //console.log(e)
        if (e.target.checked){
            uneq1PayerArr.push(e.target.value)
        }
        else {
            // find way to remove unchecked that doesn't require iterating through array to find matching elem
            uneq1PayerArr = uneq1PayerArr.filter(item => item !== e.target.value)
        }
        //setUneq1PayerAmount(props.expense.amount / uneq1PayerArr.length)
        uneq1PayerAmount = parseFloat((props.expense.amount / uneq1PayerArr.length).toFixed(2)) 
        console.log(uneq1PayerArr)
        console.log("Each person is paying: $" + uneq1PayerAmount)
    }

    // async function for updating PayerChangesArr in parent
    const addToPayerChangeArrChild = async () => {
        return new Promise((resolve) => {
            uneq1PayerArr.forEach((payer) => {
                props.addToPayerChangeArr(payer, uneq1PayerAmount)
                }) 
            resolve("addToPayerChangeArrChild test async")
        })
    }
    
    const [Uneq2ShowCollapse, setUneq2ShowCollapse] = useState(false)
    const uneq2CollapseButton = () => {
        setUneq1ShowCollapse(false)
        setUneq2ShowCollapse(true)
    }

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
                        onClick={uneq1CollapseButton} > some pay some don't
                    </Button>
                    <Collapse 
                        id="unequalCollapse1" 
                        isOpen={Uneq1ShowCollapse}>
                            {props.people.map((item, i) => (
                                <Checkbox 
                                    label={item}
                                    value={item}
                                    onChange={(e) => uneq1CheckboxOnChange(e)}
                                    >  </Checkbox>
                            ))}
                    </Collapse>

                    <Button 
                        id="unequalCollapse2Button" 
                        onClick={uneq2CollapseButton} > some pay specific amounts
                    </Button>
                    <Collapse 
                        id="unequalCollapse2" 
                        isOpen={Uneq2ShowCollapse}>
                            <Pre>Dummy TEXT</Pre>
                    </Collapse>
                    
                    {(Uneq1ShowCollapse || Uneq2ShowCollapse) && (<div className={Classes.DIALOG_BODY}>
                        <Button type="submit" onClick={handleSubmit} >Split it</Button>
                    </div>
                    )}

                </Drawer>
                
            </div>
        </div > 
    ); 
    }

// TODO use control card for adding who's paying and who's not