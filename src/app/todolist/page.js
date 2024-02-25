"use client"
import Container from '@mui/material/Container';
import React, { useState, useEffect, useCallback } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import CustomAppBar from '../components/ResponsiveAppBarToDo.js';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [points, setPoints] = useState(0);

  const removeTask = useCallback((index) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.filter((_, i) => i !== index);
      return updatedTasks;
    });
  }, []);

  const completeTask = useCallback((index) => {
    setPoints(points => points + 200); // Add points when task is marked complete
    removeTask(index);
  }, [removeTask]);

  const handleTaskCompletion = (index) => {
    setPoints(points => points + 200); // Double points when task is completed using the timer
    removeTask(index);
  };

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

  const backgroundStyle = {
    backgroundImage: `url('/backgroundImage.png')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '98.2vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  };

  return (
    <div>
      <CustomAppBar />
      <div style={backgroundStyle}>
        <Container component="main" maxWidth="xs" style={{ marginTop: '10px' }}>
          <p>Points: {points}</p>
          <h1>To Do List</h1>
          <TaskForm addTask={addTask} />
          <TaskList tasks={tasks} completeTask={completeTask} removeTask={removeTask} />
        </Container>
      </div>
    </div>
  );
};

export default Home;
