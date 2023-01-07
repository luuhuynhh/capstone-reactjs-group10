import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import './assets/scss/style.scss';
import Carts from './pages/carts/Carts';
import Detail from './pages/detail/Detail';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/Profile/Profile';
import Register from './pages/register/Register';
import Search from './pages/search/Search';
import HomeTemplate from './templates/homeTemplate/HomeTemplate';
import UserTemplate from './templates/userTemplate/UserTemplate';
// import Login from './pages/login'
//Cấu hình redux
import { Provider } from 'react-redux';
import { store } from './redux/configStore';
import { createBrowserHistory } from 'history';
//cấu hình history
export const history = createBrowserHistory();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route path="" element={<HomeTemplate />}>
          <Route index element={<Home />}></Route>
          <Route path='home' element={<Home />}></Route>
          <Route path='detail'>
            <Route path=':id' element={<Detail />}></Route>
          </Route>
          <Route path='profile' element={<Profile />}></Route>
          <Route path='login' element={<Login />}></Route>
          <Route path='register' element={<Register />}></Route>
          <Route path='carts' element={<Carts />}></Route>
          <Route path='search' element={<Search />}></Route>
          <Route path='*' element={<p className='container mt-5'>We are developing this page</p>}></Route>
        </Route>

        <Route path='users' element={<UserTemplate />}>
          <Route index element={<Login />}></Route>
          <Route path='register' element={<Register />}></Route>
          {/* Gõ /users/không có link => về lại users */}
          <Route path='*' element={<Navigate to="/users" />}></Route>

        </Route>

      </Routes>
    </HistoryRouter>
  </Provider>
);
