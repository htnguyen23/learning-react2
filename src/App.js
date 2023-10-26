import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppExpenses from './Pages/AppExpenses';
import AppGroup from './Pages/AppGroup';
import PaymentGrid from "./Components/PaymentGrid"
import React, { useState, useEffect } from 'react'
import { Dialog, Classes } from '@blueprintjs/core';

  // data structure for all people in group to split expenses with - can a data structure be put into the function App() to behave like a global var for the components?
  let peopleArr = []
  const paymentsMap = new Map();

  // TODO: use <Tabs> for page nagivation

function App() {
  //console.log("here");
  const [, setRenderTrigger] = useState({})  //State for triggering re-renders - can useEffect() be used here w/ a dependency array?
  const [people, setPeople] = useState([])   // {name: personName, cost: [array of amounts they owe $]}
  const [expenses, setExpenses] = useState([])

  const onAddPerson = (toAdd) => {
    console.log("in onAddPerson:")
    // TODO: how to ignore addition of a pre-existing person
    // add person to array of all people paying in group
    setPeople([...people, toAdd])
    // add person to a dict that keeps track of how much one person owes another
    if (!paymentsMap.has(toAdd)) {
      paymentsMap.set(toAdd, new Map());
    }
    updatePaymentsMap()
  }

  const updatePaymentsMap = () => {
    // TODO: find a way to populate map that isn't O(N^2)
    for (const currPer of people) {
      console.log("\tcurrPer: " + currPer)
      for (const iterPer of people) {
        console.log("\t\iterPer: " + iterPer)
        if (!paymentsMap.get(currPer).has(iterPer)) {
          if (currPer == iterPer) {
            continue;
          }
          paymentsMap.get(currPer).set(iterPer, []);
          console.log("here")
        }
      }
    }
  }

  const onAddExpense = (toAdd) => {
    setExpenses([...expenses, {descrip: toAdd.descrip, amount: toAdd.amount}])
  }

  return (
    <div className="App">
        <PaymentGrid people={people} paymentsMap={paymentsMap}></PaymentGrid>
        <ul className="list-group">
          {people.map((elem, i) => (
          <li key={i} className="list-group-item list-group-item-action"> {elem} </li> ))}
        </ul>

        <AppGroup onAddPerson={onAddPerson} ></AppGroup>
        <AppExpenses onAddExpense={onAddExpense} people={people} expenses={expenses} peopleArr={peopleArr}></AppExpenses>
        <ul className="list-group">
          {expenses.map((item, i) => (
            <li key={i} className="list-group-item list-group-item-action" > {item.descrip} : ${item.amount} </li>
          ))}
        </ul>
    </div>
  );

}

export default App;
