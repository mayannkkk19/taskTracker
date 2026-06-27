import axios from 'axios';

// Points to deployed backend server or local backend server
const BASE_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api` 
  : 'http://localhost:5000/api';

const API = axios.create({ baseURL: BASE_URL });

export const fetchTasks = () => axios.get(API);
export const createTask = (taskData) => axios.post(API, taskData);
export const updateTask = (id, updatedData) => axios.put(`${API}/${id}`, updatedData);
export const deleteTask = (id) => axios.delete(`${API}/${id}`);