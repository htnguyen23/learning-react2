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
 */

export default function AppExpenses( {onAddExpense, people, expenses} ) {
    
    const [showForm, setShowForm] = useState(false)
    const [expense, setExpense] = useState({ descrip: '', amount: ''})
    const [payerChange, setPayerChange] = useState([])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setExpense({...expense, [name]: value});
    }; 
    const handleSubmit = (e) => {
        //console.log("in child onAddExpense")
        e.preventDefault();
        console.log('form submitted: ', expense)
        console.log('type of expense: ', typeof expense.amount)
        if (expense.descrip.trim() && expense.amount) {
            setExpense({ descrip: expense.descrip.trim() })
            onAddExpense(expense);   
        };
        setExpense({ descrip: '', amount: '' })
        setShowForm(false)
    };

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
                                <SplitOptions payerChange={payerChange} expense={expense} people={people} />
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
