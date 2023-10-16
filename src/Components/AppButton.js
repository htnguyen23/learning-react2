import '../App.css';
import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

export default function AppButton() {
    
    // CHANGE: define itemList Component to handle items in state and specific functionality
    
    const [items, setItems] = useState([])

    // Function to add an item to the list 
    const addEvent = () => {
        const newItem = prompt("Enter a new item: ");
        if (newItem) {
            setItems([...items, newItem]);
        }
    };

    // use effect hook to fetch data and update for list
    // useEffect(() => {
    //     // display/add item to list
        
    // }, [items])

    return (
        <div>
            <button className="App-button" onClick={addEvent}> 
                Share 
                </button>
            <ListGroup>
                {items.map((item, i) => (
                    <ListGroup.Item key={i}> {item} </ListGroup.Item>
                ))}
                </ListGroup>
        </div>
    );
};
