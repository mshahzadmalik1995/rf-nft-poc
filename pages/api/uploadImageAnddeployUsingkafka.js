import multer from 'multer';
const {
    storeTokenUriMetadata,
    storeImageInPinata,
  } = require("../../src/utils/singleImageUploadToPinata");
  import KafkaConfig from "../../src/utils/config";
  
  const hre = require("hardhat");
  const fs = require("fs");

const storage = multer.diskStorage({
    destination: './public/uploads/nft', // Specify the folder where you want to store the uploaded files
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
      const fileExtension = file.originalname.split('.').pop();
      const filePrefixName = file.originalname.split('.')[0];
      cb(null, `${filePrefixName}-${uniqueSuffix}.${fileExtension}`);
    }
  });
  
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
            const {nftName, nftDescription, imageByteArray} = req.body;
            const nftImagePath = destination.concat("/",filename);
            let nftImagePathWithSlice = nftImagePath.slice(8);
            const message = {
                nftName: nftName,
                nftDescription: nftDescription,
                originalname: originalname,
                imageByteArray: imageByteArray,
                nftImagePath:nftImagePathWithSlice
            }
          //  console.log(message);
            const messageValue = JSON.stringify(message);
            const kafkaConfig = new KafkaConfig("cdd", "gdd");
            const messages = [
              { key: "key1", value: messageValue },
            ];
            kafkaConfig.produce("my-topic", messages);
            console.log("hi publish kafka shahzad")
            res.status(200).json("data saved successfully")
        } catch (e) {
        return res.status(500).json(`Server error while user saving ${e}`);
        }

      });
}