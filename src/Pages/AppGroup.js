import React, { useState, useEffect } from 'react';
import { TextArea, FormGroup, InputGroup } from "@blueprintjs/core";

export default function AppGroup( {onAddPerson} ) {

    const[person, setPerson] = useState("")
    const[showForm, setShowForm] = useState(false)

    const onAddPersonChild = () => {
        //console.log("in child onAddPerson")
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
                    <InputGroup id="text-input" placeholder="Who is paying?" value={person} onChange={(e) => setPerson(e.target.value)}/>
                </FormGroup> 
            )}
        </div>
    );
}