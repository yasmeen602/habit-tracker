import React, { useState } from 'react';

const HabitForm = ({ setHabits }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a habit name.");
      return;
    }

    const newHabit = {
      title: title.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };

    setHabits(prev => [...prev, newHabit]);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="habit-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter a new habit"
        className="p-2 border rounded mr-2"
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Habit
      </button>
    </form>
  );
};

export default HabitForm;
