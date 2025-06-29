import React from 'react';

const HabitAnalytics = ({ habits }) => {
  const total = habits.length;
  const completed = habits.filter(h => h.completed).length;
  const pending = total - completed;
  const percentage = total ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="bg-slate-800 p-4 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-2">Analytics</h2>
      <p>Total Habits: <strong>{total}</strong></p>
      <p>Completed: <strong>{completed}</strong></p>
      <p>Pending: <strong>{pending}</strong></p>
      <p>Progress: <strong>{percentage}%</strong></p>
      <div className="w-full bg-gray-200 h-3 mt-2 rounded-full">
        <div
          className="bg-green-500 h-3 rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default HabitAnalytics;
