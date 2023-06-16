

const hre = require('hardhat');
const fs = require("fs");
const {storeTokenUriMetadata, storeImageInPinata} = require("../src/utils/singleImageUploadToPinata")

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
}
async function main() {
    /*const imagePath = './images/randomNft/haircut.png';
    const imageName= "haircut.png";
    const filePath= './images/myTokenURIs.json';*/
    const imagePath = './public/uploads/product.png';
    const imageName= "product.png";
    const filePath= './public/uploads/myTokenURIs2.json';
//const connect = await dbConnect();
   // console.log("connect", connect);
    const tokenUris = await handleTokenUris(imagePath, imageName);
    if(fs.existsSync(filePath)){
        fs.unlinkSync(filePath);
    }
    fs.writeFileSync(filePath, JSON.stringify(tokenUris));
    const Nft1 = await hre.ethers.getContractFactory('GenericNft');
    const nft1 = await Nft1.deploy(tokenUris);
    await nft1.deployed();
    console.log(`Nft contract deployed to address: ${nft1.address}`);
    const data1 = {
        address: nft1.address,
        abi: JSON.parse(nft1.interface.format('json'))
    };
    fs.writeFileSync('./src/app/genericnft3.json', JSON.stringify(data1));
}

async function handleTokenUris(imagesLocation, imageName) {
    // tokenUris;
    const ipfsResponse = await storeImageInPinata(imagesLocation, imageName)
        let tokenUriMetadata = { ...metadataTemplate }
        tokenUriMetadata.name = imageName;
        tokenUriMetadata.description = `A ${tokenUriMetadata.name} token as a reward for service`
        tokenUriMetadata.image = `ipfs://${ipfsResponse}`
        console.log(`Uploading ${tokenUriMetadata.name}...`)
        const metadataUploadResponse = await storeTokenUriMetadata(tokenUriMetadata)
       // tokenUris.push(`ipfs://${metadataUploadResponse.IpfsHash}`)
        const tokenUris = `ipfs://${metadataUploadResponse.IpfsHash}`;
        console.log("Token URIs uploaded! They are:")
        console.log(tokenUris)
        return tokenUris
}



main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
