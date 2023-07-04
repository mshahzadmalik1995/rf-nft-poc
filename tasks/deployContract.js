const {task} = require("hardhat/config");
const {
    storeTokenUriMetadata,
    storeImageInPinata,
  } = require("../src/utils/singleImageUploadToPinata");
  const {dbConnect} = require("../src/utils/dbConn2")
  const {Nft} = require("../src/models/nftrequire")

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

task("deployContract", "Deploys the contract")
  .addPositionalParam("nftName")
  .addPositionalParam("nftDescription")
  .addPositionalParam("originalname")
  .addPositionalParam("nftImagePath")
  .setAction(async (taskArgs) => {
   /* console.log(taskArgs.nftName);
    console.log(taskArgs.nftDescription);
    console.log(taskArgs.originalname);
    console.log(taskArgs.nftImagePath);*/
    const { nftName, nftDescription,originalname, nftImagePath} = taskArgs;
    const tokenUris = await handleTokenUris(nftImagePath, originalname);
    console.log("image uploaded to pinata");
    const Nft1 = await hre.ethers.getContractFactory("GenericNft");
    const nft1 = await Nft1.deploy(tokenUris, nftName, nftDescription);
    //const nft1 = await Nft1.deploy("abc", nftName, nftDescription);
    await nft1.deployed();

   // await contract.deployed();

    console.log("Contract deployed to address:", nft1.address);
     const nftAddress = nft1.address;
    const nftAbi = JSON.parse(nft1.interface.format("json"));

    console.log(`Nft contract deployed to address: ${nft1.address}`);



    const nftData = {
        nftName: nftName,
        nftDescription: nftDescription,
        nftImageName: originalname,
        nftImagePath: nftImagePath,
        nftTokenUri: tokenUris,
        missionId: "0",
        isAssociated:false,
        nftAddress: nftAddress,
        nftAbi: nftAbi,
        nftContractName:"GenericNft"
    }
    await dbConnect();
    await Nft.create(nftData);
  });

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
  
  module.exports = {}