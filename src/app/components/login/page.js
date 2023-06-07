"use client";
import React, { useState } from "react";
import bgImage from '../images/image.jpg'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext } from "react";
import MyContext from "@/app/context/mycontext";

import {
    Avatar,
    Button,
    Box,
    Container,
    CssBaseline,
    TextField,
    Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    paper: {
        //marginTop: theme.spacing(8),
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

const Login = () => {
    const classes = useStyles();
    const [status, setStatus] = useState(null);
    const{userUpdateValue} = useContext(MyContext);
    
    const [userData, setUserData] = useState({
        username: "",
        password: ""
    })
    const router = useRouter();

  function handleChange (e) {
    const name = e.target.name;
    const value = e.target.value;

    setUserData((prevData) => ({...prevData, [name]: value}));
  }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch(`/api/getuser?username=${userData.username}&password=${userData.password}`, {
                method: 'GET',
                headers: {"Content_Type":"application/json"},
            })
            const data = await response.json()
            //console.log(response)
            if(response.status === 200){
                setStatus('success')
                userUpdateValue(data.user)
               router.push("/components/home")
            } else {
                setStatus('error')
            }
        } catch(e) {
            console.log(e)
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
                        Royal Enfield Login
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
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
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={userData.password}
                            onChange={handleChange}
                        />

                        <div>
                            <Link href="/components/register">
                                <h1 style={{ textAlign: "right" }}>
                                    Register User
                                </h1>
                            </Link>
                        </div>
                        {status === 'error' && <p className="text-red-600">Wrong credential, try again.</p>}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                    </form>
                </div>
            </Container >
        </Box >
    );
};

export default Login;
