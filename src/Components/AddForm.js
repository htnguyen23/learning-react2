import React, { useState, useEffect } from 'react';
import {
    Dialog,
    InputGroup,
    FormGroup,
   } from "@blueprintjs/core";
import '@blueprintjs/core/lib/css/blueprint.css'; 


export default function AddForm() {
    const [expense, setExpense] = useState({
        description: '',
        amount: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setExpense({...expense, [name]: value,});
    }; 
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted with data: ', expense)
    };

    return (
            <div>
                <h3>Add an expense</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Description: </label>
                        <input
                            type="text"
                            name="description"
                            value={expense.description}
                            onChange={handleInputChange} />
                        </div>
                    <div>
                        <label>Amount: $</label>
                        <input
                            type="number"
                            name="amount"
                            value={expense.amount}
                            onChange={handleInputChange} />
                        </div>
                        <button type="submit">Add</button>
                    </form>
                </div>
    );
}

                // <FormGroup labelFor="text-input">
                //     Description: <InputGroup placeholder="however you want to categorize this purchase" /> 
                //     Amount: <InputGroup placeholder="$" /> 
                //     <div
                //         style={{
                //             display: "flex",
                //             flexDirection: "column",
                //             marginTop: "1rem",
                //         }}>
                        
                //     </div>
                //     </FormGroup>