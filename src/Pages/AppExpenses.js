import '../App.css';
import React, { useState, useEffect } from 'react';
import SplitOptions from '../Components/SplitOptions';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { H3, Dialog, Classes, Overlay, FormGroup, InputGroup, RadioGroup, Radio} from '@blueprintjs/core';

let expensesArr = []   // CHANGE: use an array or a state hook?

/**
 * expense object
 * {descrip: indentifier for expense
 *  amount: $ cost for expense
 *  payer: person who paid
 *  payers: people with whom this expense is being split
 * }
 * 
 * payerChange object
 * {giving: name of person making the payment (payer)
 *  receiving: name of person getting the payment (payee - ie. the personPaid)
 *  cost: the amount of money in the payment
 *  }
 */

export default function AppExpenses( {expenses, onAddExpense, people, paymentsMap} ) {

    const [showForm, setShowForm] = useState(false)
    const [expense, setExpense] = useState({ descrip: '', amount: ''})
    const [equal, setEqual] = useState(true)
        
    // variable for person who is paying (used in calculating math for payments)
    let personPaid = people[0]
    const setPersonPaid = (person) => {
        personPaid = person
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setExpense({...expense, [name]: value});
    }; 

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('form submitted: ', expense)
        if (expense.descrip.trim() && expense.amount) {
            setExpense({ descrip: expense.descrip.trim() })
            onAddExpense(expense);   
        };
        setExpense({ descrip: '', amount: '' })
        if (equal) {
            paymentMathEqual()
        }
        showFormClose()
    };
    
    // Handle math for equal payment
    const paymentMathEqual = () => {
        console.log("in paymentMathEqual: ")     
        let eachCost = parseFloat((expense.amount / people.length).toFixed(2))

        for (const personPaying of paymentsMap.keys()) {
            if (personPaying == personPaid) {
                continue;
            } 
            for (const personOwed of (paymentsMap.get(personPaying)).keys()) {
                if (personOwed == personPaid) {
                    paymentsMap.get(personPaying).get(personOwed).push(eachCost)
                }
            }
        }
    }

    const showFormClose = () => {
        setShowForm(false);
        setExpense({ descrip:"" })
        setExpense({ amount:"" })
        setEqual(true)
        console.log("paymentsMap after form closed:")
        console.log(paymentsMap);
    }

    // Handle math for unequal payment
    let payerChangeArr = [] // objects in arr: {giving: "", recieving: "", cost: 0})  
    // setter function for payerChangeArr to be spent to SplitOptions child componenet 
    const addToPayerChangeArr = (givingFromChild, costFromChild) => {
        payerChangeArr.push({giving: givingFromChild, recieving: personPaid, cost: costFromChild})
    }
    // function iterates through payerChangeArr and updates PaymentsMap according to each element (is triggered in submission of expense in child SplitOptions)
    const payerChangeArrToMap = async () => {
        return new Promise((resolve) => {
            payerChangeArr.forEach((payment) => {
                paymentsMap.get(payment.giving).get(payment.recieving).push(payment.cost)
                console.log(paymentsMap.get(payment.giving).get(payment.recieving)) 
                //console.log(paymentsMap)
            }) 
            resolve("payerChangeArrToMap updated successfully")
        })
    }


    return (
        <div>
            <button 
                className="App-button" 
                onClick={() => {setShowForm(true)}}> 
                Add Expense 
            </button>
            <div>
                <Dialog 
                    title="Add an Expense"
                    isOpen={showForm} 
                    onClose={() => showFormClose()} > 
                        <Form>
                            <Row className="mb-3">
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Form.Group as={Col} controlId="descrip">
                                        <label> Description: </label>
                                        <input
                                            id="descrip"
                                            type="text"
                                            name="descrip"
                                            value={expense.descrip}
                                            onChange={handleInputChange} />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="amount">
                                        <label>Amount: $</label>
                                        <input
                                            id="amount"
                                            type="number"
                                            name="amount"
                                            value={expense.amount}
                                            onChange={handleInputChange} />
                                    </Form.Group>
                                </div>
                            </Row>
                            { (people.length > 0) && (expense.descrip && expense.amount) && (
                                <SplitOptions 
                                    setEqual={setEqual} 
                                    expense={expense} 
                                    people={people} 
                                    setPersonPaid={setPersonPaid}
                                    addToPayerChangeArr={addToPayerChangeArr}
                                    showFormClose={showFormClose}
                                    payerChangeArrToMap={payerChangeArrToMap}
                                    handleSubmit={handleSubmit}
                                    setExpense={setExpense}
                                    onAddExpense={onAddExpense}
                                    />
                            )}
                            <div className={Classes.DIALOG_BODY}>
                                <Button type="submit" onClick={handleSubmit} >Split it</Button>
                            </div>     
                        </Form>
                </Dialog> 
            </div>
        </div>
    );
};
