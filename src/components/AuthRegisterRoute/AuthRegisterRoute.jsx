import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIfRegistered, selectIfLoggedIn } from '../../redux/Auth/selectors';

export const AuthRegisterRoute = ({
  component: Component,
  redirectTo = '/',
}) => {
  const ifRegistered = useSelector(selectIfRegistered);
  const ifLoggedIn = useSelector(selectIfLoggedIn);

  return ifRegistered || ifLoggedIn  ? <Navigate to={redirectTo} /> : Component;

};


