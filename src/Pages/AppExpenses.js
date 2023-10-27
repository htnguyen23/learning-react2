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
    let [payerChange, setPayerChange] = useState({giving: "", recieving: "", cost: 0})  
    //const [personPaid, setPersonPaid] = useState(props.people[0]); // problem
    
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
        setShowForm(false)
    };

    
    // payerChange setter method to be passed to SplitOptions child component for it to return which payers paid what amount
    const paymentMathEqual = () => {
        console.log("in paymentMathEqual: ")     
    
        // Handle math for equal payment
        let eachCost = parseFloat((expense.amount / people.length).toFixed(2))
        
        console.log("paymentsMap before:")
        console.log(paymentsMap)

        for (const personPaying of paymentsMap.keys()) {
            //paymentsMap.set("test", "test")
            if (personPaying == personPaid) {
                console.log("personPaying = " + personPaying + " personPaid = " + personPaid)
                continue;
            } 
            console.log("personPaying = " + personPaying)
            // console.log(paymentsMap.get(personPaying).keys())
            for (const personOwed of (paymentsMap.get(personPaying)).keys()) {
                if (personOwed == personPaid) {
                    paymentsMap.get(personPaying).get(personOwed).push(eachCost)
                    //console.log("\t\there")
                }
                //console.log("\titerated through: " + personPaying + " for " + personOwed)
            }
        }
        console.log("paymentsMap after:")
        console.log(paymentsMap);
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
                    onClose={() => setShowForm(false)} > 
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
                                <SplitOptions setEqual={setEqual} expense={expense} people={people} setPersonPaid={setPersonPaid}/>
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
