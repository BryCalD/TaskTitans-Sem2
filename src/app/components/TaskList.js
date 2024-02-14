// components/TaskList.js
import React from 'react';

const TaskList = ({ tasks, removeTask, completeTask }) => {
  return (
    <ul>
      {tasks.map((task, index) => (
        <li key={index}>
          <div>
            <p>{task.task}</p>
            {task.timer > 0 && <p>Time Left: {formatTime(task.timer)}</p>}
          </div>
          <button onClick={() => completeTask(index)}>Mark as Complete</button>
          <button onClick={() => removeTask(index)}>Remove</button>
        </li>
      ))}
    </ul>
  );
};

// Function to format time in MM:SS format
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

export default TaskList;
