import multer from 'multer';

const storage = multer.diskStorage({
    destination: './public/uploads', // Specify the folder where you want to store the uploaded files
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
      const fileExtension = file.originalname.split('.').pop();
      //console.log(file.originalname.split('.')[0])
      const filePrefixName = file.originalname.split('.')[0];
      //cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExtension}`);
      cb(null, `${filePrefixName}-${uniqueSuffix}.${fileExtension}`);
    }
  });

//const upload = multer({ dest: 'public/uploads/' });

const upload = multer({ storage });

export const config = {
    api: {
      bodyParser: false,
    },
  };

export default async function uploadImage(req, res) {
    upload.single('image')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          // Handle Multer errors
          return res.status(500).json(err);
        } else if (err) {
          // Handle other errors
          return res.status(500).json(err);
        }
    
        // File upload successful
        console.log(req.file)
        return res.status(200).send('File uploaded!');
      });
}