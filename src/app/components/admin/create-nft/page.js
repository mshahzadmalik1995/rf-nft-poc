'use client';
import React, { useState } from "react";
import {
    Grid, TextField, Button, Box, Typography, FormLabel
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AdminHeader from "../admin-header/page";
import { useRouter } from 'next/navigation';
import bgImage from '../../images/image1.jpg'
import withAuth from "../../authentication/page";


const useStyles = makeStyles((theme) => ({
    paper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    form: {
        width: "fit-content",
        margin: theme.spacing(2),
    },
    submit: {
        margin: theme.spacing(3, 2, 2),
        alignItems: "center"
    },
    selectMenu: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        display: 'none',
    },
    root: {
        backgroundColor: 'IndianRed',
        minHeight: '100vh',
        overflow: 'auto',
        backgroundImage: `url(${bgImage.src})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    },
    formControl: {
        minWidth: '100%',
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    }
}));


const CreateNFTForm = () => {
    const [status, setStatus] = useState(null);
    const classes = useStyles();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const [image, setImage] = useState(null);

    const [data, setData] = useState({
        nftName: "",
        nftDescription: "",
    })

    const handleImageUpload = (e) => {
        const files = e.target.files[0];
        console.log(files)
        setImage(files);
    }

    const valueChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            setIsLoading(true);
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
                setData((prev) => ({ ...prev, title: "", description: "", missionCode: "" }))
                setImage(null);
                console.log('File uploaded successfully.');
            } else {
                setStatus('error');
                console.error('Error uploading file.');
            }
            setIsLoading(false);
        } catch (error) {
            setStatus('error');
            console.log(error);
        }
    }

    const handleCancel = () => {
        setData((prev) => ({ ...prev, title: "", description: "", missionCode: "" }))
        setImage(null);
        router.push("/components/admin/home")
    };

    return (
        <div className={classes.root}>
            <AdminHeader />
            <Box display="flex" justifyContent="center" align="left">
                <form onSubmit={handleSubmit} className={classes.form}>
                    <Typography variant="h4" style={{ color: 'white' }} align="center" gutterBottom>
                        Create NFT
                    </Typography>
                    <FormLabel id="nftName" style={{ color: 'white' }}>Enter the NFT Name*</FormLabel>
                    <TextField
                        name="nftName"
                        value={data.nftName}
                        onChange={valueChange}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        style={{ background: 'white', marginBottom: '16px' }}
                    />

                    <FormLabel id="nftDescription" style={{ color: 'white' }}>Enter the NFT Description*</FormLabel>
                    <TextField
                        name="nftDescription"
                        value={data.nftDescription}
                        onChange={valueChange}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        style={{ background: 'white', marginBottom: '16px' }}
                    />

                    <Grid container direction="column" alignItems="center" style={{ marginTop: '16px' }}>
                        <Grid item>
                            <input
                                accept="image/*"
                                className={classes.input}
                                id="image-upload"
                                type="file"
                                onChange={handleImageUpload}
                            />
                            <label htmlFor="image-upload">
                                <Button variant="contained" color="secondary" component="span">
                                    Upload Image
                                </Button>
                            </label>
                        </Grid>
                        <Grid item style={{ marginTop: '16px' }}>
                            {image && <label style={{ color: 'white' }}>{image.name}</label>}
                        </Grid>
                    </Grid>



                    {status === 'success' && <p className="text-green-600">NFT saved successfully!</p>}
                    {status === 'error' && <p className="text-red-600">There was an error submitting your data. Please try again.</p>}

                    <Grid align="center">
                        <Button type="submit" className={classes.submit} margin="normal" variant="contained" color="primary">
                            Submit
                        </Button>
                        <Button variant="contained" className={classes.submit} margin="normal" color="secondary" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </Grid>

                </form>
            </Box>
        </div>
    );
};

export default withAuth(CreateNFTForm);
