//todolist page.js
"use client"
import Container from '@mui/material/Container';
import React, { useState, useEffect, useCallback} from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import CustomAppBar from '../components/ResponsiveAppBarToDo.js';
import Cookies from 'universal-cookie';
import Button from '@mui/material/Button';

// Home page for the To Do List app that contains the TaskForm and TaskList components and handles the state of the tasks and points of the user
const Home = () => {
  const [username, setUsername] = useState('Guest');
  const [tasks, setTasks] = useState([]);
  const [points, setPoints] = useState(''); // Initialize points state with 0
  const cookies = new Cookies();

  useEffect(() => {
    const savedUsername = cookies.get('nick');
    if (savedUsername) {
      setUsername(savedUsername);
    }
  
    const savedPoints = cookies.get('points');
    if (savedPoints) {
      setPoints(parseInt(savedPoints)); // Parse points to ensure it's a number
    }
  }, []);
  
  // Function to remove a task from the list
  const removeTask = useCallback((index) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.filter((_, i) => i !== index);
      return updatedTasks;
    });
  }, []);

  async function runDBCallAsync(url) {
    try {
      const res = await fetch(url);
      const data = await res.json();

      console.log("Response from server:", data);

      if (data.data == true) {
        console.log("Points updated successfully!");

        // Update local state
        cookies.set('points', points, { path: '/' }); // Save points to cookies
      } else {
        console.log("Updating Points Unseccessful");
      }

    } catch (error) {
      console.error("Error fetching data from server:", error);
    }
  }

  const savePoints = async () => {
    const email = cookies.get('username');

    runDBCallAsync(`/api/todolist?email=${email}&newPoints=${points}`);
  };

  // Function to handle task completion
  const completeTask = useCallback((index) => {
    setPoints(points => points + 100); // Add points when task is marked complete
    removeTask(index);
  }, [removeTask, username, points]);

  const handleTaskCompletion = (index) => {
    setPoints(points => points + 100*2); // Double points when task is completed using the timer
    removeTask(index);
    
  };

  //Function to add a preset 4 minute math task
  const addMathTask = () => {
    addTask('Math', 240);
  };

  //Function to add a preset 5 minute reading task
  const addReadingTask = () => {
    addTask('Reading', 300);
  };

  //Function to add a preset 8 minute writing task
  const addWritingTask = () => {
    addTask('Writing', 480);
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
    backgroundImage: `url('/ToDoBG.jpg')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'repeat',
    margin: '-8px',
    height: '100vh',
    length: '100vh',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'left',
    display: 'flex',
    justifyContent: 'space-around'
  };

  return (
    <div>
      <CustomAppBar />
      <div style={ backgroundStyle}>
        {/* Styling for the to do list */}
        <Container component="main" maxWidth="xs" style={{ 
          marginTop: '1px',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '50px', 
          padding: '100px',
          paddingTop: '0px',
          paddingleft: '1em',
          paddingRight: '1em',
          backdropFilter: 'blur(2px)',
          border: '3px solid white',
        }}>
          
          <h1 style={{color: 'white', fontFamily: 'Impact, sans-serif', fontSize: '4em'}}>To-Do List <br/> {username}</h1>
          <hr style={{backgroundColor: 'White', width: '16em', height: '5px', margin: '-10px'}}/>

          <p style={{fontSize: '1.3em', fontFamily: 'Tahoma, sans-serif', color:'white'}}>{username}!! Make sure to save your<br/>Points: </p><p style={{fontFamily:'impact, sans-serif', fontSize:'1em'}}>{points}</p>
          <button onClick={savePoints}>Save Points</button>
          <h3>Custom Task</h3>
          <TaskForm addTask={addTask} />
          <br /><br />
          <button onClick={addMathTask}>Start 4-minute Math Task</button>
          <br /><br />
          <button onClick={addReadingTask}>Start 5-minute Reading Task</button>
          <br /><br />
          <button onClick={addWritingTask}>Start 8-minute Writing Task</button>
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
