'use client';

import sampleData from "@/app/data/data";
import { useEffect, useState } from "react";
import MissionCard from "../missioncard";
import Header from "../header/page";
const Dashboard = () => {
    const [data, setData] = useState();

    return (
        <div className="flex flex-col gap-2 relative">
            <Header />
            <div className="mt-10">
                <h1 className="text-black-400 font-bold p-2 text-2xl">Your Missions</h1>
                <div className="flex absolute flex-wrap p-2 gap-2 mt-4">
                    {
                        data && data.map((value, index) => {
                            return <MissionCard props={value} key={index} />
                        })
                    }
                </div>
                <div>
                <h1 className="text-black-400 font-bold p-2 text-2xl">NFT Tokens</h1>
                </div>
            </div>
        </div>
    )
                }

export default Dashboard;