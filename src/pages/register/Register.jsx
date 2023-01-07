import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik'
import styles from './Register.module.css'
import * as Yup from 'yup'
import axios from 'axios'
import { registerApi } from '../../redux/reducers/userReducer'


const Register = () => {
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  // const newUser = useSelector((state) => state.userReducer);
  // const dispatch = useDispatch();
  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Name có từ 3 đến 30 kí tự')
      .max(30, 'Name có từ 3 đến 30 kí tự')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .min(6, 'Password có ít nhất 6 kí tự')
      .required('Required'),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password không khớp')
      .required('Required'),
    phone: Yup.string().matches(phoneRegExp, 'SĐT không hợp lệ')
  });
  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      password: '',
      passwordConfirm: '',
      phone: '',
      gender: 'female'
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      console.log(JSON.stringify(values, null, 2));
      //call api
      try {
        const result = await axios({
          url: 'https://shop.cyberlearn.vn/api/Users/signup',
          method: 'POST',
          data: {
            ...values,
            gender: (values.gender === 'male')
          }
        });

        console.log(result);
        if (result.data.statusCode === 200) {
          alert('Đăng ký tài khoản thành công');
          formik.resetForm();
        }
      } catch (err) {
        console.log(err);
      }
    },
    // onSubmit: (values) => {
    //   dispatch(registerApi(values));
    // },
  });
  return (
    <div className='container' style={{ paddingTop: '7vh' }}>
      <h3>Register</h3>
      <form onSubmit={formik.handleSubmit} >
        <div className='row'>
          <div className='col-6 form-group'>
            <label htmlFor="email" className='form-label'>Email</label>
            <input
              className='form-control'
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <span className={styles.error}>{formik.errors.email}</span>
          </div>
          <div className='col-6 form-group'>
            <label htmlFor="name" className='form-label'>Name</label>
            <input
              className='form-control'
              id="name"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <span className={styles.error}>{formik.errors.name}</span>
          </div>
          <div className='col-6 form-group'>
            <label htmlFor="password" className='form-label'>Password</label>
            <input
              className='form-control'
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <span className={styles.error}>{formik.errors.password}</span>
          </div>
          <div className='col-6 form-group'>
            <label htmlFor="phone" className='form-label'>Phone</label>
            <input
              className='form-control'
              id="phone"
              name="phone"
              type="phone"
              onChange={formik.handleChange}
              value={formik.values.phone}
            />
            <span className={styles.error}>{formik.errors.phone}</span>
          </div>
          <div className='col-6 form-group'>
            <label htmlFor="passwordConfirm" className='form-label'>Password Confirm</label>
            <input
              className='form-control'
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.passwordConfirm}
            />
            <span className={styles.error}>{formik.errors.passwordConfirm}</span>
          </div>
          <div className='col-6 d-flex align-items-end'>
            <label className='align-self-center'>Gender</label>
            <div class="form-check pl-1">
              <input class="form-check-input" type="radio" name="gender" id="male" style={{ marginLeft: 0 }}
                onChange={formik.handleChange} checked={formik.values.gender === 'male'} value={'male'}
              /><br />
              <label class="form-check-label" htmlFor="male">
                Male
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="gender" id="female" style={{ marginLeft: 0 }}
                onChange={formik.handleChange} checked={formik.values.gender === 'female'} value={'female'}
              /><br />
              <label class="form-check-label" htmlFor="female">
                Female
              </label>
            </div>
          </div>
          <div className='col-6'></div>
          <div className='col-6'>
            <button type='submit' className={`btn mt-2 ${styles.btnSubmit}`}
            >Submit</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Register