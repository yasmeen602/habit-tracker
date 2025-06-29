import React from 'react';

const HabitCard = ({ habit, index, setHabits }) => {
  const toggleComplete = () => {
    setHabits(prev =>
      prev.map((h, i) => i === index ? { ...h, completed: !h.completed } : h)
    );
  };

  const deleteHabit = () => {
    setHabits(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={`habit-card ${habit.completed ? 'completed' : ''}`}>
      <span>{habit.title}</span>
      <div>
        <button onClick={toggleComplete}>
          {habit.completed ? 'Undo' : 'Complete'}
        </button>
        <button onClick={deleteHabit}>Delete</button>
      </div>
    </div>
  );
};

export default HabitCard;
