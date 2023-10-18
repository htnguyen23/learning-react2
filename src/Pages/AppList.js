import '../App.css';
import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup'
import { Dialog, Classes } from '@blueprintjs/core';

let expensesArr = []   // CHANGE: use an array or a state hook?

export default function AppList( {onAddExpense, expenses} ) {
    
    // CHANGE: define itemList Component to handle items in state and specific functionality
    const [items, setItems] = useState([])

    // TODO: separate these into their components - how to access state hooks of another component?
    const [showForm, setShowForm] = useState(false)
    const [expense, setExpense] = useState({ description: '', amount: ''})

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setExpense({...expense, [name]: value});
    }; 
    const handleSubmit = (e) => {
        console.log("in child onAddExpense")
        e.preventDefault();
        console.log('form submitted: ', expense)
        console.log('type of expense: ', typeof expense.amount)
        if (expense.description.trim() && expense.amount) {
            onAddExpense(expense);   
        };
        //console.log("expenses:\n" + expenses)
        setExpense({ description: '', amount: '' })
        setShowForm(false)
    };

    const addEvent = () => {
        //console.log("showForm: " + showForm)
        setShowForm(true)
    };

    const alertClicked = (itemClicked) => {
        console.log(itemClicked + " clicked")
    };
    
    // TODO: use effect hook to fetch data and update for list
    // useEffect(() => {
    //     // display/add item to list
        
    // }, [items])

    return (
        <div>
            <button className="App-button" onClick={addEvent}> 
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
                            name="description"
                            value={expense.description}
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
                    <div className={Classes.DIALOG_BODY}>
                        <button type="submit">Split it</button>
                    </div>
                    </form>
                </Dialog> 
            </div>
            <ul className="list-group">
                {expenses.map((item, i) => (
                    <li key={i} className="list-group-item list-group-item-action" onClick={() => alertClicked(item)}> {item.description} : ${item.amount} </li>
                ))}
                </ul>
        </div>
    );
};
