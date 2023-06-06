'use client';

import sampleData from "@/app/data/data";
import { useState } from "react";
import Header from "../header/page";
import { useRouter } from 'next/navigation';

import {
    Button,
  } from "@material-ui/core";
const Reward = () => {
    const [data, setData] = useState(sampleData);
    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            router.push("/components/dashboard")
            } 
     catch(e) {
       console.log(e);
     }
      };
    
    return (
        <div className="flex flex-col gap-2 relative">
            <Header />
            <div className="mt-10">
                <div align="center">
                    {
                        <img src="/nft_sample.jpg" alt="NFT_Img" className="w-40 h-30 rounded-lg"/>
                    }
                </div>
                <div align="center">
                        <label font-color="red">
                            <br></br>
                            <br></br>
                            <b>Congratulations</b>
                            <br></br>
                            </label>
                </div>
                <div align="center" >
                    <label>
                            <br></br>
                            Mission Complete
                            <br></br>
                            </label>
                            </div>
                <div align="center" color="red">
                    <label>
                            <br></br>
                            How to trade NFT Token
                            <br></br>
                            </label>
                            </div>
                <div align="center">
                    <label>
                            You can trade this token or redeem it for discounts on apparels on the Royal Enfield Store
                        </label>
                </div>
                <br></br>
                <br></br>
                <div align="center">
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onclick={handleSubmit}
                    >
                    My Dashboard
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Reward;