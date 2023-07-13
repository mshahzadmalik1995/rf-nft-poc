import multer from 'multer';
const {
    storeTokenUriMetadata,
    storeImageInPinata,
  } = require("../../src/utils/singleImageUploadToPinata");
  
  const hre = require("hardhat");
  const fs = require("fs");

  import { dbConnect } from "@/utils/dbConn";
  import NFT from '@/models/nft'

const storage = multer.diskStorage({
    destination: './public/uploads/nft', // Specify the folder where you want to store the uploaded files
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
      const fileExtension = file.originalname.split('.').pop();
      const filePrefixName = file.originalname.split('.')[0];
      cb(null, `${filePrefixName}-${uniqueSuffix}.${fileExtension}`);
    }
  });


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
  
const upload = multer({ storage });

export const config = {
    api: {
      bodyParser: false,
    },
  };

  export default async function uploadImageAndDeploy(req, res) {
    upload.single('image')(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          return res.status(500).json(err);
        } else if (err) {
          return res.status(500).json(err);
        }
    
        // File upload successful
        try 
        {
          //  console.log(req.file)
            const {originalname, destination, filename} = req.file;
            const {nftName, nftDescription, rarity, tokenCtr} = req.body;
            const nftImagePath = destination.concat("/",filename);
            let nftImagePathWithSlice = nftImagePath.slice(8);
            const tokenUris = await handleTokenUris(nftImagePath, originalname);
            console.log("image uploaded to pinata");
            const Nft1 = await hre.ethers.getContractFactory("GenericNft");
            const nft1 = await Nft1.deploy(tokenUris, nftName, nftDescription);
            await nft1.deployed();

            const nftAddress = nft1.address;
            const nftAbi = JSON.parse(nft1.interface.format("json"));
  
            console.log(`Nft contract deployed to address: ${nft1.address}`);



            const nftData = {
                nftName: nftName,
                nftDescription: nftDescription,
                nftImageName: originalname,
                nftImagePath: nftImagePathWithSlice,
                nftTokenUri: tokenUris,
                missionId: "0",
                isAssociated:false,
                nftAddress: nftAddress,
                nftAbi: nftAbi,
                nftContractName:"GenericNft",
                rarity:rarity,
                tokenCtr:tokenCtr
            }
            await dbConnect();
            await NFT.create(nftData);
            res.status(200).json("data saved successfully")
        } catch (e) {
        return res.status(500).json(`Server error while user saving ${e}`);
        }

      });
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
  