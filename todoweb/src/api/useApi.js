import axios from 'axios';
import { useAuth } from '../context/authcontext/AuthContext';
import { useMemo } from 'react';

export default function useApi() {
  const { token } = useAuth();

  const instance = useMemo(() => {
    return axios.create({
      baseURL: 'http://localhost:8080/todo',
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    });
  }, [token]);

  return instance;
}
