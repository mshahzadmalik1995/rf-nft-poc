"use client";
import React, { useState } from "react";
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
import { useRouter } from 'next/navigation';

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
    width: "90%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = () => {
  const classes = useStyles();
  const router = useRouter();
  const [status, setStatus] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isCheck, setIsCheck] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    email: "",
    contactNo: "",
    pincode: "",
    role: ""
  })

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setUserData((prevData) => ({ ...prevData, [name]: value }));
  }

  function checkboxChange(e) {
    if (e.target.checked) {
      setIsCheck(current => !current);
      setButtonDisabled(current => !current);
    } else {
      setButtonDisabled(current => !current);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/saveuser', {
        method: 'POST',
        headers: { "Content_Type": "application/json" },
        body: JSON.stringify({
          username: userData.username,
          email: userData.email,
          password: userData.password,
          contactNo: userData.contactNo,
          pincode: userData.pincode,
          role: "User"
        })
      })
      if (response.status === 200) {
        setUserData({
          username: "",
          email: "",
          contactNo: "",
          pincode: "",
          password: "",
          role: ""
        })
        setStatus('success')
        router.push("/")
      } else {
        setStatus('error')
      }
    } catch (e) {
      console.log(e);
    }

  };

  return (
    <Box>
      <img src="/RE1.jpg" alt="Royal enfield" className="w-100 h-30 rounded-lg" />
      <Container component="main">
        <CssBaseline />

        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Royal Enfield Register
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} action={"/components/Home/page.js"}>
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
              label="Password"
              name="password"
              autoComplete="Password"
              type="password"
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
              type="email"
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
              type="number"
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
              type="number"
              id="pincode"
              autoComplete="Pincode"
              value={userData.pincode}
              onChange={handleChange}
            />
            <div>
              <br></br>
              <label>
                <b>Disclaimer:</b> By signing this form/checking this box, you acknowledge and agree that we may use the information you share with us, to communicate with you through e-mails, text messages, WhatsApp and calls, in order to provide our product or service related information and/or for promotional and marketing purposes. All information provided will be secured and processed as per our privacy policy.
              </label>
              <br></br>
              <br></br>
              <input type="checkbox" id="disclaimer" name="disclaimer" value={isCheck} onChange={checkboxChange} />
              <label>    I accept the terms and conditions as well as the privacy policy </label>
            </div>
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
              onclick={handleSubmit}
              disabled={buttonDisabled}
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
