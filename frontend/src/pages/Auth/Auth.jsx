import React, { useEffect, useState } from "react";
import "./Auth.css";
import Logo from "../../img/tiger-logo.jpg";
import { logIn, signUp } from "../../actions/AuthActions.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Card,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";
// import { motion } from 'framer-motion';
import { useTheme } from "@mui/material";

const Auth = () => {
  const initialState = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: "",
  };
  const theme = useTheme();
  const loading = useSelector((state) => state.authReducer.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);

  const [data, setData] = useState(initialState);

  const [confirmPass, setConfirmPass] = useState(true);
  const error = useSelector((state) => state.authReducer.errorMessage);
  const [errorMsg, setErrorMsg] = useState();
  useEffect(() => {
    if (isSignUp) {
      error &&
        error.response &&
        error.response.data &&
        error.response.data.message &&
        setErrorMsg(error.response.data.message);
    } else {
      error &&
        error.response &&
        error.response.data &&
        setErrorMsg(error.response.data);
    }
  }, [error, isSignUp]);

  // const dispatch = useDispatch()

  // Reset Form
  const resetForm = () => {
    setData(initialState);
    setConfirmPass(confirmPass);
  };

  // handle Change in input
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Form Submission
  const handleSubmit = (e) => {
    setConfirmPass(true);
    e.preventDefault();
    if (isSignUp) {
      data.password === data.confirmpass
        ? dispatch(signUp(data, navigate))
        : setConfirmPass(false);
    } else {
      dispatch(logIn(data, navigate));
    }
  };

  return (
    <Box
      className="Auth"
      sx={{ backgroundColor: theme.palette.background.default }}
    >
      {/* left side */}

      <div className="a-left">
        <img src={Logo} alt="" />

        <div style={{ color: theme.palette.text.primary }}>
          <Typography component="div" variant="h3">
            Gamer's Utopia
          </Typography>
          <Typography component="div" variant="h6">
            A paradise for gamers.
          </Typography>
        </div>
      </div>

      {/* right form side */}

      <Card
        className="auth-card"
        sx={{ display: "flex", borderRadius: "15px", height: "550px" }}
      >
        <CardMedia
          className="auth-image"
          component="img"
          sx={{ width: 250, height: 550 }}
          image="http://localhost:5001/img/sign in/ghost.jpeg"
          alt="Call of Duty"
        />
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>
            {isSignUp ? (
              <Typography component="div" variant="h4">
                Register
              </Typography>
            ) : (
              <Typography component="div" variant="h4">
                Login
              </Typography>
            )}
          </h3>
          {isSignUp && (
            <div>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel htmlFor="my-first">First Name</InputLabel>
                <Input
                  id="my-first"
                  aria-describedby="my-helper-text"
                  name="firstname"
                  value={data.firstname}
                  onChange={handleChange}
                />
                <FormHelperText id="my-helper-text">
                  Enter your firstname
                </FormHelperText>
              </FormControl>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel htmlFor="my-last">Last Name</InputLabel>
                <Input
                  id="my-last"
                  aria-describedby="my-helper-text"
                  name="lastname"
                  value={data.lastname}
                  onChange={handleChange}
                />
                <FormHelperText id="my-helper-text">
                  Enter your lastname
                </FormHelperText>
              </FormControl>
            </div>
          )}

          <div>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel htmlFor="my-user">User Name</InputLabel>
              <Input
                id="my-user"
                aria-describedby="my-helper-text"
                name="username"
                value={data.username}
                onChange={handleChange}
              />
              <FormHelperText id="my-helper-text">
                Enter your username
              </FormHelperText>
            </FormControl>
          </div>
          <div style={{ marginTop: "15px" }}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel htmlFor="my-pass">Password</InputLabel>
              <Input
                id="my-pass"
                aria-describedby="my-helper-text"
                name="password"
                type="password"
                value={data.password}
                onChange={handleChange}
              />
              <FormHelperText id="my-helper-text">
                Enter your password
              </FormHelperText>
            </FormControl>
            {isSignUp && (
              <FormControl sx={{ width: "100%" }}>
                <InputLabel htmlFor="my-conf-pass">Confirm Password</InputLabel>
                <Input
                  id="my-conf-pass"
                  aria-describedby="my-helper-text"
                  name="confirmpass"
                  type="password"
                  onChange={handleChange}
                />
                <FormHelperText id="my-helper-text">
                  Enter your password again
                </FormHelperText>
              </FormControl>
            )}
          </div>

          <span
            style={{
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
              display: confirmPass ? "none" : "block",
            }}
          >
            *Confirm password is not same
          </span>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "35px",
            }}
          >
            <span
              style={{
                fontSize: "12px",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => {
                resetForm();
                setIsSignUp((prev) => !prev);
              }}
            >
              {isSignUp ? (
                <Button variant="outlined">
                  Already have an account? Login
                </Button>
              ) : (
                <Button variant="outlined">
                  Don't have an account? SignUp
                </Button>
              )}
            </span>
            <Button
              variant="contained"
              sx={{ width: "100%" }}
              // className="button infoButton"
              type="Submit"
              disabled={loading}
            >
              {loading ? "Loading..." : isSignUp ? "SignUp" : "Login"}
            </Button>
          </div>
        </form>
        {errorMsg && (
          <div style={{ color: "red", margin: "10px" }}>{errorMsg}</div>
        )}
      </Card>
    </Box>
  );
};

export default Auth;
