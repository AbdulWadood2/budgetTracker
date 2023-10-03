/* react */
import React, { useState, useEffect } from "react"; // Import React
/* css */
import style from "./App.module.css";

function App() {
  const [expenses, setExpenses] = useState([]); // Declare expenses as a state variable
  const [monthlySalary, setMonthlySalary] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  /* utiliti functions */
  function isNumeric(str) {
    return !isNaN(str);
  }
  /* userEffect */
  useEffect(() => {
    let total = 0;
    expenses.forEach((item) => {
      total += Number(item.expense) || 0;
    });
    setTotalExpense(total);
  }, [expenses]); // Add expenses as a dependency for the useEffect

  /* function handlers */
  function handleSalaryChange(event) {
    if (isNumeric(event.target.value)) {
      let total = 0;
      expenses.forEach((item) => {
        total += Number(item.expense) || 0;
      });
      setMonthlySalary(event.target.value);
      setTotalExpense(total);
    } else {
      event.target.value = "";
      alert("Please enter salary in numbers");
    }
  }

  function handleSubmitClick(event) {
    let expenseInput = document.getElementById("expense");
    let expenseDetailInput = document.getElementById("expenseDetail");
    if (isNumeric(expenseInput.value)) {
      if (expenseInput.value && expenseDetailInput.value) {
        const newExpense = {
          expense: expenseInput.value,
          expenseDetail: expenseDetailInput.value,
          id: String(Date.now()),
        };
        // Use the spread operator to create a new array with the updated expense
        setExpenses([...expenses, newExpense]); // asyncronous nature
        expenseInput.value = "";
        expenseDetailInput.value = "";
      } else {
        alert("plz input all fields");
      }
    } else {
      alert("plz enter number in expense");
      expenseInput.value = "";
    }
  }
  
  function handleDeleteButton(event) {
    const newExpense = expenses.filter((item) => {
      if (item.id === event.target.id) {
        return false;
      } else {
        return true;
      }
    });
    setExpenses(newExpense);
  }

  return (
    <div>
      <h1 className={style.textCenter}>BUDGET TRACKER</h1>
      <div className={style.flexSpaceAround}>
        <div>
          <div>
            <input
              placeholder="Enter your monthly salary"
              onChange={handleSalaryChange}
            />
          </div>
          <div>your salary is {monthlySalary}</div>
          <div>your total expense is {totalExpense}</div>
          <div>your budget is {monthlySalary - totalExpense}</div>
        </div>
        <div>
          <div>
            <input id="expense" placeholder="Your expense" />
          </div>
          <div>
            <textarea id="expenseDetail" placeholder="describe your expense" />
          </div>
          <div>
            <button onClick={handleSubmitClick}>SUBMIT</button>
          </div>
          {expenses.map((item) => {
            return (
              <div key={item.id} className={style.expenseContainer}>
                <div className={style.flexSpaceBetween}>
                  <div>Expense: {item.expense}</div>
                  <div>
                    <button id={item.id} onClick={handleDeleteButton}>
                      x
                    </button>
                  </div>
                </div>
                <div>resson: {item.expenseDetail}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
