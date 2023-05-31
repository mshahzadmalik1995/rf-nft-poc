"use client";
import React, { useState } from "react";
import bgImage from '../images/image.jpg';
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  paper: {
    // marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "40%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  backgroundImage: {
    backgroundImage: `url(${bgImage.src})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "120vh",
  },
}));

const Register = () => {
  const classes = useStyles();
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [pincode, setPincode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle user registration logic here
  };

  return (
    <Box className={classes.backgroundImage}>
      <Container component="main">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Royal Enfield Register
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="fullname"
              label="Full Name"
              name="fullname"
              autoComplete="Full Name"
              autoFocus
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Id"
              name="email"
              autoComplete="Email id"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="contactNo"
              label="Contact Number"
              name="contactNo"
              autoComplete="Contact Number"
              autoFocus
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="pincode"
              label="Pincode"
              type="pincode"
              id="pincode"
              autoComplete="Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
            <div>
              <Link href="/components/login">
                <h1 style={{ textAlign: "right" }}>
                  Back to Sign in
                </h1>
              </Link>
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Register
            </Button>
          </form>
        </div>
      </Container>
    </Box>
  );
};

export default Register;
