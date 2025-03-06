// src/services/api.js
import axios from 'axios';

// Set your backend API URL here
// For local development use: http://localhost:5001/api
// For production use your Render URL (or other hosting service)
//const API_URL = 'http://localhost:5001/api';
const API_URL = 'https://statutes-api.onrender.com/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Statutes
export const getStatutes = async (params = {}) => {
  try {
    const response = await api.get('/statutes', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching statutes:', error);
    throw error;
  }
};

export const getStatuteById = async (id) => {
  console.log("Fetching statute with ID:", id);
  try {
    const response = await api.get(`/statutes/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching statute ${id}:`, error);
    throw error;
  }
};

// States
export const getStates = async () => {
  try {
    const response = await api.get('/states');
    return response.data;
  } catch (error) {
    console.error('Error fetching states:', error);
    throw error;
  }
};

// Tags
export const getTags = async () => {
  try {
    const response = await api.get('/tags');
    return response.data;
  } catch (error) {
    console.error('Error fetching tags:', error);
    throw error;
  }
};

export const getTagsWithCounts = async () => {
  try {
    const response = await api.get('/tags/with-counts');
    return response.data;
  } catch (error) {
    console.error('Error fetching tags with counts:', error);
    throw error;
  }
};

// Export all the functions
const apiService = {
  getStatutes,
  getStatuteById,
  getStates,
  getTags,
  getTagsWithCounts,
};

export default apiService;