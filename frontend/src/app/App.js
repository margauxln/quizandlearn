import 'bulma/css/bulma.min.css';
import React from "react";
import LogIn from '../pages/log-in/LogIn';
import SignUp from '../pages/sign-up/SignUp';
import { Routes, Route } from "react-router-dom";
import Header from '../components/header/Header';
import Explore from '../pages/explore/Explore';
import { GlobalProvider } from '../providers/GlobalProvider';
import Container from '../components/Container/Container';

const App = () => {
  
  return (
    <GlobalProvider>
      <Container>
    <Routes>
        {/* public routes */}
        <Route path="login" element={<LogIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="/quizzes" element={<Explore />} />


        {/*{
            routes.map((route, i) => {
              //On crée autant de routes qu'il y a dans le tableau et on passe l'objet
              return <Route key={i} {...route} />
            })
          }*/}

        {/* we want to protect these routes */}
        <Route path="/quizzes" element={<Explore />} />

    </Routes>
    </Container>
    </GlobalProvider>
  );
}

export default App;
