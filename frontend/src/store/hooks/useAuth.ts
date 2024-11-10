import { useAppDispatch } from './useAppDispatch'; // ייבוא Custom Hook חדש
import { useSelector } from 'react-redux';
import { loginUser, logout } from '../features/user/userSlice';
import { RootState } from '../store';
import { useEffect } from 'react';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, token, status, error } = useSelector((state: RootState) => state.user);

  const login = (username: string, password: string) => {
    dispatch(loginUser({ username, password }));
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  return { user, token, status, error, login, logout: logoutUser };
};
