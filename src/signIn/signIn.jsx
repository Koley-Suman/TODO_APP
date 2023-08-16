import { Button, FormControl, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./signIn.scss";
import {
  auth,
  createUserFromAuth,
  signInAuthWithEmailAndPassword,
  signInWithGooglePopup,
} from "../utils/firebase/firebase";
import { getRedirectResult } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const googleSignIn = async () => {
    const { user } = await signInWithGooglePopup();

    navigate("/");
  };

  const defaultFromFilds = {
    email: "",
    password: "",
  };

  const [formFilds, setFormFilds] = useState(defaultFromFilds);

  const { email, password } = formFilds;
  const handelChange = (e) => {
    const { name, value } = e.target;

    setFormFilds({ ...formFilds, [name]: value });
  };
  const resetFormFilds = () => {
    setFormFilds(defaultFromFilds);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await signInAuthWithEmailAndPassword(email, password);
      console.log(user);
      navigate("/");
      resetFormFilds();
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          alert("on user associated with this email");
          break;
        case "auth/wrong-password":
          alert("incorrect password for email");
          break;
        default:
          console.log(error);
          break;
      }
    }
  };
  return (
    <div className="signIn-box">
      <form className="signIn" onSubmit={handelSubmit}>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          type="email"
          name="email"
          onChange={handelChange}
          value={email}
          required
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          onChange={handelChange}
          value={password}
          required
        />
        <div className="buttons">
          <Button variant="contained" type="submit">
            SIGN IN
          </Button>
          <Button variant="contained" onClick={googleSignIn}>
            GOOGLE SIGN IN
          </Button>
        </div>
      </form>
      <span>
        Haven't any account? <Link to="signUp"> SIGN UP</Link>
      </span>
    </div>
  );
};

export default SignIn;
