const API_URL = process.env.REACT_APP_API_URL || 'https://e-commerce-backend-es24.onrender.com/api';

export const fetchAPI = async (endpoint, method = 'GET', body, token) => {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  return res.json();
}; 