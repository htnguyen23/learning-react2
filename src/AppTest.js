import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@blueprintjs/core/lib/css/blueprint.css'; 
import React, { useState, useEffect } from 'react'
import { H3, Dialog, Classes, Button, Overlay, FormGroup, InputGroup, RadioGroup, Radio} from '@blueprintjs/core';

  // data structure for all people in group to split expenses with - can a data structure be put into the function App() to behave like a global var for the components?
  let peopleArr = ["Huong", "Mom", "Dad"]

function AppTest() {
    const [expenses, setExpenses] = useState([])
    const [expense, setExpense] = useState({ descrip: '', amount: '' })
    const [showForm, setShowForm] = useState(false) 
    let input = { descrip: 'test', amount: '0' }

    // new
    const [payer, setPayer] = useState(peopleArr[0])

    const handlePayer = (e) => {
        setPayer(e.target.value)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setExpense({...expense, [name]: value,});
    }; 

    function handleSubmit(e) {
        e.preventDefault()
        setShowForm(false)
        //input = { description: expense.description.trim(), amount: expense.amount }
        //peopleArr.push(input)
        setExpenses([...expenses, {descrip: expense.descrip.trim(), amount: expense.amount}])
        setExpense({ descrip: '', amount: '' })
        console.log("payer: " + payer)
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
                { (expense.descripn && expense.amount) && (
                    <div className={Classes.DIALOG_BODY}>
                        <RadioGroup
                            name="group"
                            label="Who paid?"
                            selectedValue={payer}
                            onChange={(e) => setPayer(e.target.value)} >
                            {peopleArr.map((item, i) => (
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
            <ul className="list-group">
                {expenses.map((item, i) => (
                    <li key={i} className="list-group-item list-group-item-action" > {item.descrip} : ${item.amount} </li>
                ))}
            </ul>

        </div > 
    ); 
    }

export default AppTest;
