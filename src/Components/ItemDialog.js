import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@blueprintjs/core/lib/css/blueprint.css'; 
import React, { useState, useEffect } from 'react'
import { H3, Dialog, Classes, Button, Overlay, FormGroup, InputGroup} from '@blueprintjs/core';

  // data structure for all people in group to split expenses with - can a data structure be put into the function App() to behave like a global var for the components?
  let peopleArr = []

export default function ItemDialog() {
    // Open state 
    const [showForm, setShowForm] = useState(false) 

    let input = { description: 'test', amount: '0' }
    const [expense, setExpense] = useState({ description: '', amount: '' })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setExpense({...expense, [name]: value,});
    }; 

    function handleSubmit(e) {
        e.preventDefault()
        setShowForm(false)
        input = { description: expense.description.trim(), amount: expense.amount }
        peopleArr.push(input)
        setExpense({ description: '', amount: '' })
    }

    const handleButton = () => {
        setShowForm(true)
        console.log("handleButton")
    }

    return ( 
        <div style={{ display: 'block', width: 400, padding: 30 }}> 
            <Button text="Add expense" onClick={handleButton} ></Button>
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
            <p> {input.description} : $ {input.amount} </p>
        </div > 
    ); 
    }
