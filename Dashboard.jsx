import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Habits from '../components/Habits';
import HabitAnalytics from '../components/HabitAnalytics';

const Dashboard = ({ user, onLogout }) => {
  const [habits, setHabits] = useState(() => {
    const stored = localStorage.getItem('habits');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  return (
  <div className="min-h-screen bg-gray-100">
      <NavBar user={user} onLogout={onLogout} />
      <div className="p-4 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Analytics section */}
        <div className="col-span-1">
          <HabitAnalytics habits={habits} />
        </div>

        {/* Habits section */}
        <div className="col-span-2">
          <Habits habits={habits} setHabits={setHabits} />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
