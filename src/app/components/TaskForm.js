// components/TaskForm.js
import React, { useState } from 'react';

const TaskForm = ({ addTask }) => {
  const [task, setTask] = useState('');
  const [timerInput, setTimerInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() !== '') {
      let timerSeconds = 0;
      if (timerInput.trim() !== '') {
        const [minutes, seconds] = timerInput.split(':').map(part => parseInt(part, 10));
        timerSeconds = (minutes * 60) + seconds;
      }
      addTask(task, timerSeconds);
      setTask('');
      setTimerInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <input
        type="text"
        placeholder="Time (format: MM:SS)"
        value={timerInput}
        onChange={(e) => setTimerInput(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
