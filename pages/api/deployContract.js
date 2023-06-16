const {
    storeTokenUriMetadata,
    storeImageInPinata,
  } = require("../../src/utils/singleImageUploadToPinata");
  
  const hre = require("hardhat");
  const fs = require("fs");

  import { dbConnect } from "@/utils/dbConn";
  import User from "@/models/user";
  import NftConfiguration from "@/models/nftconfiguration";
  import { NextResponse } from "next/server";
  import { exec } from 'child_process';
  
  const metadataTemplate = {
    name: "",
    description: "",
    image: "",
    attributes: [
      {
        trait_type: "NFT Reward",
        value: 100,
      },
    ],
  };
  
  export default async function deployContract(req, res) {
    console.log("hi post");
    try {
    //  console.log(req)
      //const body = await req.json();
      const body = await req.body;
      const body2 = JSON.parse(body);
      //console.log(`body2 ${body2}`);
     // console.log(body2.imagePath)
      const imagePath = body2.imagePath;
      const imageName = body2.imageName;
      const filePath = body2.filePath;
      const jsonFilePath = body2.jsonFilePath;
    //  const command = body2.command;
     /* exec('ls -l', (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          res.status(500).end(`Error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`Command execution error: ${stderr}`);
          res.status(500).end(`Command execution error: ${stderr}`);
          return;
        }
        res.status(200).end(stdout);
      });*/
    //  console.log(configuration)
    /*  return NextResponse.json({
          configuration
      }, {
          status: 200
      })*/
      /*const imagePath = "./public/uploads/haircut.png";
      const imageName = "haircut.png";
      const filePath = "./public/uploads/myTokenURIs.json";*/
      //console.log(`body ${body}`)
   //   const body2 = JSON.parse(body);
      //console.log(`body2 ${body2}`);
     // console.log(body2.imagePath)
      /*const imagePath = body2.imagePath;
      const imageName = body2.imageName;
      const filePath = body2.filePath;
      const jsonFilePath = body2.jsonFilePath;
      //console.log(`imagePath ${imagePath} , imageName : ${imageName} , filePath : ${filePath} , jsonFilePath : ${jsonFilePath}`);*/
      const tokenUris = await handleTokenUris(imagePath, imageName);
      console.log("image uploaded to pinata");
  
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
  
      fs.writeFileSync(filePath, JSON.stringify(tokenUris));
      const Nft1 = await hre.ethers.getContractFactory("GenericNft");
      const nft1 = await Nft1.deploy(tokenUris, "First Token", "Token Description");
      await nft1.deployed();
  
      console.log(`Nft contract deployed to address: ${nft1.address}`);
  
      const data1 = {
        address: nft1.address,
        abi: JSON.parse(nft1.interface.format("json")),
      };
  
      //fs.writeFileSync("./pages/genericnft1.json", JSON.stringify(data1));
      fs.writeFileSync(jsonFilePath, JSON.stringify(data1)); 
      return res.status(200).json(`data saved successfully`);
   //  res.status(200).json({configuration: configuration});
    } catch (e) {
      return res.status(500).json(`Server error while user saving ${e}`);
    }
  }
  
  async function handleTokenUris(imagesLocation, imageName) {
    const ipfsResponse = await storeImageInPinata(imagesLocation, imageName);
    let tokenUriMetadata = { ...metadataTemplate };
    tokenUriMetadata.name = imageName;
    tokenUriMetadata.description = `A ${tokenUriMetadata.name} token as a reward for service`;
    tokenUriMetadata.image = `ipfs://${ipfsResponse}`;
    console.log(`Uploading ${tokenUriMetadata.name}...`);
    const metadataUploadResponse = await storeTokenUriMetadata(tokenUriMetadata);
  
    const tokenUris = `ipfs://${metadataUploadResponse.IpfsHash}`;
  
    console.log("Token URIs uploaded! They are:");
    console.log(tokenUris);
  
    return tokenUris;
  }
  