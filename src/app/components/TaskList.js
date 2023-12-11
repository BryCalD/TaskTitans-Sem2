// components/TaskList.js
import React from 'react'

const TaskList = ({ tasks, removeTask }) => {
  return (
    <ul>
      {tasks.map((task, index) => (
        <li key={index}>
          {task}
          <button onClick={() => removeTask(index)}>Task Complete!</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
