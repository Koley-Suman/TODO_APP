import { Button, FormControl, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./signUp.scss";
import {
  createAuthUserWithEmailAndPassword,
  createUserFromAuth,
} from "../utils/firebase/firebase";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate = useNavigate();
  const defaultFormFilds = {
    email: "",
    password: "",
    confirmPassword: "",
    displayName: "",
  };
  const [formFilds, setFormFilds] = useState(defaultFormFilds);
  const { email, password, confirmPassword, displayName } = formFilds;

  const handelChange = (e) => {
    const { name, value } = e.target;
    setFormFilds({ ...formFilds, [name]: value });
  };
  const resetFormFilds = () => {
    setFormFilds(defaultFormFilds);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      alert("password doesn't match");
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserFromAuth(user, { displayName });
      await updateProfile(user, {
        displayName: displayName,
      });
      resetFormFilds();
      console.log(user);
      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("user already have an account.");
      } else {
        console.log("user error:", error);
      }
    }
  };
  return (
    <div className="SignUp-box">
      <div className="signUp">
        <form onSubmit={handelSubmit}>
          <TextField
            id="outlined-basic"
            label="Name"
            onChange={handelChange}
            variant="outlined"
            required
            fullWidth
            type="text"
            name="displayName"
            value={displayName}
          />
          <TextField
            id="outlined-basic"
            label="Email"
            onChange={handelChange}
            variant="outlined"
            required
            fullWidth
            type="email"
            name="email"
            value={email}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            onChange={handelChange}
            variant="outlined"
            required
            fullWidth
            type="password"
            name="password"
            value={password}
          />
          <TextField
            id="outlined-basic"
            label="Confirm Password"
            onChange={handelChange}
            variant="outlined"
            required
            fullWidth
            type="password"
            name="confirmPassword"
            value={confirmPassword}
          />
          <Button fullWidth variant="contained" type="submit">
            SIGN UP
          </Button>
        </form>
      </div>
      <span>
        already have an account. <Link to="/auth">SIGN IN</Link>
      </span>
    </div>
  );
};

export default SignUp;
