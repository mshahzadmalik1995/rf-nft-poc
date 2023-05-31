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
  
  const [status, setStatus] = useState(null);

  const [userData, setUserData] = useState({
    username:"",
    password:"",
    email:"",
    contactNo:"",
    pincode:"",
  })

  function handleChange (e) {
    const name = e.target.name;
    const value = e.target.value;

    setUserData((prevData) => ({...prevData, [name]: value}));
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await fetch('/api/saveuser', {
        method: 'POST',
        headers: {"Content_Type":"application/json"},
        body:JSON.stringify({
          username: userData.username,
          email: userData.email,
          password:userData.password,
          contactNo: userData.contactNo,
          pincode: userData.pincode
        })
      })
      if(response.status === 200){
        setUserData({
          username:"",
          email:"",
          contactNo: "",
          pincode:"",
          password:""
        })
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch(e) {
      console.log(e);
    }
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
              id="username"
              label="Full Name"
              name="username"
              autoComplete="username"
              autoFocus
              value={userData.username}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              label="password"
              name="password"
              autoComplete="Password"
              autoFocus
              value={userData.password}
              onChange={handleChange}
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
              value={userData.email}
              onChange={handleChange}
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
              value={userData.contactNo}
              onChange={handleChange}
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
              value={userData.pincode}
              onChange={handleChange}
            />
            <div>
              <Link href="/components/login">
                <h1 style={{ textAlign: "right" }}>
                  Back to Sign in
                </h1>
              </Link>
            </div>
            
            {status === 'success' && <p className="text-green-600">Data saved successfully!</p>}
            {status === 'error' && <p className="text-red-600">There was an error submitting your data. Please try again.</p>}
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
