"use client";
import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  FormLabel,
  TextField,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import bgImage from '../images/image1.jpg'


const useStyles = makeStyles((theme) => ({
  paper: {
    // marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "3%"
  },
  form: {
    width: "fit-content",
    margin: theme.spacing(1, 1, 0),
  },
  backgroundImage: {
    backgroundImage: `url(${bgImage.src})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    overflow: "auto",
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
          role: "User",
          isShowReward: false
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
    <Box className={classes.backgroundImage}>
      <Container component="main">
        <CssBaseline />
        <div className={classes.paper}>
          <img
            src="/royalenfield.png"
            alt="company logo"
            style={{ width: '30em' }}
          />
          <Typography component="h1" variant="h5" style={{ color: 'red' }}>
            <b>Register User</b>
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} action={"/components/Home/page.js"}>
            <FormLabel id="username" style={{ color: 'white' }}>Username*</FormLabel>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              name="username"
              style={{ background: 'white', marginBottom: '16px' }}
              autoComplete="username"
              autoFocus
              value={userData.username}
              onChange={handleChange}
            />
            <FormLabel id="password" style={{ color: 'white' }}>Password*</FormLabel>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              style={{ background: 'white', marginBottom: '16px' }}
              autoComplete="Password"
              type="password"
              value={userData.password}
              onChange={handleChange}
            />
            <FormLabel id="email" style={{ color: 'white' }}>Email Id*</FormLabel>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              autoComplete="Email id"
              style={{ background: 'white', marginBottom: '16px' }}
              type="email"
              value={userData.email}
              onChange={handleChange}
            />
            <FormLabel id="contactNo" style={{ color: 'white' }}>Contact Number*</FormLabel>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="contactNo"
              label="Contact Number"
              name="contactNo"
              type="number"
              style={{ background: 'white', marginBottom: '16px' }}
              autoComplete="Contact Number"
              value={userData.contactNo}
              onChange={handleChange}
            />
            <FormLabel id="pincode" style={{ color: 'white' }}>Pincode*</FormLabel>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="pincode"
              label="Pincode"
              type="number"
              id="pincode"
              style={{ background: 'white', marginBottom: '16px' }}
              autoComplete="Pincode"
              value={userData.pincode}
              onChange={handleChange}
            />
            <div>
              <br></br>
              <label style={{ color: 'white' }}>
                <b>Disclaimer:</b> By signing this form/checking this box, you acknowledge and agree that we may use the information you share with us, to communicate with you through e-mails, text messages, WhatsApp and calls, in order to provide our product or service related information and/or for promotional and marketing purposes. All information provided will be secured and processed as per our privacy policy.
              </label>
              <br></br>
              <br></br>
              <input style={{ background: 'white' }} type="checkbox" id="disclaimer" name="disclaimer" value={isCheck} onChange={checkboxChange} />
              <label style={{ color: 'white' }}>    I accept the terms and conditions as well as the privacy policy </label>
            </div>
            <div>
              <Link href="/components/login">
                <h1 style={{ textAlign: "right", color: "white" }}>
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
              color="secondary"
              className={classes.submit}
              onclick={handleSubmit}
              disabled={buttonDisabled}
            >
              Register
            </Button>
          </form>
        </div>
      </Container>
    </Box >
  );
};
export default Register;
