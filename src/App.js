import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppList from './Pages/AppList';
import AppGroup from './Pages/AppGroup';
import React, { useState, useEffect } from 'react'
import { Dialog, Classes } from '@blueprintjs/core';

  // data structure for all people in group to split expenses with - can a data structure be put into the function App() to behave like a global var for the components?
  let peopleArr = []

function App() {
  //console.log("here");
  const [, setRenderTrigger] = useState({})  //State for triggering re-renders - can useEffect() be used here w/ a dependency array?
  const [people, setPeople] = useState([])
  const [expenses, setExpenses] = useState([])

  const onAddPerson = (toAdd) => {
    console.log("in parent onAddPerson")
    setPeople([...people, toAdd])
  }

  const onAddExpense = (toAdd) => {
    console.log("in parent onAddExpense")
    setExpenses([...expenses, {description: toAdd.description.trim(), amount: toAdd.amount}])
    //expenses.length && console.log("expenses:\n" + expenses[0].description + expenses[0].amount)
  }

  return (
    <div className="App">
        <ul className="list-group">
          {people.map((elem, i) => (
          <li key={i} className="list-group-item list-group-item-action"> {elem} </li> ))}
        </ul>

        <AppGroup onAddPerson={onAddPerson} ></AppGroup>
        <AppList onAddExpense={onAddExpense} expenses={expenses}></AppList>

        <ul className="list-group">
          {expenses.map((item, i) => (
            <li key={i} className="list-group-item list-group-item-action" > {item.description} : ${item.amount} </li>
          ))}
        </ul>
    </div>
  );

}

export default App;
