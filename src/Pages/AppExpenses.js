import '../App.css';
import React, { useState, useEffect } from 'react';
import SplitOptions from '../Components/SplitOptions';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
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
    const [personPaid, setPersonPaid] = useState(people[0])

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
        console.log("\tin paymentMathEqual: ")     
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
        console.log("\tin addToPayerChangeArr:")
        console.log("PersonPaid = " + personPaid)
        payerChangeArr.push({giving: givingFromChild, recieving: personPaid, cost: costFromChild})
    }
    // function iterates through payerChangeArr and updates PaymentsMap according to each element (is triggered in submission of expense in child SplitOptions)
    const payerChangeArrToMap = async () => {
        console.log("\tin payerChangeArrToMap (parent)")
        return new Promise((resolve) => {
            payerChangeArr.forEach((payment) => {
                console.log(payment)
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
                className="button-33" 
                onClick={() => {setShowForm(true)}}> 
                Add Expense 
            </button>
            <div>
                <Dialog 
                    title="Add an Expense"
                    isOpen={showForm} 
                    onClose={() => showFormClose()} 
                    style={{ borderRadius: '10px', marginLeft: "20px"}}> 
                    <Form
                        style={{marginLeft: "20px", marginTop: '10px'}}>
                        <input 
                            type="text" 
                            name="descrip" 
                            className="question" 
                            id="descrip2" 
                            required autocomplete="off" 
                            value={expense.descrip}
                            onChange={handleInputChange}/>
                        <label for="descrip2">
                            <span>Give the expense a name</span></label>
                        <input 
                            type="text" 
                            name="amount"
                            className="question" 
                            id="amount2" 
                            required autocomplete="off" 
                            value={expense.amount}
                            onChange={handleInputChange}
                            />
                        <label for="amount2">
                        <span>How much was it?</span></label>
                        { (people.length > 0) && (expense.descrip && expense.amount) && (
                            <SplitOptions 
                                setEqual={setEqual} 
                                expense={expense} 
                                people={people} 
                                personPaid={personPaid}
                                setPersonPaid={setPersonPaid}
                                addToPayerChangeArr={addToPayerChangeArr}
                                showFormClose={showFormClose}
                                payerChangeArrToMap={payerChangeArrToMap}
                                handleSubmit={handleSubmit}
                                setExpense={setExpense}
                                onAddExpense={onAddExpense}
                                />
                        )}
                        <div
                            style={{display:"flex", justifyContent: 'center', padding: '15px'}}>
                            <button 
                                type="submit" 
                                className="button-33"
                                onClick={handleSubmit} 
                                >Split it</button>
                        </div>     
                    </Form>
                </Dialog> 
            </div>
        </div>
    );
};
