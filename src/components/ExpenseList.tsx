import React from 'react';

interface Expense {
    id: string;
    name: string;
    amount: number;
    date: string;
}

interface ExpenseListProps {
    expenses: Expense[];
    deleteExpense: (id: string) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, deleteExpense }) => {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        }).format(amount);
    };

    if (expenses.length === 0) {
        return (
            <div className="card" style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                No expenses yet. Start spending!
            </div>
        );
    }

    return (
        <div className="card">
            <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>Recent Expenses</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {expenses.map((expense) => (
                    <li
                        key={expense.id}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '1rem 0',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                        }}
                    >
                        <div style={{ textAlign: 'left' }}>
                            <div style={{ fontWeight: '500' }}>{expense.name}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{expense.date}</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ fontWeight: 'bold', color: 'var(--danger-color)' }}>
                                - {formatCurrency(expense.amount)}
                            </span>
                            <button
                                onClick={() => deleteExpense(expense.id)}
                                style={{
                                    padding: '0.4em 0.8em',
                                    fontSize: '0.8rem',
                                    borderColor: 'rgba(239, 68, 68, 0.3)',
                                    color: 'var(--danger-color)',
                                }}
                                aria-label="Delete expense"
                            >
                                ✕
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExpenseList;
