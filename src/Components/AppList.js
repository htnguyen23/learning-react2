import '../App.css';
import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup'
import AddForm from './AddForm';
import { Dialog, Classes } from '@blueprintjs/core';
import ButtonWithDialog from './ButtonWithDialog';

export default function AppList() {
    
    // CHANGE: define itemList Component to handle items in state and specific functionality
    let itemsArr = []   // CHANGE: use an array or a state hook?
    const [items, setItems] = useState([])
    
    // TODO: separate these into their components - how to access state hooks of another component?
    const [showForm, setShowForm] = useState(false)
    const [expense, setExpense] = useState({ description: '', amount: ''
    })
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setExpense({...expense, [name]: value,});
    }; 
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('form submitted: ', expense)
        itemsArr.push(expense)
        console.log("itemsArr:\n" + itemsArr)
        console.log("itemsArr size: " + itemsArr.length)
        setShowForm(false)
    };

    const addEvent = () => {
        setShowForm(true)
    };

    const alertClicked = (itemClicked) => {
        //alert(itemClicked + " clicked");
        console.log(itemClicked + " clicked")
    };
    
    // TODO: use effect hook to fetch data and update for list
    // useEffect(() => {
    //     // display/add item to list
        
    // }, [items])

    return (
        <div>
            <button className="App-button" onClick={addEvent}> 
                Add 
                </button>
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
            <ul className="list-group">
                {itemsArr.map((item, i) => (
                    <li key={i} className="list-group-item list-group-item-action" onClick={() => alertClicked(item)}> {i+1} : {item} </li>
                ))}
                </ul>
        </div>
    );
};

            // <ListGroup>
            //     {items.map((item, i) => (
            //         <ListGroupItem key={i} action onClick={alertClicked(item)}> 
            //             {i+1} : {item} 
            //             </ListGroupItem>
            //     ))}
            //     <ListGroupItem action onClick={alertClicked("nonMap")}> nonMapItem </ListGroupItem>
            //     </ListGroup>

            // <CardGroup>
            // {items.map((item, i) => (
            //     <Card key={i} action onClick={() => alertClicked(item)}> 
            //         <Card.Body>
            //             <Card.Title> {i} </Card.Title>
            //             <Card.Text> {item} </Card.Text>
            //             </Card.Body>
            //         </Card>
            // ))}
            // </CardGroup>