import './App.css';
import './Input.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppExpenses from './Pages/AppExpenses';
import AppGroup from './Pages/AppGroup';
import PaymentGrid from "./Components/PaymentGrid"
import React, { useState, useEffect } from 'react'
import { Dialog, Classes } from '@blueprintjs/core';

  // data structure for all people in group to split expenses with - can a data structure be put into the function App() to behave like a global var for the components?
  let peopleArr = []
  const paymentsMap = new Map();
  /**
   * payerChangeMap map
   * { name: [ cost map w/ every other person's name as keys and values (in an array) of what this person owes them ]
   *   name2 : [...]
   * }
   */

  // TODO: use <Tabs> for page nagivation

function App() {
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
  }

  /**
   <div className="App-header" > SPLIT IT </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', columnGap: '10px' }} >
        <span>
          <PaymentGrid 
            people={people} 
            paymentsMap={paymentsMap}>
            </PaymentGrid>
        </span>
        <span>
          <AppGroup 
            onAddPerson={onAddPerson} >
            </AppGroup>
        </span>
        <span>
          <AppExpenses 
            onAddExpense={onAddExpense} 
            people={people} 
            expenses={expenses} 
            paymentsMap={paymentsMap}
            className="App-expenses">
            </AppExpenses>  
        </span>
        <span>
          <ul className="list-group">
            {expenses.map((item, i) => (
              <li key={i} className="list-group-item list-group-item-action" > {item.descrip} : ${item.amount} </li>
            ))}
          </ul>
        </span>
      </div>

      <div className="App" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'center', minHeight: '100vh' }}>
        <PaymentGrid 
          people={people} 
          paymentsMap={paymentsMap}>
          </PaymentGrid>
      </div>

   */
  // populate updatePaymentsMap based on people in people
  useEffect(() => {
    // TODO: find a way to populate map that isn't O(N^2)
    for (const currPer of people) {
      //console.log("\tcurrPer: " + currPer)
      for (const iterPer of people) {
        //console.log("\t\iterPer: " + iterPer)
        if (!paymentsMap.get(currPer).has(iterPer)) {
          if (currPer == iterPer) {
            continue;
          }
          paymentsMap.get(currPer).set(iterPer, []);
        }
      }
    }
    console.log("\tpaymentsMap")
    console.log(paymentsMap)
  }, [people]);

  const onAddExpense = (toAdd) => {
    setExpenses([...expenses, {descrip: toAdd.descrip, amount: toAdd.amount}])
  }

  return (
    <div>
      
      <div className="App-header" > SPLIT IT </div>

      <div className="App" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'center', minHeight: '100vh' }}>
        <PaymentGrid 
          people={people} 
          paymentsMap={paymentsMap}>
          </PaymentGrid>
        <AppGroup 
          onAddPerson={onAddPerson} >
          </AppGroup>
        <AppExpenses 
          onAddExpense={onAddExpense} 
          people={people} 
          expenses={expenses} 
          paymentsMap={paymentsMap}
          className="App-expenses">
          </AppExpenses> 
        <ul 
          className="list-group"
          style={{padding: "50px"}}>
          {expenses.map((item, i) => (
            <li key={i} className="list-group-item list-group-item-action" > {item.descrip} : ${item.amount} </li>
          ))}
        </ul>
      </div>
      
      <div className="App-footer" > </div>
    </div>
  );

}

export default App;