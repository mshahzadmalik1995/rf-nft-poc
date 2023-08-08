'use client';
import React, { useEffect, useState } from "react";
import { Table, TableHead, TableRow, TableCell, Typography, TableBody, Button, Box, IconButton, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from 'next/navigation';
import withAuth from "../authentication/page";
import Header from "../header/page";


const styles = makeStyles((theme) => ({
    table: {
        border: "1px solid",
        margin: theme.spacing(1)
    },
    tableHeadRow: {
        fontWeight: "bold",
        marginBottom: "2em",
    }
}));

const ClaimNFT = () => {

    const router = useRouter();
    const classes = styles();
    const [status, setStatus] = useState(null);
    const [users, setUsers] = useState([]);
    const [nftData, setNftData] = useState();
    const [address, setAddress] = useState();

    useEffect(() => {
        const userData = localStorage.getItem("myUserState");
        const parsedUserData = JSON.parse(userData);

        const getNft = async (missionId) => {

            try {
                const response = await fetch(`/api/getnfts?missionId=${missionId}`, {
                    method: "GET",
                    headers: { "Content-type": "application/json" },
                })
                const data = await response.json();
                if (response.status === 200) {
                    setNftData(data.nftData);
                } else {
                    console.log("no data found while fetching nfts!")
                }
            } catch (e) {
                console.error('Error fetching data in fetching nfts :', error);
            }
        }

        const getUserAssociateMissionData = async () => {

            try {

                const response = await fetch(`/api/getuserassociatemission?userId=${parsedUserData._id}`, {
                    method: 'GET',
                    headers: { "Content_Type": "application/json" },

                })
                const data = await response.json()
                if (Object.keys(data.userMission).length != 0 && response.status === 200) {
                    setUsers(data.userMission)
                    setAddress(data.userMission[0].cryptoAddress)
                    getNft(data.userMission[0].missionId)
                }
                else {
                    console.log("no data found while fetching user mission!.")
                }
            } catch (e) {
                console.error('Error fetching data in fetching user mission :', e);
            }
        }
        getUserAssociateMissionData();
    }, [])


    async function handleTransfer(event) {
        event.preventDefault();

        try {
            const response = await fetch(`/api/transfer`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: users[0].userId,
                    missionId: users[0].missionId
                })
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

    const valueChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        users[0].cryptoAddress = value;
        setUsers(users)
        setAddress(value)
    }


    return (
        <div className="flex flex-col flex-wrap gap-2 w-full">
            <Header />
            <div align="center">
                <Box marginTop={1} display="flex" flexDirection="column" alignItems="center">
                    {status === true && <p className="text-green-600">NFT transferred successfully to the user.</p>}
                    {status === false && <p className="text-red-600">Server Error</p>}

                    <Table className={classes.table} variant="outlined">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.tableHeadRow}>NFT Details</TableCell>
                                <TableCell className={classes.tableHeadRow}>Claim NFT</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user._id}>
                                    <TableCell className={classes.tableHeadRow}>
                                        <TableRow className={classes.tableHeadRow}>Mission Name: {user.missionName}</TableRow>
                                        <TableRow className={classes.tableHeadRow}>
                                            Wallet Address : <input type={"text"} disabled={user.isNFTRewarded} value={address} onChange={valueChange}></input>
                                        </TableRow>
                                        <TableRow className={classes.tableHeadRow}>NFT Address : {user.nftAddress}</TableRow>
                                    </TableCell>
                                    <TableCell>
                                        {!user.isNFTRewarded ?
                                            <Button type="submit" color="secondary" onClick={handleTransfer} disabled={user.isNFTRewarded}>
                                                Claim
                                            </Button> : 'Claimed'
                                        }
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </div>
        </div>
    );
};


export default withAuth(ClaimNFT);
