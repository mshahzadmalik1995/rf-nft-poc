"use client";
import React, { useState } from "react";
import bgImage from '../images/image1.jpg'
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
    FormLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({

    paper: {
        //marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: '15%',
    },
    form: {
        width: "fit-content",
        margin: theme.spacing(10, 0, 0),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    backgroundImage: {
        backgroundImage: `url(${bgImage.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
    },
}));

const Login = () => {
    const classes = useStyles();
    const [status, setStatus] = useState(null);
    const { userUpdateValue } = useContext(MyContext);

    const [userData, setUserData] = useState({
        username: "",
        password: ""
    })
    const router = useRouter();

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        setUserData((prevData) => ({ ...prevData, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/getuser?username=${userData.username}&password=${userData.password}`, {
                method: 'GET',
                headers: { "Content_Type": "application/json" },
            })
            const data = await response.json()
            //console.log(response)
            if (response.status === 200) {
                setStatus('success')
                userUpdateValue(data.user)
                localStorage.setItem('isAuthenticated', true);
                if (data.user.isShowReward !== null && data.user.isShowReward === true) {
                    router.push("/components/reward")
                }
                else if (data.user.role == 'Admin') {
                    router.push("/components/admin/home")
                } else {
                    router.push("/components/home")
                }
            } else {
                setStatus('error')
            }
        } catch (e) {
            console.log(e)
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
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <FormLabel id="username" style={{ color: 'white' }}>Username*</FormLabel>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            style={{ background: 'white', marginBottom: '16px' }}
                            value={userData.username}
                            onChange={handleChange}
                        />
                        <FormLabel id="password" style={{ color: 'white' }}>Password*</FormLabel>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            type="password"
                            id="password"
                            style={{ background: 'white', marginBottom: '16px' }}
                            autoComplete="current-password"
                            value={userData.password}
                            onChange={handleChange}
                        />

                        <div>
                            <Link href="/components/register" style={{ color: 'white' }}>
                                Register user
                            </Link>
                            <Link href="/" style={{ float: "right", color: 'white' }}>
                                Forgot password?
                            </Link>
                        </div>
                        {status === 'error' && <p className="text-red-600">Wrong credential, try again.</p>}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            style={{ backgroundColor: 'red' }}
                            className={classes.submit}
                        >
                            Login
                        </Button>
                    </form>
                </div>
            </Container >
        </Box >
    );
};

export default Login;
