"use client";
import Container from '@mui/material/Container';
import React, { useState } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import CustomAppBar from '../components/ResponsiveAppBarToDo.js'; // Import the AppBar component

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [points, setPoints] = useState(0);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };
  const removeTask = (index) => {
    setPoints(points + 100);
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
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
    <div style={backgroundStyle}> {}
    <Container component="main"  maxWidth="xs" style={{ marginTop: '10px' }}>
    <p>Points: {points}</p> {/* Display points */}
      <h1>To Do List</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} removeTask={removeTask} />
    </Container>
    </div>
    </div>
  );
};

export default Home;
