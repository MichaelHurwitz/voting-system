import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { logout } from '../store/features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import '../styles/LogoutButton.css'


const LogoutButton: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); 
    navigate('/login'); 
  };

  return (
    <button className='logout-button' onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
