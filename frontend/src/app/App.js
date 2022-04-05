import 'bulma/css/bulma.min.css';
import React from "react";
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';
import QuizCreation from '../pages/QuizCreation/QuizCreation';
import InviteFriends from '../pages/QuizCreationRefacto/QuizCreationRefacto';
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
              <Route path="/" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Route>

            {/* we want to protect these routes */}
            <Route element={<RequireAuth />}>
              <Route path="/quizzes" element={<Explore />} />
              <Route path="/create-quiz" element={<QuizCreation />} />
              <Route path="/create-quiz-refacto" element={<InviteFriends />} />
            </Route>

            {/* route qui n'existe pas - redirection page Explore*/}
            <Route path="*" element={<Explore />} />

        </Routes>
    </AuthProvider>
  );
}

export default App;
