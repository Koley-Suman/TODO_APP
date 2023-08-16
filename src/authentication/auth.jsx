import React from "react";
import SignIn from "../signIn/signIn";
import SignUp from "../signup/signUp";
import { Route, Routes } from "react-router-dom";
import "./auth.scss"

const Auth = () => {
  return (
    <div className="auth">
      <Routes>
        <Route index element={<SignIn />} />
        <Route path="/signUP" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default Auth;
