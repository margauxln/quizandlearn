import 'bulma/css/bulma.min.css';
import React from "react";
import LogIn from '../pages/LogIn/LogIn';
import SignUp from '../pages/SignUp/SignUp';
import { Routes, Route } from "react-router-dom";
import Explore from '../pages/Explore/Explore';
import { AuthProvider } from '../context/AuthProvider';
import RequireAuth from '../context/RequireAuth';

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
