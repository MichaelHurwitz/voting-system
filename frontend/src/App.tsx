// src/App.tsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import CandidatesList from './components/CandidatesList';
import PrivateRoute from './components/PrivateRoute';
import NavBar from './components/NavBar';
import Statistics from './components/Statistics';
import { useDispatch } from 'react-redux';
import { setUserFromLocalStorage } from './store/features/user/userSlice';
import { AppDispatch } from './store/store';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setUserFromLocalStorage()); 
  }, [dispatch]);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <PrivateRoute>
            <CandidatesList />
          </PrivateRoute>
        } />
        <Route path="/statistics" element={
          <PrivateRoute adminOnly={true}>
            <Statistics />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
};

export default App;
