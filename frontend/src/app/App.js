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
      <RequireAuth>
        <Routes>
            {/* public routes */}
            <Route path="login" element={<LogIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="/quizzes" element={<Explore />} />

            {/* we want to protect these routes */}
            <Route path="/quizzes" element={<Explore />} />

        </Routes>
      </RequireAuth>
    </AuthProvider>
  );
}

export default App;
