'use client';

import { useEffect, useState } from "react";
import MissionCard from "../../missioncard";
import AdminHeader from "../admin-header/page";
import { useRouter } from 'next/navigation';
import { makeStyles } from "@material-ui/core/styles";
import bgImage from '../../images/image1.jpg'
import withAuth from "../../authentication/page";

const styles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'IndianRed',
        minHeight: '100vh',
        overflow: 'auto',
        backgroundImage: `url(${bgImage.src})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    },
}));

const Home = () => {
    const [data, setData] = useState();
    const router = useRouter();
    const classes = styles();

    useEffect(() => {
        const getMission = async () => {
            try {

                const response = await fetch(`/api/getmission`, {
                    method: 'GET',
                    headers: { "Content_Type": "application/json" },
                })
                const data = await response.json()
                if (response.status === 200) {
                    setData(data.mission);
                    console.log("inside if block")
                } else {
                    console.log("no data found while fetching mission!")
                }
            } catch (e) {
                console.error('Error fetching data in fetching mission :', error);
            }
        }
        getMission();
    }, [])



    return (
        <div className={classes.root}>
            <AdminHeader />
            <h1 className="text-white font-bold p-2 text-2xl">All Missions</h1>
            <div className="flex relative flex-wrap p-2 gap-2 mt-4">
                {
                    data && data.map((value, index) => {
                        return <MissionCard props={value} key={index} />
                    })
                }
            </div>
        </div>
    )
}

export default withAuth(Home);