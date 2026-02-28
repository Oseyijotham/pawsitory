import { useDispatch } from 'react-redux';
import { addUser } from '../../redux/Auth/operations';
import css from './Register.module.css';
//import logoImage from '../SharedLayout/call.png';
//import { useAuthHook } from '../../customHook/customHook';
//import { useEffect } from 'react';

export const Register = () => {
const dispatch = useDispatch();
//const { token, user } = useAuthHook();

const handleSubmit = e => {
  e.preventDefault();
  e.target.elements.button.style.boxShadow =
    'inset 0 0 10px 5px rgba(0, 0, 0, 0.3)';
  setTimeout(() => {
    e.target.elements.button.style.boxShadow = 'none';
  }, 1000);
  const form = e.currentTarget;
  dispatch(
    addUser({
      name: form.elements.name.value,
      email: form.elements.email.value,
      password: form.elements.password.value,
    })
  );
  //form.reset();
};

    return (
      <div className={css.login}>
        <div>
          <div className={css.formContainer}>
            <form
              className={css.form}
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <label className={css.label}>
                Username
                <input
                  type="text"
                  name="name"
                  className={css.input}
                  placeholder="Enter a username"
                  title="Enter a username"
                  autoComplete="off"
                  required
                />
              </label>
              <label className={css.label}>
                Email
                <input
                  type="email"
                  name="email"
                  className={css.input}
                  placeholder="Enter an email Address"
                  title="Enter an email Address"
                  autoComplete="off"
                  required
                />
              </label>
              <label className={css.label}>
                Password
                <input
                  type="password"
                  name="password"
                  className={css.input}
                  autoComplete="off"
                  required
                />
              </label>
              <button className={css.inputButton} name="button">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    );
};

export default Register;
