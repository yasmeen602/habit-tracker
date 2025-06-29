import React from 'react';
import HabitForm from './HabitForm';
import HabitCard from './HabitCard';

const Habits = ({ habits, setHabits }) => {


  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="bg-indigo-800 text-xl font-semibold mb-2">Your Habits</h2>
      <p className="mb-2">Total: {habits.length} | Completed: {habits.filter(h => h.completed).length}</p>
      <HabitForm setHabits={setHabits} />
      <div className="habit-list">
        {habits.map((habit, index) => (
          <HabitCard key={index} habit={habit} index={index} setHabits={setHabits} />
        ))}
      </div>
    </div>
  );
};

export default Habits;
