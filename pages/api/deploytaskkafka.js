import multer from 'multer';
import { exec } from 'child_process';
import KafkaConfig from "../../src/utils/config";
const {
    storeTokenUriMetadata,
    storeImageInPinata,
  } = require("../../src/utils/singleImageUploadToPinata");

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

/*export const config = {
    api: {
      bodyParser: false,
    },
  };*/

  export default async function uploadImageAndDeployKafka(req, res) {
    
    
        // File upload successful
        try 
        {
          //  console.log(req.file)
           // const {originalname, destination, filename} = req.file;
          // console.log(req);
        //  console.log(req.body)
          //const body = await req.json();
         //  console.log(body)
           // const {nftName, nftDescription} = req.body;
          // const message = JSON.stringify(req.body);
           const {message} = req.body;
            console.log(message)
            const kafkaConfig = new KafkaConfig();
            const messages = [
              { key: "key1", value: message },
            ];
            kafkaConfig.produce("my-topic", messages);
           // const nftImagePath = destination.concat("/",filename);
            //let nftImagePathWithSlice = nftImagePath.slice(8);
            //const nftImagePathWithSlice = nftImagePath.slice(8);
           // console.log("originalname", originalname)
           // const tokenUris = await handleTokenUris(nftImagePath, originalname);
           //const commandExecute = `yarn hardhat run --network ${network} scripts/deploy.js`
            //const commandExecute = `yarn hardhat deployContract --network ${networkConnect} ${nftName} ${nftDescription} ${originalname} ${nftImagePathWithSlice}`
           // const commandExecute = `yarn hardhat deployContract --network ${networkConnect}  ${nftName} ${nftDescription} ${originalname} ${nftImagePath}`
           /* console.log("commandExecute", commandExecute);
            exec(commandExecute, (error, stdout, stderr) => {
                if (error) {
                  console.error(`Error executing command: ${error}`);
                  return;
                }
                console.log(`Command output: ${stdout}`);
              });*/
            res.status(200).json("data saved successfully")
        } catch (e) {
        return res.status(500).json(`Server error while user saving ${e}`);
        }
}

  /*export default async function uploadImageAndDeploy(req, res) {
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
            const {nftName, nftDescription, networkConnect} = req.body;
            const nftImagePath = destination.concat("/",filename);
            //let nftImagePathWithSlice = nftImagePath.slice(8);
            const nftImagePathWithSlice = nftImagePath.slice(8);
            console.log("originalname", originalname)
           // const tokenUris = await handleTokenUris(nftImagePath, originalname);
           //const commandExecute = `yarn hardhat run --network ${network} scripts/deploy.js`
            //const commandExecute = `yarn hardhat deployContract --network ${networkConnect} ${nftName} ${nftDescription} ${originalname} ${nftImagePathWithSlice}`
            const commandExecute = `yarn hardhat deployContract --network ${networkConnect}  ${nftName} ${nftDescription} ${originalname} ${nftImagePath}`
            console.log("commandExecute", commandExecute);
            exec(commandExecute, (error, stdout, stderr) => {
                if (error) {
                  console.error(`Error executing command: ${error}`);
                  return;
                }
                console.log(`Command output: ${stdout}`);
              });
            res.status(200).json("data saved successfully")
        } catch (e) {
        return res.status(500).json(`Server error while user saving ${e}`);
        }

      });
}
*/

  
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
  