import { useMemo } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import BudgetCard from './components/BudgetCard';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Visualizer from './components/Visualizer';
import './App.css';

interface Expense {
  id: string;
  name: string;
  amount: number;
  date: string;
}

function App() {
  const [budget, setBudget] = useLocalStorage<number>('budget', 2000);
  const [expenses, setExpenses] = useLocalStorage<Expense[]>('expenses', []);

  // Calculate total expenses
  const totalExpenses = useMemo(() => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  }, [expenses]);

  const addExpense = (expense: Expense) => {
    setExpenses((prevExpenses) => [expense, ...prevExpenses]);
  };

  const deleteExpense = (id: string) => {
    setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
  };

  return (
    <div className="app-container">
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', background: 'linear-gradient(to right, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>
          Personal Budget Tracker
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>Take control of your finances</p>
      </header>

      <div className="dashboard-grid">
        <div className="main-stats">
          <BudgetCard
            budget={budget}
            setBudget={setBudget}
            totalExpenses={totalExpenses}
          />
          <Visualizer
            budget={budget}
            totalExpenses={totalExpenses}
          />
          <ExpenseForm addExpense={addExpense} />
        </div>

        <div className="expense-list-section">
          <ExpenseList expenses={expenses} deleteExpense={deleteExpense} />
        </div>
      </div>
    </div>
  );
}

export default App;
