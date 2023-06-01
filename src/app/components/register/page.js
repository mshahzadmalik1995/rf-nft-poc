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
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [pincode, setPincode] = useState("");
  const router = useRouter();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle user registration logic here
    router.push("/components/home")
  };

  return (
    <Box>
      <Container component="main">
        <CssBaseline />
        <img src="/RE1.jpg" alt="Royal enfield" className="w-96 h-50 rounded-lg"/>
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
              <br></br>
              <label>
                <b>Disclaimer:</b> By signing this form/checking this box, you acknowledge and agree that we may use the information you share with us, to communicate with you through e-mails, text messages, WhatsApp and calls, in order to provide our product or service related information and/or for promotional and marketing purposes. All information provided will be secured and processed as per our privacy policy. 
              </label>
              <br></br>
              <br></br>
              <input type="checkbox" id="disclaimer" name="disclaimer"/>
              <label>    I accept the terms and conditions as well as the privacy policy </label> 
            </div>
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
              onclick={handleSubmit}
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
