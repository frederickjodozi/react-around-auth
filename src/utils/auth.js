export const BASE_URL = 'http://localhost:3000';

export const getResponseData = (res) => {
  if (!res.ok) {
    return Promise.reject(res);
  }
  return res.json();
};

export const register = (email, password) => fetch(`${BASE_URL}/signup`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email, password }),
})
  .then((res) => getResponseData(res));

export const login = (email, password) => fetch(`${BASE_URL}/login`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email, password }),
})
  .then((res) => getResponseData(res))
  .then((data) => {
    localStorage.setItem('jwt', data.jwt);
    localStorage.setItem('email', email);
    return data;
  });

export const checkToken = (token) => fetch(`${BASE_URL}/users/me`, {
  headers: {
    Accept: 'application/json',
    authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
})
  .then((res) => getResponseData(res));
