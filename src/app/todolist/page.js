//todolist page.js
"use client"
import Container from '@mui/material/Container';
import React, { useState, useEffect, useCallback } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import CustomAppBar from '../components/ResponsiveAppBarToDo.js';

// Home page for the To Do List app that contains the TaskForm and TaskList components and handles the state of the tasks and points of the user
const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [points, setPoints] = useState(0);

  const removeTask = useCallback((index) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.filter((_, i) => i !== index);
      return updatedTasks;
    });
  }, []);

  // Function to remove a task from the list when it is marked complete and add points to the user when the task is marked complete
  const completeTask = useCallback((index) => {
    setPoints(points => points + 50); // Add points when task is marked complete
    removeTask(index);
  }, [removeTask]);

  const handleTaskCompletion = (index) => {
    setPoints(points => points + 200); // Double points when task is completed using the timer
    removeTask(index);
  };

  //Function to add a preset 5 minute math task
  const addMathTask = () => {
    addTask('Math', 300);
  };

  //Function to add a preset 10 minute reading task
  const addReadingTask = () => {
    addTask('Reading', 600);
  };

  //Function to add a preset 15 minute writing task
  const addWritingTask = () => {
    addTask('Writing', 900);
  };

  // Function to increment the timer of each task by 1 second and call the handleTaskCompletion function when the timer reaches the time of the task
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTasks(prevTasks => {
        return prevTasks.map(task => {
          if (task.timer < task.time) {
            const newTimer = task.timer + 1; // Increment timer by 1 second
            if (newTimer === task.time) {
              handleTaskCompletion(task.index); // Use the handleTaskCompletion function
            }
            return { ...task, timer: newTimer };
          }
          return task;
        });
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [handleTaskCompletion]);

  const addTask = (task, time) => {
    setTasks(prevTasks => [...prevTasks, { task, time, timer: 0, index: prevTasks.length }]);
  };
  // Styling for the background image
  const backgroundStyle = {
    backgroundImage: `url('/backgroundImage.png')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '98.2vh',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'space-around'
  };

  return (
    <div>
      <CustomAppBar />
      <div style={ backgroundStyle}>
        {/* Styling for the to do list */}
        <Container component="main" maxWidth="xs" style={{ 
          marginTop: '10px',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '50px', 
          padding: '100px',
          paddingleft: '100px',
          paddingRight: '100px',
          backdropFilter: 'blur(10px)',
          border: '3px solid rgba(1, 1, 1, 1)',
        }}>
          
          <h1>To-Do List</h1>
          <p>Points: {points}</p>
          <h3>Custom Task</h3>
          <TaskForm addTask={addTask} />
          <br /><br />
          <button onClick={addMathTask}>Start 5-minute Math Task</button>
          <br /><br />
          <button onClick={addReadingTask}>Start 10-minute Reading Task</button>
          <br /><br />
          <button onClick={addWritingTask}>Start 15-minute Writing Task</button>
        </Container>
        <Container component="main" maxWidth="xs" style={{ 
          marginTop: '10px',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '50px', 
          padding: '100px',
          backdropFilter: 'blur(10px)',
          border: '3px solid rgba(1, 1, 1, 1)',
          }}>
          <h1>Current Tasks</h1>
          {tasks.length > 0 ? (
            <TaskList tasks={tasks} completeTask={completeTask} removeTask={removeTask} />
          ) : (
          <p>Waiting for tasks...</p>
          )}
  </Container>
      </div>
    </div>
  );
};

export default Home;
