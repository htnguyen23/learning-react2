import React, { useState, useEffect } from 'react';
import { TextArea, FormGroup, InputGroup } from "@blueprintjs/core";

export default function AppGroup( {handlePushArg} ) {

    const[testPush, setTestPush] = useState("")

    const handlePush = () => {
        handlePushArg(testPush);
        setTestPush("")
    }

    return (
        <div>
            <button className="App-button" type="button" onClick={handlePush}> push </button>
            <FormGroup
                label="Add person"
                labelFor="text-input" >
                <InputGroup id="text-input" placeholder="Huong" value={testPush} onChange={(e) => setTestPush(e.target.value)}/>
            </FormGroup>
        </div>
    );
}