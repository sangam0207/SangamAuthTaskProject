import React, { useState, useEffect } from 'react';

const TaskForm = ({ onTaskAdded, userId, editingTask }) => {
  const [description, setDescription] = useState('');

  useEffect(() => {
   
    if (editingTask) {
      setDescription(editingTask.description);
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingTask) {
       
        const response = await fetch(`http://localhost:8000/updateTask/${userId}/${editingTask._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ description }),
        });

        if (response.ok) {
          const data = await response.json();
          onTaskAdded(data); 
        } else {
          console.error('Failed to update task');
        }
      } else {
        
        const response = await fetch(`http://localhost:8000/user/task/${userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ description }),
        });

        if (response.ok) {
          const data = await response.json();
          onTaskAdded(data.tasks);
        } else {
          console.error('Failed to add task');
        }
      }

      setDescription('');
    } catch (error) {
      console.error('Error adding/updating task:', error);
    }
  };

  return (
    <div style={taskFormContainerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label htmlFor="description" style={labelStyle}>
          Task Description:
        </label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={inputStyle}
        />
        <button type="submit" style={submitButtonStyle}>
          {editingTask ? 'Update Task' : 'Add Task'}
        </button>
      </form>
    </div>
  );
};

// styling
const taskFormContainerStyle = {
  maxWidth: '400px',
  margin: 'auto',
  padding: '20px',
  backgroundColor: '#f0f0f0',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const labelStyle = {
  marginBottom: '8px',
  fontSize: '16px',
};

const inputStyle = {
  padding: '10px',
  marginBottom: '16px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  width: '100%',
};

const submitButtonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '10px',
  borderRadius: '4px',
  border: 'none',
  cursor: 'pointer',
};

export default TaskForm;
