import React from 'react';

interface VisualizerProps {
    budget: number;
    totalExpenses: number;
}

const Visualizer: React.FC<VisualizerProps> = ({ budget, totalExpenses }) => {
    const percentage = Math.min((totalExpenses / budget) * 100, 100);

    let color = 'var(--primary-color)';
    if (percentage > 50) color = 'var(--accent-color)';
    if (percentage > 80) color = 'var(--danger-color)';

    const remaining = budget - totalExpenses;

    const widthStr = isNaN(percentage) ? '0%' : `${percentage}%`;

    return (
        <div className="card">
            <h3 style={{ marginTop: 0 }}>Spending Overview</h3>

            <div style={{ height: '24px', width: '100%', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', overflow: 'hidden', marginBottom: '1rem' }}>
                <div
                    style={{
                        height: '100%',
                        width: widthStr,
                        backgroundColor: color,
                        transition: 'width 0.5s ease-in-out, background-color 0.5s',
                        boxShadow: `0 0 10px ${color}`
                    }}
                />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <span>Spent: {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalExpenses)}</span>
                <span>{percentage.toFixed(1)}% Used</span>
            </div>
        </div>
    );
};

export default Visualizer;
