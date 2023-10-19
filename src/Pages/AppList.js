import '../App.css';
import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup'
import { H3, Dialog, Classes, Button, Overlay, FormGroup, InputGroup, RadioGroup, Radio} from '@blueprintjs/core';

let expensesArr = []   // CHANGE: use an array or a state hook?

/**
 * expense object
 * {descrip: indentifier for expense
 *  amount: $ cost for expense
 *  payer: person who paid
 *  payers: people with whom this expense is being split
 * }
 */

export default function AppList( {onAddExpense, people, expenses} ) {
    
    const [showForm, setShowForm] = useState(false)
    const [expense, setExpense] = useState({ descrip: '', amount: ''})
    const [payer, setPayer] = useState("")

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setExpense({...expense, [name]: value});
    }; 
    const handleSubmit = (e) => {
        console.log("in child onAddExpense")
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

    const addEvent = () => {
        setShowForm(true)
    };

    return (
        <div>
            <button 
                className="App-button" 
                onClick={() => {setShowForm(true)}}> 
                Add Expense 
            </button>
            <div style={{ display: 'block', width: 400, padding: 30 }}>
                <Dialog 
                    title="Add an Expense"
                    isOpen={showForm} 
                    onClose={() => setShowForm(false)} > 
                    <form onSubmit={handleSubmit}>
                    <div className={Classes.DIALOG_BODY}>
                        <label>Description: </label>
                        <input
                            type="text"
                            name="descrip"
                            value={expense.descrip}
                            onChange={handleInputChange} />
                    </div>
                    <div className={Classes.DIALOG_BODY}>
                        <label>Amount: $</label>
                        <input
                            type="number"
                            name="amount"
                            value={expense.amount}
                            onChange={handleInputChange} />
                    </div>
                    { (people.length > 0) && (expense.descrip && expense.amount) && (
                    <div className={Classes.DIALOG_BODY}>
                        <RadioGroup
                            name="group"
                            label="Who paid?"
                            selectedValue={payer}
                            onChange={(e) => setPayer(e.target.value)} >
                            {people.map((item, i) => (
                                <Radio key={i} value={item} label={item}> </Radio>
                            ))}
                        </RadioGroup>
                    </div>
                    )}
                    <div className={Classes.DIALOG_BODY}>
                        <button type="submit">Split it</button>
                    </div>
                    </form>
                </Dialog> 
            </div>
        </div>
    );
};
