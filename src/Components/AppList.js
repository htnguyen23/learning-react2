import '../App.css';
import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup'

export default function AppList() {
    
    // CHANGE: define itemList Component to handle items in state and specific functionality
    let itemsArr = []   // CHANGE: use an array or a state hook?
    const [items, setItems] = useState([])

    // Function to add an item to the list 
    const addEvent = () => {
        const newItem = prompt("Enter a new item: ");
        // if (newItem) {
        //     itemsArr.push(newItem);
        // }
        newItem && setItems([...items, newItem]);
        console.log("items:\n" + items)
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
            <ul className="list-group">
                {items.map((item, i) => (
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