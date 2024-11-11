import React, { FC, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { setUserFromLocalStorage } from '../store/features/user/userSlice';

interface PrivateRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children, adminOnly = false }) => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.user.token);
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);
  const location = useLocation();

  useEffect(() => {
    if (!token) {
      dispatch(setUserFromLocalStorage());
    }
  }, [token, dispatch]);

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
