import React, { useState } from 'react';

interface ExpenseFormProps {
    addExpense: (expense: { id: string; name: string; amount: number; date: string }) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ addExpense }) => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !amount) return;

        addExpense({
            id: crypto.randomUUID(),
            name,
            amount: parseFloat(amount),
            date: new Date().toLocaleDateString(),
        });

        setName('');
        setAmount('');
    };

    return (
        <div className="card">
            <h3 style={{ marginTop: 0 }}>Add Expense</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                    <input
                        type="text"
                        placeholder="Expense Name (e.g. Groceries)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        step="0.01"
                        required
                    />
                </div>
                <button type="submit" style={{ width: '100%', marginTop: '0.5rem', borderColor: 'var(--accent-color)' }}>
                    Add Expense
                </button>
            </form>
        </div>
    );
};

export default ExpenseForm;
