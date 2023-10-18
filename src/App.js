import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppList from './Pages/AppList';
import AppGroup from './Pages/AppGroup';
import { useState, useEffect } from 'react'
import React from 'react';

  // data structure for all people in group to split expenses with - can a data structure be put into the function App() to behave like a global var for the components?
  let peopleArr = []

function App() {
  //console.log("here");
  const [, setRenderTrigger] = useState({})  //State for triggering re-renders - can useEffect() be used here w/ a dependency array?
  const [people, setPeople] = useState([])

  const handlePush = (toPush) => {
    setPeople([...people, toPush])
  }


  return (
    <div className="App">
      <header className="App-header">
        <AppGroup handlePushArg={handlePush} ></AppGroup>
        <AppList></AppList>
        <ul className="list-group">
        {people.map((elem, i) => (
          <li key={i} className="list-group-item list-group-item-action"> {elem} </li> ))}
      </ul>
      </header>
    </div>
  );
}

export default App;
