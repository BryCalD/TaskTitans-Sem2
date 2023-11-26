// components/TaskList.js
import React from 'react';

const TaskList = ({ tasks, removeTask }) => {
  return (
    <ul>
      {tasks.map((task, index) => (
        <li key={index}>
          {task}
          <button onClick={() => removeTask(index)}>Remove</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
