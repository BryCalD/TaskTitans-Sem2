"use client";
import Container from '@mui/material/Container';
import React, { useState } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import CustomAppBar from '../components/ResponsiveAppBarToDo.js'; // Import the AppBar component

const Home = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div>
    <CustomAppBar />
    <Container component="main"  maxWidth="xs" style={{ marginTop: '80px' }}>
      <h1>To Do List</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} removeTask={removeTask} />
    </Container>
    </div>
  );
};

export default Home;
