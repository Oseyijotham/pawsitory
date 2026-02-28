import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIfLoggedIn } from '../../redux/Auth/selectors';

export const AuthLoginRoute = ({ component: Component, redirectTo = '/' }) => {
  const ifLoggedIn = useSelector(selectIfLoggedIn);

  return ifLoggedIn ? <Navigate to={redirectTo} /> : Component;
};


