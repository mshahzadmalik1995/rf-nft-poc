'use client';
import React, { useEffect, useState } from "react";
import { Table, TableHead, TableRow, TableCell, Typography, TableBody, Button, Box, IconButton } from "@material-ui/core";
import AdminHeader from "../admin-header/page";
import { ArrowBack } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from 'next/navigation';
import { AccountCircle } from '@material-ui/icons';


const styles = makeStyles(() => ({
    table: {
        border: "1px solid #ddd",
    },
    tableHeadRow: {
        fontWeight: "bold",
        marginBottom: "2em",
    },
    backButton: {
        position: "absolute",
        color: "red",
        right: 16
    },
    wallet: {
        position: "absolute",
        left: 16
    },
}));

const ViewReport = () => {

    const router = useRouter();
    const classes = styles();
    const [status, setStatus] = useState(null);
    const [walletConnected, setWalletConnected] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUserAssociateMissionData = async () => {
            try {
                const response = await fetch(`/api/getuserassociatemission`, {
                    method: 'GET',
                    headers: { "Content_Type": "application/json" },
                })
                const data = await response.json()

                if (response.status === 200) {
                    console.log(data)

                    for (let i = 0; i < data.userMission.length; i++) {
                        let ctr = 0;
                        for (let j = 0; j < data.userMission[i].missionCheckList.length; j++) {
                            if (data.userMission[i].missionCheckList[j].status) {
                                ctr++;
                            }
                        }
                        data.userMission[i].missionStatus = ctr + " of " + data.userMission[i].missionCheckList.length;
                        console.log(data);
                    }
                    setUsers(data.userMission);

                } else {
                    console.log("no data found while fetching mission!")

                }
            } catch (e) {
                console.error('Error fetching data in fetching mission :', error);
            }
        }
        getUserAssociateMissionData();
    }, [])

    const handleBack = () => {
        router.push("/components/admin/home")
    };

    const handleConnectWallet = () => {
        if (window.ethereum) {
            window.ethereum
                .request({ method: "eth_requestAccounts" })
                .then((accounts) => {
                    setWalletConnected(true);
                    console.log("Wallet connected:", accounts);
                })
                .catch((error) => {
                    console.error("Wallet connection error:", error);
                });
        } else {
            console.error("MetaMask not detected");
        }
    }



    async function handleMint(event) {
        event.preventDefault();

        try {
            const response = await fetch(`/api/deploy`, {
                method: 'GET',
                headers: { "Content_Type": "application/json" },
            })
            const data = await response.json()

            if (response.status === 200) {
                console.log(data)
                setStatus(true);
            } else {
                setStatus(false);
            }
        } catch (e) {
            setStatus(false);
        }
    }



    return (
        <div className="flex flex-col gap-2 relative">
            <AdminHeader />
            <div align="center">
                <Box marginTop={5} display="flex" flexDirection="column" alignItems="center">

                    <IconButton title="Click to connect the wallet" className={classes.wallet} onClick={handleConnectWallet}>
                        <AccountCircle />
                    </IconButton>

                    <Typography variant="h5" gutterBottom>
                        View Report
                    </Typography>
                    {walletConnected === true && <p className="text-green-600">Wallet connected successfully.</p>}
                    {status === true && <p className="text-green-600">NFT rewarded successfully to the eligible customers</p>}
                    {status === false && <p className="text-red-600">Server Error</p>}
                    <br></br>
                    <Button variant="contained" onClick={handleMint} color="primary">
                        Mint All
                    </Button>
                    <IconButton title="Click to go back to home page" className={classes.backButton} onClick={handleBack}>
                        <ArrowBack />
                    </IconButton>
                    <br></br>
                    <Table className={classes.table} variant="outlined">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.tableHeadRow}>Username</TableCell>
                                <TableCell className={classes.tableHeadRow}>Wallet Address</TableCell>
                                <TableCell className={classes.tableHeadRow}>Mission Registered</TableCell>
                                <TableCell className={classes.tableHeadRow}>Checklist Status</TableCell>
                                <TableCell className={classes.tableHeadRow}>Mission Completed</TableCell>
                                {/* <TableCell className={classes.tableHeadRow}>Mint NFT</TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user._id}>
                                    <TableCell>{user.fullName}</TableCell>
                                    <TableCell>{user.cryptoAddress}</TableCell>
                                    <TableCell>{user.missionCode}</TableCell>
                                    <TableCell>{user.missionStatus}</TableCell>
                                    <TableCell>{user.missionCompleted ? "Yes" : "No"}</TableCell>
                                    {/* <TableCell>
                                        <Button disbalevariant="contained" onClick={handleMint} disabled={user.nftRewarded == "Yes" && user.missionStatus == user.missionCheckList.length + " of " + user.missionCheckList.length} color="primary">
                                            Mint
                                        </Button>
                                    </TableCell> */}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </div>
        </div>
    );
};


export default ViewReport;
