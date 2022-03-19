import 'bulma/css/bulma.min.css';
import React from "react";
import SignIn from '../../_common/component/authentification/sign-in/SignIn';
import SignUp from "../../_common/component/authentification/sign-up/SignUp";
import { Routes, Route } from "react-router-dom";
import Layout from '../../_common/component/layout/Layout';
import Explore from '../../business/explore/component/Explore';
import RequireAuth from '../../_common/component/authentification/require-auth/RequireAuth';

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
