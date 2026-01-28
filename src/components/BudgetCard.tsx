import React, { useState } from 'react';

interface BudgetCardProps {
    budget: number;
    setBudget: (value: number) => void;
    totalExpenses: number;
}

const BudgetCard: React.FC<BudgetCardProps> = ({ budget, setBudget, totalExpenses }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tempBudget, setTempBudget] = useState(budget);

    const handleSave = () => {
        setBudget(tempBudget);
        setIsEditing(false);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        }).format(amount);
    };

    const remaining = budget - totalExpenses;
    const isOverBudget = remaining < 0;

    return (
        <div className="card budget-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{ margin: 0 }}>Total Budget</h2>
                <button onClick={() => setIsEditing(!isEditing)} style={{ fontSize: '0.8rem' }}>
                    {isEditing ? 'Cancel' : 'Edit'}
                </button>
            </div>

            {isEditing ? (
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                        type="number"
                        value={tempBudget}
                        onChange={(e) => setTempBudget(Number(e.target.value))}
                        autoFocus
                    />
                    <button onClick={handleSave} style={{ borderColor: 'var(--success-color)', color: 'var(--success-color)' }}>
                        Save
                    </button>
                </div>
            ) : (
                <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                        {formatCurrency(budget)}
                    </div>
                    <div style={{ marginTop: '0.5rem', color: isOverBudget ? 'var(--danger-color)' : 'var(--text-secondary)' }}>
                        Remaining: <strong>{formatCurrency(remaining)}</strong>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BudgetCard;
