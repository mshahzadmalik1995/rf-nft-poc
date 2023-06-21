
import multer from 'multer';
import { dbConnect,parseObjectId } from '@/utils/dbConn';
import Mission from '@/models/mission';
import Nft from '@/models/nft';

const storage = multer.diskStorage({
    destination: './public/uploads/mission', // Specify the folder where you want to store the uploaded files
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

export default async function savemissionupdate(req, res)  {

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
            const {nftId, nftRewardCount, missionName, missionCode, missionDescription, missionCheckList, checkListCount, isValid, nftImagePath} = req.body;
            console.log("missionChecklist", JSON.parse(missionCheckList));
            const missionImagePath = destination.concat("/",filename);
            let missionImagePathTemp = missionImagePath.slice(8);

            const missionData = {
              missionName:missionName,
              missionCode:missionCode,
              missionDescription:missionDescription,
              missionCheckList:JSON.parse(missionCheckList),
              checkListCount:checkListCount,
              nftRewardCount:nftRewardCount,
              nftId:nftId,
              missionImageName:originalname,
              missionImagePath:missionImagePathTemp,
              isValid:isValid,
              nftImagePath:nftImagePath
            }
            await dbConnect();
            const mission = await Mission.create(missionData);
            console.log("mission", mission)
            const nft = await Nft.findByIdAndUpdate({_id:parseObjectId(nftId)}, {missionId: mission._id.toString(), isAssociated:true}, {new:true})
            console.log("nft", nft)
            res.status(200).json("data saved successfully")
        }  catch(e) {
            return res.status(500).json(`Server error while mission saving ${e}`);
    
        }

      });
}