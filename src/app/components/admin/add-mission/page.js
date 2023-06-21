'use client';
import React, { useState, useEffect } from "react";
import {
     Grid, TextField, Button, Container,
    CssBaseline, Typography, IconButton,Box,FormControl, InputLabel, MenuItem, Select
} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { makeStyles } from "@material-ui/core/styles";
import AdminHeader from "../admin-header/page";
import { useRouter } from 'next/navigation';
import NftModal from "./nftModal";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    form: {
        width: "50%",
        marginTop: theme.spacing(4),
    },
    submit: {
        margin: theme.spacing(3, 2, 2),
    },
    selectMenu: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        display: 'none',
      },
}));

const styles = {
    selectMenu: {
      display: 'flex',
      flexDirection: 'column',
    },
  };


const AddMissionForm = () => {
    const [tasks, setTasks] = useState([]);
    const [missionData, setMissionData] = useState({
        title:"",
        description:"",
        missionCode:"",
        nftId:"",
        nftImagePath:""
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
        setMissionData((prev) => ({...prev, [name]:value}));
    }
    

    useEffect(() => {
        const getNft = async() => {

            try{
                const response = await fetch(`/api/getnfts`, {
                    method: "GET",
                    headers: {"Content-type":"application/json"},
                })
                const data = await response.json();
                if(response.status === 200) {
                    setNftData(data.nftData);
                } else {
                    console.log("no data found while fetching nfts!")
                }
            } catch(e) {
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
        try{
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
          
              if (response.status=== 200) {
                setStatus('success')
                handleCancel()
                setStatus('success')
                router.push("/components/admin/home")
                console.log('File uploaded successfully.');
              } else {
                console.error('Error uploading file.');
              }

            }catch(e) {
                setStatus('error')
                console.error(`Error while uploading the mission data ${e}`)
            }
    };

    const handleCancel = () => {
        setMissionData((prev) => ({...prev, title:"", description:"", missionCode:""}))
        setMissionImage(null);
        setTasks([]);
        setMissionImage(null)
        router.push("/components/admin/home")
    };

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
        const nft = nftData.find((obj) => obj._id === event.target.value);
        setMissionData((prev) => ({...prev, nftId: event.target.value, nftImagePath: nft.nftImagePath}));
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
        <div className="flex flex-col gap-2 relative">
            <AdminHeader />
            <div align="center">
                <Box display="flex" justifyContent="center" align="center" height="150vh">
                    <form onSubmit={handleSubmit} className={classes.form}>
                        <Typography variant="h5" align="center" gutterBottom>
                            Add Mission
                        </Typography>
                        <TextField
                            label="Misson Code"
                            name="missionCode"
                            value={missionData.missionCode}
                            onChange={valueChange}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Title"
                            name="title"
                            value={missionData.title}
                            onChange={valueChange}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Description"
                            name="description"
                            value={missionData.description}
                            onChange={valueChange}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            multiline
                            minRows={4}
                            inputProps={{ maxLength: 100 }}
                        />

                     <FormControl fullWidth>
                            <InputLabel id="dropdown-label">Select NFT</InputLabel>
                            <Select
                                labelId="dropdown-label"
                                id="dropdown"
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
                                <TextField
                                    id="add-task-field"
                                    label="Add Checklist"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <IconButton onClick={handleTaskAdd} color="primary">
                                    <AddCircleOutlineIcon />
                                </IconButton>
                            </Grid>
                            <Grid item xs={12} align="left">
                                <ul>
                                    {tasks.map((task, index) => (
                                        <li key={index}>
                                            {task.task}
                                            <IconButton onClick={() => handleTaskDelete(index)}>
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

                        
                        <Button variant="contained" className={classes.submit} margin="normal" color="secondary" onClick={handleOpen}>
                            Upload Nft
                        </Button>

                        <Button type="submit" className={classes.submit} margin="normal" variant="contained" color="primary">
                            Submit
                        </Button>
                        <Button variant="contained" className={classes.submit} margin="normal" color="secondary" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </form>
                </Box>
            </div>
            <NftModal open={open} handleClose={handleClose} />
        </div>
    );
};

export default AddMissionForm;
