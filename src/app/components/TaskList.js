// components/TaskList.js
import React from 'react';

const TaskList = ({ tasks, removeTask, completeTask }) => {
  return (
    <ul>
      {tasks.map((task, index) => (
        <div style={{ marginLeft: '-2.5em' }} key={index}>
          <div>
            <p style={{ fontFamily: 'Cascadia Code', color: 'white', fontSize: '1.5em' }}>{task.task}</p>
            {task.timer > 0 && <p style={{ fontFamily: 'Cascadia Code', color: 'white', fontSize: '1em' }}>Time Elapsed: {formatTime(task.timer)}</p>}
          </div>
          <button style={{ color: 'white', backgroundColor: '#1976d2', borderRadius: '5px', blockSize: '3em', fontSize: '1em', marginRight: '1em' }} onClick={() => completeTask(index)}>Mark as Complete</button>
          <button style={{ color: 'white', backgroundColor: '#1976d2', borderRadius: '5px', blockSize: '3em', fontSize: '1em', marginLeft: '1em' }} onClick={() => removeTask(index)}>Remove</button>
        </div>
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
