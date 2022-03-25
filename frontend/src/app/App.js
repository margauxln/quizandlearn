import 'bulma/css/bulma.min.css';
import React from "react";
import LogIn from '../pages/log-in/LogIn';
import SignUp from '../pages/sign-up/SignUp';
import { Routes, Route } from "react-router-dom";
import Header from '../components/header/Header';
import Explore from '../pages/explore/Explore';
import RequireAuth from '../context/RequireAuth';

const App = () => {
  return (
    <Routes>
        {/* public routes */}
        <Route path="login" element={<LogIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="/quizzes" element={<Explore />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth />}>
          <Route path="/quizzes" element={<Explore />} />
        </Route>
    </Routes>
  );
}

export default App;
