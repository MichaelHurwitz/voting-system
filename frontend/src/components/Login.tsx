import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { loginUser } from '../store/features/user/userSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Login.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const authStatus = useSelector((state: RootState) => state.user.status);
  const error = useSelector((state: RootState) => state.user.error);

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resultAction = await dispatch(loginUser({ username, password }));

    if (loginUser.fulfilled.match(resultAction)) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="login-container">
      <h2 className='login-title'>Login</h2>
      <form className='login-form' onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" disabled={authStatus === 'loading'}>
          {authStatus === 'loading' ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {error && <p className='error-message'>{error}</p>}
    </div>
  );
};

export default Login;
