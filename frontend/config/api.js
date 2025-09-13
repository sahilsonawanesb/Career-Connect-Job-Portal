const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.MODE === 'production' 
    ? 'https://career-connect-job-portal.onrender.com' 
    : 'http://localhost:4000');

export { API_BASE_URL };