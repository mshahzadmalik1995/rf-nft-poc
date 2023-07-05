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
  Grid,
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

const Upload = () => {
  const classes = useStyles();
  const router = useRouter();
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState(null);


  const handleImageUpload = async(e) => {
    const files = e.target.files[0];
    console.log(files);
    try{
        const formData = new FormData();
        setIsLoading(true);
        formData.append("image", files);
        const response = await fetch('/api/uploadUserImage', {
            method: 'POST',
            headers: { "Content_Type": "multipart/form-data" },
            body: formData
        });
      
          if (response.ok) {
            setApiStatus('success')
            console.log('Visual uploaded successfully.');
          } else {
            setApiStatus('error');
            console.error('Error uploading file.');
          }
          setIsLoading(false);
    }catch(error) {
        setApiStatus('error');
        console.log(error);
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
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <Typography component="h1" variant="h5" style={{ color: 'red' }}>
            <b>Upload Image</b>
          </Typography>
          <div>
              <br></br>
              <Grid container spacing={10}>
                        <Grid item>
                            <input style={{display: 'none', fontSize: '18px', size:'small'}}
                                accept="image/*"
                                id="image-upload"
                                type="file"
                                onChange={handleImageUpload}
                            />
                            <label htmlFor="image-upload">
                                <Button color="secondary" variant="contained" component="span">
                                  Choose File
                                </Button>
                                </label> 
                                <p>  </p>
                                <br></br>
                              {apiStatus === 'success' && <p className="text-green-600">File uploaded successfully!</p>}
                              {apiStatus === 'error' && <p className="text-red-600">There was an error uploading your image. Please try again.</p>}
                              
                              <br></br>
                              <br></br>
                              <br></br>
                              <Link href="/components/home">
                                <h1 style={{ textAlign: "center", color: "white" }}>
                                  Back to Dashboard
                                </h1>
                              </Link>
                        </Grid>
                </Grid>
              <br></br>
              <br></br>
          </div>
        </div>
      </Container>
    </Box >
  );
};
export default Upload;
