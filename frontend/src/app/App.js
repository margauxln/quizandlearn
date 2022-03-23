import 'bulma/css/bulma.min.css';
import React from "react";
import SignIn from '../pages/sign-in/SignIn';
import SignUp from '../pages/sign-up/SignUp';
import { Routes, Route } from "react-router-dom";
import Layout from '../components/layout/Layout';
import Explore from '../pages/explore/Explore';
import RequireAuth from '../context/RequireAuth';

const App = () => {
  return (
    <Routes>

        {/* public routes */}
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />

          {/* we want to protect these routes */}
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Layout />}>
            <Route path="/explore" element={<Explore />} />
          </Route>
        </Route>

    </Routes>
  );
}

export default App;
