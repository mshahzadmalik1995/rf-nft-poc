'use client';
import React, { useEffect, useState } from "react";
import { Table, TableHead, TableRow, TableCell, Typography, TableBody, Button, Box, IconButton } from "@material-ui/core";
import AdminHeader from "../admin-header/page";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from 'next/navigation';
import bgImage from '../../images/image1.jpg'
import withAuth from "../../authentication/page";


const styles = makeStyles((theme) => ({
    table: {
        border: "1px solid #ddd",
        color: 'white',
        margin: theme.spacing(1)
    },
    tableHeadRow: {
        fontWeight: "bold",
        marginBottom: "2em",
        color: 'white'
    },
    root: {
        backgroundColor: 'IndianRed',
        minHeight: '100vh',
        overflow: 'auto',
        backgroundImage: `url(${bgImage.src})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    },
    mint: {
        margin: theme.spacing(1)
    }
}));

const ViewReport = () => {

    const router = useRouter();
    const classes = styles();
    const [status, setStatus] = useState(null);
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
        <div className={classes.root}>
            <AdminHeader />
            <div align="center">
                <Box marginTop={1} display="flex" flexDirection="column" alignItems="center">
                    <Typography variant="h4" style={{ color: 'white' }} gutterBottom>
                        Mission Status Report
                    </Typography>
                    {status === true && <p className="text-green-600">NFT rewarded successfully to the eligible customers</p>}
                    {status === false && <p className="text-red-600">Server Error</p>}

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
                                    <TableCell className={classes.tableHeadRow}>{user.fullName}</TableCell>
                                    <TableCell className={classes.tableHeadRow}>{user.cryptoAddress}</TableCell>
                                    <TableCell className={classes.tableHeadRow}>{user.missionCode}</TableCell>
                                    <TableCell className={classes.tableHeadRow}>{user.missionStatus}</TableCell>
                                    <TableCell className={classes.tableHeadRow}>{user.missionCompleted ? "Yes" : "No"}</TableCell>
                                    {/* <TableCell>
                                        <Button disbalevariant="contained" onClick={handleMint} disabled={user.nftRewarded == "Yes" && user.missionStatus == user.missionCheckList.length + " of " + user.missionCheckList.length} color="primary">
                                            Mint
                                        </Button>
                                    </TableCell> */}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Button variant="contained" className={classes.mint} onClick={handleMint} color="secondary">
                        Mint All
                    </Button>
                </Box>
            </div>
        </div>
    );
};


export default withAuth(ViewReport);
