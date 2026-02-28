import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  selectIfLoggedIn,
  selectIfRefreshing,
} from '../../redux/Auth/selectors';

export const SecureRoute = ({ component: Component, redirectTo = '/' }) => {
  const ifLoggedIn = useSelector(selectIfLoggedIn);
  const ifRefreshing = useSelector(selectIfRefreshing);
  const shouldRedirect = !ifLoggedIn && !ifRefreshing;

  return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};


