'use client';
import React, { useState, useEffect } from "react";
import {
    Grid, TextField, Button, Container,
    CssBaseline, Typography, IconButton, Box, FormControl, InputLabel, MenuItem, Select, FormLabel
} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { makeStyles } from "@material-ui/core/styles";
import AdminHeader from "../admin-header/page";
import { useRouter } from 'next/navigation';
import NftModal from "./nftModal";
import bgImage from '../../images/image1.jpg'


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


const AddMissionForm = () => {
    const [tasks, setTasks] = useState([]);
    const [missionData, setMissionData] = useState({
        title: "",
        description: "",
        missionCode: "",
        nftId: "",
        nftImagePath: ""
    })
    const classes = useStyles();
    const router = useRouter();
    const [status, setStatus] = useState(null);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [nftData, setNftData] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [missionImage, setMissionImage] = useState(null);

    const valueChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setMissionData((prev) => ({ ...prev, [name]: value }));
    }


    useEffect(() => {
        const getNft = async () => {

            try {
                const response = await fetch(`/api/getnfts`, {
                    method: "GET",
                    headers: { "Content-type": "application/json" },
                })
                const data = await response.json();
                if (response.status === 200) {
                    setNftData(data.nftData);
                } else {
                    console.log("no data found while fetching nfts!")
                }
            } catch (e) {
                console.error('Error fetching data in fetching nfts :', error);
            }
        }
        getNft()
    }, [open])

    const handleTaskAdd = (e) => {
        const taskField = document.getElementById("add-task-field");
        const newTask = { id: tasks.length + 1, task: taskField.value, status: false };

        if (newTask.task !== "") {
            setTasks((prevTasks) => [...prevTasks, newTask]);
            console.log(newTask);
            taskField.value = "";
        }
    };

    const handleTaskDelete = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);
        setTasks(updatedTasks);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("image", missionImage);
            formData.append("missionName", missionData.title);
            formData.append("missionCode", missionData.missionCode);
            formData.append("missionDescription", missionData.description);
            formData.append("missionCheckList", JSON.stringify(tasks));
            formData.append("checkListCount", tasks.length);
            formData.append("nftRewardCount", 0);
            formData.append("nftId", missionData.nftId)
            formData.append("isValid", true);
            formData.append("nftImagePath", missionData.nftImagePath)
            const response = await fetch('/api/savemissionupdate', {
                method: 'POST',
                headers: { "Content_Type": "multipart/form-data" },
                body: formData
            });

            console.log(response)

            if (response.status === 200) {
                setStatus('success')
                handleCancel()
                setStatus('success')
                router.push("/components/admin/home")
                console.log('File uploaded successfully.');
            } else {
                console.error('Error uploading file.');
            }

        } catch (e) {
            setStatus('error')
            console.error(`Error while uploading the mission data ${e}`)
        }
    };

    const handleCancel = () => {
        setMissionData((prev) => ({ ...prev, title: "", description: "", missionCode: "" }))
        setMissionImage(null);
        setTasks([]);
        setMissionImage(null)
        router.push("/components/admin/home")
    };

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
        const nft = nftData.find((obj) => obj._id === event.target.value);
        setMissionData((prev) => ({ ...prev, nftId: event.target.value, nftImagePath: nft.nftImagePath }));
        console.log("missionData", missionData)

        console.log(selectedOption)
    };

    const handleImageUpload = (e) => {
        const files = e.target.files[0];
        //console.log(files.name)
        console.log(files)
        setMissionImage(files);
    }

    return (
        <div className={classes.root}>
            <AdminHeader />
            <Box display="flex" justifyContent="center" align="left">
                <form onSubmit={handleSubmit} className={classes.form}>
                    <Typography variant="h4" style={{ color: 'white' }} align="center" gutterBottom>
                        Add Mission
                    </Typography>
                    <FormLabel id="username" style={{ color: 'white' }}>Mission Code*</FormLabel>
                    <TextField
                        name="missionCode"
                        value={missionData.missionCode}
                        onChange={valueChange}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        style={{ background: 'white', marginBottom: '16px' }}
                    />
                    <FormLabel id="username" style={{ color: 'white' }}>Title*</FormLabel>
                    <TextField
                        name="title"
                        value={missionData.title}
                        onChange={valueChange}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        style={{ background: 'white', marginBottom: '16px' }}
                    />
                    <FormLabel id="username" style={{ color: 'white' }}>Description*</FormLabel>
                    <TextField
                        name="description"
                        value={missionData.description}
                        onChange={valueChange}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        style={{ background: 'white', marginBottom: '16px' }}
                        multiline
                        minRows={4}
                        inputProps={{ maxLength: 100 }}
                    />
                    <FormLabel id="username" style={{ color: 'white' }}>Select NFT*</FormLabel>
                    <FormControl className={classes.formControl}>
                        <Select
                            id="dropdown"
                            style={{ background: 'white' }}
                            onChange={handleChange}
                            value={selectedOption}
                        >
                            {nftData ? nftData.map((nft, index) => (
                                <MenuItem key={index} value={nft._id}>
                                    {nft.nftName}
                                </MenuItem>
                            )) : <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            }
                        </Select>
                    </FormControl>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={11}>
                            <FormLabel id="username" style={{ color: 'white' }}>Add Checklist*</FormLabel>

                            <TextField
                                id="add-task-field"
                                style={{ background: 'white', marginBottom: '16px' }}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton onClick={handleTaskAdd} color="secondary" style={{ paddingTop: '50%' }}>
                                <AddCircleOutlineIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs={12} align="left">
                            <ul>
                                {tasks.map((task, index) => (
                                    <li key={index} style={{ color: 'white', fontWeight: 'bold' }}>
                                        {task.task}
                                        <IconButton color="secondary" onClick={() => handleTaskDelete(index)}>
                                            <HighlightOffIcon />
                                        </IconButton>
                                    </li>
                                ))}
                            </ul>
                        </Grid>
                    </Grid>

                    <Grid container direction="column" alignItems="center" spacing={2}>
                        <Grid item>
                            <input
                                accept="image/*"
                                className={classes.input}
                                id="image-upload"
                                type="file"
                                onChange={handleImageUpload}
                            />
                            <label htmlFor="image-upload">
                                <Button variant="contained" color="primary" component="span">
                                    Upload Image
                                </Button>
                            </label>
                        </Grid>
                        <Grid item>
                            {missionImage && <label>{missionImage.name}</label>}
                        </Grid>
                    </Grid>

                    {status === 'success' && <p className="text-green-600">Mission saved successfully!</p>}
                    {status === 'error' && <p className="text-red-600">There was an error submitting your data. Please try again.</p>}

                    <Grid align="center">
                        <Button variant="contained" className={classes.submit} margin="normal" color="secondary" onClick={handleOpen}>
                            Create Nft
                        </Button>

                        <Button type="submit" className={classes.submit} margin="normal" variant="contained" color="primary">
                            Submit
                        </Button>
                        <Button variant="contained" className={classes.submit} margin="normal" color="secondary" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </Grid>
                </form>
            </Box>

            <NftModal open={open} handleClose={handleClose} />
        </div>
    );
};

export default AddMissionForm;
