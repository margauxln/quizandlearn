import 'bulma/css/bulma.min.css';
import React from "react";
import LogIn from '../pages/log-in/LogIn';
import SignUp from '../pages/sign-up/SignUp';
import { Routes, Route } from "react-router-dom";
import Explore from '../pages/explore/Explore';
import { AuthProvider } from '../contexts/AuthProvider';
import RequireAuth from '../contexts/RequireAuth';

const App = () => {

  return (
    <AuthProvider>
        <Routes>

            {/* public routes */}
            <Route element={<RequireAuth onlyPublic={true}/>}>
              <Route path="/" element={<LogIn />} />
              <Route path="signup" element={<SignUp />} />
            </Route>

            {/* we want to protect these routes */}
            <Route element={<RequireAuth />}>
              <Route path="/quizzes" element={<Explore />} />
            </Route>

            {/* route qui n'existe pas - redirection page Explore*/}
            <Route path="*" element={<Explore />} />

        </Routes>
    </AuthProvider>
  );
}

export default App;
