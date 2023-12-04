import '../App.css';
import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { H3, Dialog, Classes, Overlay, FormGroup, InputGroup, 
        RadioGroup, Radio, Collapse, Button, Pre, Drawer, CheckboxCard, Checkbox} from '@blueprintjs/core';

export default function SplitOptions(props) {

    const [showPayers, setShowPayers] = useState(false)
    const [personPaidChild, setPersonPaidChild] = useState(props.personPaid)
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
                const result = await uneq1AddToPayerChangeArrChild();
                console.log(result)
                const result2 = await props.payerChangeArrToMap();
                console.log(result2)
            } catch (error) {
                console.error('Error', error);
            }
        }
        else if (Uneq2ShowCollapse) {
            try {
                const result = await uneq2AddToPayerChangeArrChild();
                console.log(result)
                const result2 = await props.payerChangeArrToMap();
                console.log(result2)
            } catch (error) {
                console.error('Error', error);
            }
            console.log("Uneq2ShowCollapse")
        }
        // TODO: repeated handleSubmit() code from AppExpenses.js (figure out to trigger func w/o e)
        console.log('form submitted: ', props.expense)
        if (props.expense.descrip.trim() && props.expense.amount) {
            props.setExpense({ descrip: props.expense.descrip.trim() })
            props.onAddExpense(props.expense);   
        };
        props.setExpense({ descrip: '', amount: '' })
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

    // async function for updating PayerChangesArr in parent (for uneq1Collapse)
    const uneq1AddToPayerChangeArrChild = async () => {
        return new Promise((resolve) => {
            uneq1PayerArr.forEach((payer) => {
                props.addToPayerChangeArr(payer, uneq1PayerAmount)
                }) 
            resolve("resolve addToPayerChangeArrChild ")
        })
    }
    
    const [Uneq2ShowCollapse, setUneq2ShowCollapse] = useState(false)
    const uneq2CollapseButton = () => {
        setUneq1ShowCollapse(false)
        setUneq2ShowCollapse(true)
    }

    let uneq2PayerMap = new Map()
    // let uneq2PayerAmount = props.expense.amount
    //const [uneq1PayerAmount, setUneq1PayerAmount] = useState(0)   // HTML elem for reporting amount: <Pre>Each person is paying: ${(uneq1PayerAmount > props.expense.amount) ? 0 : uneq1PayerAmount} </Pre>
    const uneq2onBlur = (e) => {
        //console.log(e.target)
        if (e.target.value != '')
            uneq2PayerMap.set(e.target.id, parseFloat(e.target.value))
            let uneq2PayerSum = 0
            for (const val of uneq2PayerMap.values()) {
                uneq2PayerSum += val;
                console.log("uneq2PayerSum: $" + uneq2PayerSum)
            }
            let uneq2PayerAmount = parseFloat((props.expense.amount - uneq2PayerSum).toFixed(2)) 
            console.log(uneq2PayerMap)
            console.log("Amount left: $" + uneq2PayerAmount)
    }

    const uneq2AddToPayerChangeArrChild = async () => {
        return new Promise((resolve) => {
            uneq2PayerMap.forEach((value, key) => {
                props.addToPayerChangeArr(key, value)
            })
            resolve("resolve addToPayerChangeArrChild ")
        })
    }

    return ( 
        <div > 
            <div>
                <strong>  Paid by  </strong>
                <Button style={{fontSize: "10px"}} onClick={showPayersButton}>
                    {(!showPayers && personPaidChild)}
                    <Collapse isOpen={showPayers}>
                        {props.people.map((item, i) => (
                            <Button key={i} className="SplitOptions-button" onClick={(eName) => payerClicked(item)} > {item} </Button>
                        ))}
                    </Collapse>
                </Button>
                <strong>  Split by everyone </strong>
                <Button className="SplitOptions-button" onClick={showSplitButton} >
                    {(!showSplit && equality)}
                    <Collapse isOpen={showSplit}>
                        <Button onClick={equalButton} className="SplitOptions-button" > equally </Button>
                        <Button onClick={unequalButton} className="SplitOptions-button"> not equally </Button>
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
                        onClick={uneq1CollapseButton} 
                        > some pay some don't
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
                        onClick={uneq2CollapseButton} 
                        > some pay specific amounts
                    </Button>
                    <Collapse 
                        id="unequalCollapse2" 
                        isOpen={Uneq2ShowCollapse}>
                            {props.people.map((item, i) => (
                            <FormGroup
                                id={i}
                                label={item}
                                labelFor="text-input"
                                inline={true}>
                                    <input 
                                        id= {item} 
                                        placeholder='0.00'
                                        type="number"
                                        onBlur={(e) => uneq2onBlur(e)}/> 
                            </FormGroup>
                            ))}
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