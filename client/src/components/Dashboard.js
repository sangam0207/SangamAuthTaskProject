import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import { useParams } from 'react-router-dom';
import * as styles from './Style.js'; 
import axios from 'axios';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (id) {
          const response = await fetch(`http://localhost:8000/user/tasks/${id}`);
          if (response.ok) {
            const data = await response.json();
            setTasks(data.tasks);
          } else {
            console.error('Failed to fetch tasks');
          }
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [id]);

  const handleTaskAdded = (newTasks) => {
    setTasks(newTasks);
    setShowTaskForm(false);
    setEditingTask(null); 
  };

  const handleDelete = async (taskId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/deleteTask/${id}/${taskId}`);
      if (response.status === 200) {
        setTasks(response.data);
      } else {
        console.error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEdit = (taskId) => {
    const taskToEdit = tasks.find((task) => task._id === taskId);
    setEditingTask(taskToEdit);
    setShowTaskForm(true);
  };

  return (
    <div style={styles.dashboardStyle}>
      <button style={styles.addTaskButtonStyle} onClick={() => setShowTaskForm(true)}>
        ➕
      </button>
      {showTaskForm && (
        <TaskForm
          onTaskAdded={handleTaskAdded}
          userId={id}
          editingTask={editingTask}
        />
      )}
      <hr />
      <h2 style={styles.pageTitleStyle}>Your Task List</h2>
      <ul style={styles.taskListStyle}>
        {tasks.map((task) => (
          <li key={task._id} style={styles.taskListItemStyle}>
            <span>{task.description}</span>
            <div>
              <button style={styles.editButtonStyle} onClick={() => handleEdit(task._id)}>
                Edit
              </button>
              <button style={styles.deleteButtonStyle} onClick={() => handleDelete(task._id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
