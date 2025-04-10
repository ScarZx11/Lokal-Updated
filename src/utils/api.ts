import axios from 'axios';

const API_BASE_URL = 'https://testapi.getlokalapp.com/common';

export const fetchJobs = async (page: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/jobs?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};