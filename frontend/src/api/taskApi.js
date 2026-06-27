import axios from 'axios';

// Dynamically points to your deployed backend server or local fallback
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const API = axios.create({ 
  baseURL: BASE_URL 
});

export const fetchTasks = () => API.get('/tasks');
export const createTask = (taskData) => API.post('/tasks', taskData);
export const updateTask = (id, updatedData) => API.put(`/tasks/${id}`, updatedData);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);