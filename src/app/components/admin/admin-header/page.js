"use client"
import MyContext from "@/app/context/mycontext";
import { useContext, useEffect, useState } from 'react';
import { AppBar, Snackbar, Toolbar, Button, makeStyles } from '@material-ui/core';
import { useRouter } from 'next/navigation';

const useStyles = makeStyles((theme) => ({
    appBar: {
        backgroundColor: 'indianred'
    },
    navButton: {
        marginLeft: theme.spacing(2),
    },
}));

const AdminHeader = () => {

    var updatedUserLoginData;
    const [userName, setUserName] = useState();
    const classes = useStyles();
    const { userUpdateValue } = useContext(MyContext);
    const router = useRouter();
    const [walletConnected, setWalletConnected] = useState(false);


    useEffect(() => {
        const userLoginData = localStorage.getItem("myUserState");
        updatedUserLoginData = JSON.parse(userLoginData);
        setUserName(updatedUserLoginData.username)
    }, [])

    const handleLogout = () => {
        userUpdateValue(null);
        router.push("/");
        console.log('Logged out');
    };

    const handleViewReport = () => {
        router.push("/components/admin/report")
    };

    const handleConnectWallet = () => {
        if (window.ethereum) {
            window.ethereum
                .request({ method: "eth_requestAccounts" })
                .then((accounts) => {
                    setWalletConnected(true);
                    setTimeout(() => {
                        setWalletConnected(false);
                    }, 5000);
                    console.log("Wallet connected:", accounts);
                })
                .catch((error) => {
                    console.error("Wallet connection error:", error);
                });
        } else {
            console.error("MetaMask not detected");
        }
    };

    const handleTaskAdd = (e) => {
        router.push("/components/admin/add-mission")
    };

    const handleDashboard = () => {
        router.push("/components/admin/home")
    }

    return (
        <div className="flex flex-col flex-wrap">
            <img
                src="/royalenfield.png"
                alt="company logo"
                style={{ width: '23em', alignSelf: 'center', margin: '1em' }}
            />
            <br />
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Button color="inherit" onClick={handleDashboard}>Dashboard</Button>
                    <Button color="inherit" onClick={handleTaskAdd}>Add Mission</Button>
                    <Button color="inherit" onClick={handleViewReport}>View Report</Button>
                    <div style={{ flexGrow: .8 }}></div>
                    <h1 className='font-bold text-white text-center'>Hello {userName}, Welcome to Royal Enfield</h1>
                    <div style={{ flexGrow: 1 }}></div>
                    <Button color="inherit" onClick={handleConnectWallet}>
                        Connect Wallet
                    </Button>
                    <Button color="inherit" onClick={handleLogout} className={classes.navButton}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            <br />
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={walletConnected}
                message="Wallet connected successfully!!"
                autoHideDuration={5000}
                onClose={() => setWalletConnected(false)}
            />
        </div>
    )
}

export default AdminHeader;