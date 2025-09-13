const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.MODE === 'environment' 
    ? 'https://career-connect-job-portal.onrender.com' 
    : 'http://localhost:4000');

export default API_BASE_URL ;