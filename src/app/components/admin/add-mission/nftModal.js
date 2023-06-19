import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField, styled } from '@mui/material';
import { Grid, makeStyles } from '@material-ui/core';
import { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';

const useStyles = makeStyles((theme) => ({
    input: {
      display: 'none',
    },
  }));

const style = {
  position: 'absolute',
  top: '48%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid white',
  boxShadow: 24,
  p: 4,
};

const StyledBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    gap: "2rem"
  });

const NftModal = (props) =>  {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [status, setStatus] = useState(null);
  const classes = useStyles();

  const [image, setImage] = useState(null);

    const [data, setData] = useState({
        nftName:"",
        nftDescription:"",
    })

  const handleImageUploadForModal = (e) => {
    const files = e.target.files[0];
    //console.log(files.name)
    console.log(files)
    setImage(files);
    //setImage(URL.createObjectURL(files))
  }

  const valueChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({...prev, [name]:value}));
}

const closeModal = (e) => {
    e.preventDefault();
    setData((prev) => ({...prev, nftName:"", nftDescription:""}))
    setImage(null);
    setStatus(null)
    props.handleClose();
}

const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        const formData = new FormData();
        formData.append("image", image);
        formData.append("nftName", data.nftName);
        formData.append("nftDescription", data.nftDescription);
        const response = await fetch('/api/uploadImageAnddeploy', {
            method: 'POST',
            headers: { "Content_Type": "multipart/form-data" },
            body: formData
        });
      
          if (response.ok) {
            setStatus('success')
            console.log('File uploaded successfully.');
          } else {
            console.error('Error uploading file.');
          }
    }catch(error) {
        console.log(error);
    }
}

console.log("image", image)

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <StyledBox>
                <Box flex={1} sx={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                    <Typography variant="h4">Upload the NFT!</Typography>
                    <RxCross1 size="2rem" color="black" onClick={closeModal}/>
                </Box>
                <StyledBox>
                <Box flex={1} sx={{display:"flex",
                    flexDirection: "column", gap:"1rem",
                    alignItems:"center"}}>
                    <TextField
                        id="outlined-basic"
                        label="Enter the Nft name"
                        variant="filled"
                        name="nftName"
                        value={data.nftName}
                        onChange={valueChange}
                        fullWidth
                    />
                    <TextField
                    id="outlined-basic"
                    label="Enter the Nft description"
                    variant="filled"
                    name="nftDescription"
                    value={data.nftDescription}
                    onChange={valueChange}
                    fullWidth
                    />

                <Grid container direction="column" alignItems="center" spacing={2}>
                    <Grid item>
                        <input
                        accept="image/*"
                        className={classes.input}
                        id="image-upload-modal"
                        type="file"
                        onChange={handleImageUploadForModal}
                        />
                        <label htmlFor="image-upload-modal">
                        <Button variant="contained" color="primary" component="span">
                            Upload Image
                        </Button>
                        </label>
                    </Grid>
                    <Grid item>
                        {image && <label>{image.name}</label>}
                    </Grid>
                </Grid>

                

                {status === 'success' && <p className="text-green-600">NFT saved successfully!</p>}
                {status === 'error' && <p className="text-red-600">There was an error submitting your data. Please try again.</p>}
            
                <Button
                    sx={{
                        textAlign: "center",
                        background: "#0049fb",
                        width: 300,
                        padding: 1,
                    }}
                    onClick={handleSubmit}
                    >
                    Submit
                    </Button>
                </Box>

                </StyledBox>
            </StyledBox>
        </Box>
      </Modal>
    </div>
  );
}

export default NftModal;