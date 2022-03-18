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
      <Route path="/" element={<Layout/>}>

        {/* public routes */}
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />

        <Route element={<RequireAuth />}>
          {/* we want to protect these routes */}
          <Route path="/explore" element={<Explore />} />
        </Route>

      </Route>
    </Routes>
  );
}

export default App;
