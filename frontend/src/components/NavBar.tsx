import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { logout } from '../store/features/user/userSlice';
import '../styles/NavBar.css';

const NavBar: React.FC = () => {
  const token = useSelector((state: RootState) => state.user.token);
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  console.log("NavBar - token:", token);
  console.log("NavBar - isAdmin:", isAdmin);

  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Voting</Link>
      {isAdmin && <Link to="/statistics" className="nav-link">Statistics</Link>}
      {token ? (
        <button onClick={handleLogout} className="nav-link logout-button">Logout</button>
      ) : (
        <Link to="/login" className="nav-link">Login</Link>
      )}
    </nav>
  );
};

export default NavBar;
