import React, { useState, useEffect } from 'react';
import {
    AnchorButton,
    Button,
    Code,
    Dialog,
    Classes,
    DialogBody,
    DialogFooter,
    DialogProps,
    H5,
    Switch,
    Tooltip,
   } from "@blueprintjs/core";
import '@blueprintjs/core/lib/css/blueprint.css'; 

export default function ItemDialog( {isOpen} ) {

    // How to create an attribute/prop for <ButtonWithDialog> that similar to isOpen for <Dialog>?

    let input = {}
    const [open, setOpen] = useState(isOpen)
    const [expense, setExpense] = useState({ description: '', amount: '' })


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setExpense({...expense, [name]: value,});
    }; 

    function handleSubmit(e) {
        e.preventDefault()
        setOpen(false)
        //setExpense({ description: '', amount: '' })
    }

    return ( 
        <div style={{ 
            display: 'block', width: 400, padding: 30 
        }}> 
            <Dialog 
                title="Add an Expense"
                isOpen={open} 
                onClose={() => setOpen(false)} > 
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
    ); 
} 