//todolist page.js
"use client"
import Container from '@mui/material/Container';
import React, { useState, useEffect, useCallback} from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import CustomAppBar from '../components/ResponsiveAppBarToDo.js';
import Cookies from 'universal-cookie';
import Button from '@mui/material/Button';
import { Avatar } from '@mui/material';

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
    backgroundImage: `url('/BBG.jpg')`,
    backgroundSize: 'cover',
    height: '87.5vh',
    margin: '-8px',
    marginTop: '-3em',
    padding: '5em',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'space-around',
    overflow: 'hidden',
  };

  return (
    <div>
      <CustomAppBar />
      <div style={ backgroundStyle}>
        {/* Styling for the to do list */}
        <Container component="main" maxWidth="xs" style={{ 
          marginTop: '1px',
          backgroundColor: 'rgba(150, 150, 150, 0.3)',
          borderRadius: '50px', 
          paddingTop: '0px',
          paddingleft: '1em',
          paddingBottom: '1em',
          paddingRight: '1em',
          backdropFilter: 'blur(2px)',
          border: '3px solid #1976d2',
        }}>
          <h1 style={{color: 'white', fontFamily: 'Cascadia Mono, sans-serif', fontSize: '3em'}}>Add Tasks</h1>
          <hr style={{backgroundColor: '#1976d2', width: '25.5em', height: '5px', margin: '-10px', border: 'none'}}/>
          <br/>
          <h3 style={{color: 'white', fontFamily: 'Cascadia Code, sans-serif', fontSize: '1.5em'}}>Add a task to your list</h3>
          <p style={{color: 'white', fontFamily: 'Cascadia Code, sans-serif', fontSize: '1em'}}>Create Your Own Task!</p>
          <TaskForm addTask={addTask} />

          <p style={{color: 'white', fontFamily: 'Cascadia Code, sans-serif', fontSize: '1em'}}>Sample Tasks</p>
          <button onClick={addMathTask}>4-minute Maths<Avatar alt="Math" src="/math.png" style={{textalign: 'center'}} /></button>
          <br /><br />
          <button onClick={addReadingTask}>5-minute English<Avatar alt="Reading" src="/book.png" /></button>
          <br /><br />
          <button onClick={addWritingTask}>8-minute Biology<Avatar alt="Bio" src="/sci.png" /></button>
        </Container>
        <Container component="main" maxWidth="xs" style={{ 
          marginTop: '1px',
          backgroundColor: 'rgba(150, 150, 150, 0.3)',
          borderRadius: '50px', 
          paddingTop: '0px',
          paddingleft: '1em',
          paddingBottom: '1em',
          paddingRight: '1em',
          backdropFilter: 'blur(2px)',
          border: '3px solid #1976d2',
        }}>
                    
          <h1 style={{color: 'white', fontFamily: 'Cascadia Mono, sans-serif', fontSize: '3em'}}>{username}'s <br/>Points</h1>
          <hr style={{backgroundColor: '#1976d2', width: '25.5em', height: '5px', margin: '-10px', border: 'none'}}/>

          <p style={{fontSize: '1.3em', fontFamily: 'Cascadia Code, sans-serif', color:'white'}}>{username}! Make sure to save your points! </p><p style={{fontFamily:'impact, sans-serif', fontSize:'2.5em', color: '#1976d2', border:'3px solid #1976d2', backgroundColor: 'white', margin: '1em'}}>{points}</p>
          <button onClick={savePoints} style={{color: 'white', backgroundColor: '#1976d2',borderRadius: '5px', blockSize: '3em', fontSize: '1em' }}>Save Points</button>
        </Container>
        <Container component="main" maxWidth="xs" style={{ 
          marginTop: '1px',
          backgroundColor: 'rgba(150, 150, 150, 0.3)',
          borderRadius: '50px', 
          paddingTop: '0px',
          paddingleft: '1em',
          paddingBottom: '1em',
          paddingRight: '1em',
          backdropFilter: 'blur(2px)',
          border: '3px solid #1976d2',
          }}>
          <h1 style={{color: 'white', fontFamily: 'Cascadia Mono, sans-serif', fontSize: '3em'}}>{username}'s <br/>Current Tasks</h1>
          <hr style={{backgroundColor: '#1976d2', width: '25em', height: '5px', margin: '-10px', border: 'none'}}/>
          {tasks.length > 0 ? (
            <TaskList tasks={tasks} completeTask={completeTask} removeTask={removeTask} />
          ) : (
          <p style={{fontSize: '1.3em', fontFamily: 'Cascadia Code, sans-serif', color:'white'}}>Waiting for tasks...</p>
          )}
  </Container>
      </div>
    </div>
  );
};

export default Home;
