import React, { FC } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { Login, SignUp } from 'pages/auth';
import Home from 'pages/home';
import { FormLayout } from '@features/ui';
import Dashboard from 'pages/dashboard';

const App: FC = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />}></Route>
      </Route>
      <Route path="auth">
        <Route path='login' element={
          <FormLayout>
            <Login />
          </FormLayout>
        }></Route>
        <Route path='sign-up' element={
          <FormLayout>
            <SignUp />
          </FormLayout>
        }></Route>
      </Route>
      <Route path='dashboard' element={<Dashboard />}></Route>
      <Route path="*" element={<Navigate to={"/"} replace />} />
    </Routes>
  );
}

export default App;
