import { useDispatch } from 'react-redux';
import { logUserIn } from '../../redux/Auth/operations';
import css from './Login.module.css';
//import logoImage from '../SharedLayout/call.png';
import { useSelector } from 'react-redux';
import { selectIfRegistered } from '../../redux/Auth/selectors';

import { NavLink } from 'react-router-dom';

export const Login = () => {
  const dispatch = useDispatch();
  const ifRegistered = useSelector(selectIfRegistered);
  const handleButtonPress = e => {
    e.target.style.boxShadow =
      'inset 0 0 10px 5px rgba(0, 0, 0, 0.3)';
    setTimeout(() => {
      e.target.style.boxShadow = 'none';
    }, 2000);
  }

  const handleSubmit = e => {
    e.preventDefault();
     e.target.elements.button.style.boxShadow = 'inset 0 0 10px 5px rgba(0, 0, 0, 0.3)';
     setTimeout(() => {
     e.target.elements.button.style.boxShadow = 'none';
     }, 2000);
    const form = e.currentTarget;
    dispatch(
      logUserIn({
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    );
    //form.reset();
  };

  return (
    <>
      <div className={css.login}>
        <div>
          <div className={css.formContainer}>
            <form
              className={css.form}
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <label className={css.label}>
                Email
                <input
                  type="email"
                  name="email"
                  className={css.input}
                  required
                />
              </label>
              <label className={css.label}>
                Password
                <input
                  type="password"
                  name="password"
                  className={css.input}
                  required
                />
              </label>
              <button className={css.inputButton} name="button" type="submit">
                Log In
              </button>
              {ifRegistered === false ? (
                <>
                  <span className={css.inputText}>or</span>
                  <div>
                    Don't have an account?{' '}
                    <NavLink
                      className={css.inputLink}
                      to="/register"
                      onClick={handleButtonPress}
                    >
                      Register
                    </NavLink>
                  </div>
                </>
              ) : (
                <>
                  <div className={css.inputTextInfo}>
                    You're Registered, you can login now
                  </div>
                  <div className={css.inputTextInfo}>
                    Enjoy!!!
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
