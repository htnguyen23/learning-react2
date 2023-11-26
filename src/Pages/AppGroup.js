import React, { useState, useEffect } from 'react';
import { TextArea, FormGroup, InputGroup } from "@blueprintjs/core";

export default function AppGroup( {onAddPerson} ) {

    // TODO: can't add people when there are existing expenses and/or can add people but existing expenses won't include them

    const[person, setPerson] = useState("")
    const[showForm, setShowForm] = useState(false)

    const handleKeyDown = (e) => {
        if (e.key == 'Enter') {
            onAddPersonChild()
        }
    }
    const onAddPersonChild = () => {
        //console.log("\tin child onAddPerson")
        if (!showForm) {
            setShowForm(true)
        } else {
            person.trim() && onAddPerson(person.trim());
            setPerson("")
            setShowForm(false)
        }
    }

    return (
        <div>
            <div style={{ display: 'block', width: 400, padding: 30 }} > </div>
            <button className="App-button" type="button" onClick={onAddPersonChild}> Add Person </button>
            {showForm && (
                <FormGroup
                    label="Add person"
                    labelFor="text-input" >
                    <InputGroup fill='false'
                        id="text-input" 
                        onKeyDown={(e) => handleKeyDown(e)}
                        placeholder="Who is paying?" 
                        value={person} 
                        onChange={(e) => setPerson(e.target.value)}
                    />
                </FormGroup> 
            )}
        </div>
    );
}