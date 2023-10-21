import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppExpenses from './Pages/AppExpenses';
import AppGroup from './Pages/AppGroup';
import React, { useState, useEffect } from 'react'
import { Dialog, Classes } from '@blueprintjs/core';

  // data structure for all people in group to split expenses with - can a data structure be put into the function App() to behave like a global var for the components?
  let peopleArr = []

function App() {
  //console.log("here");
  const [, setRenderTrigger] = useState({})  //State for triggering re-renders - can useEffect() be used here w/ a dependency array?
  const [people, setPeople] = useState([{name: "jack", cost: []}, {name: "huong", cost: []}])   // {name: personName, cost: [array of amounts they owe $]}
  const [expenses, setExpenses] = useState([])

  const onAddPerson = (toAdd) => {
    console.log(toAdd)
    setPeople([...people, {name: toAdd, cost: []}])
  }

  const onAddExpense = (toAdd) => {
    //console.log("in parent onAddExpense")
    setExpenses([...expenses, {descrip: toAdd.descrip, amount: toAdd.amount}])
  }

  return (
    <div className="App">
        <ul className="list-group">
          {people.map((elem, i) => (
          <li key={i} className="list-group-item list-group-item-action"> {elem.name} </li> ))}
        </ul>

        <AppGroup onAddPerson={onAddPerson} ></AppGroup>
        <AppExpenses onAddExpense={onAddExpense} people={people} expenses={expenses}></AppExpenses>

        <ul className="list-group">
          {expenses.map((item, i) => (
            <li key={i} className="list-group-item list-group-item-action" > {item.descrip} : ${item.amount} </li>
          ))}
        </ul>
    </div>
  );

}

export default App;
