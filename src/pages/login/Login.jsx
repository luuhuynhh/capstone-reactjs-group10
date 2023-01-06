import React from 'react';
import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { loginApi } from '../../redux/reducers/userReducer';
import { useDispatch } from 'react-redux';

const Login = () => {
  const dispatch = useDispatch();
  const frm = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      email: yup.string().email('Email is invalid'),
    }),
    onSubmit: (values) => {
      console.log(values);
      const actionAsync = loginApi(values);
      dispatch(actionAsync);
    },
  });
  return (
      <div className="container login">
        <h1 className="mt-5 mb-5">Login</h1>
        <hr />
        <form className="w-50 login_form" onSubmit={frm.handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              placeholder="email"
              onChange={frm.handleChange}
              onBlur={frm.handleBlur}
            />
            {frm.errors.email && (
              <p className="text text-danger">{frm.errors.email}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              placeholder="password"
              autoComplete="off"
              onChange={frm.handleChange}
              onBlur={frm.handleBlur}
            />
          </div>
          <div className="form-group">
            <NavLink to="/register" className={'reg_nav'}>
              Register Now?
            </NavLink>
            <button type="submit" className="btn btn-primary login_btn">
              LOGIN
            </button>
          </div>
        </form>
        <div className="social_login">
          <button type="submit" className="btn btn-primary">
            <i className="fa-brands fa-facebook"></i> Continue with Facebook
          </button>
        </div>
      </div>
  );
};

export default Login;
