'use client';
import React, { useState } from "react";
import {
    Box, Grid, TextField, Button, Container,
    CssBaseline, Typography, IconButton
} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { makeStyles } from "@material-ui/core/styles";
import AdminHeader from "../admin-header/page";
import { useRouter } from 'next/navigation';

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
}));


const AddMissionForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tasks, setTasks] = useState([]);
    const [missionCode, setMissionCode] = useState("");
    const classes = useStyles();
    const router = useRouter();
    const [status, setStatus] = useState(null);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleMissionCodeChange = (e) => {

        setMissionCode(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleTaskAdd = (e) => {
        const taskField = document.getElementById("add-task-field");
        const taskValue = taskField.value;

        if (taskValue !== "") {
            setTasks([...tasks, taskValue]);
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
            const response = await fetch('/api/savemission', {
                method: 'POST',
                headers: { "Content_Type": "application/json" },
                body: JSON.stringify({
                    missionName: title,
                    missionCode: missionCode,
                    missionDescription: description,
                    missionCheckList: tasks,
                    isValid: true
                })
            })
            if (response.status === 200) {
                handleCancel()
                setStatus('success')
                router.push("/components/admin/home")
            } else {
                setStatus('error')
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleCancel = () => {
        setTitle("");
        setMissionCode("");
        setDescription("");
        setTasks([]);
        router.push("/components/admin/home")
    };



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
                            value={missionCode}
                            onChange={handleMissionCodeChange}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Title"
                            value={title}
                            onChange={handleTitleChange}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Description"
                            value={description}
                            onChange={handleDescriptionChange}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            multiline
                            minRows={4}
                            inputProps={{ maxLength: 100 }}
                        />
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
                                            {task}
                                            <IconButton onClick={() => handleTaskDelete(index)}>
                                                <HighlightOffIcon />
                                            </IconButton>
                                        </li>
                                    ))}
                                </ul>
                            </Grid>
                        </Grid>

                        {status === 'success' && <p className="text-green-600">Mission saved successfully!</p>}
                        {status === 'error' && <p className="text-red-600">There was an error submitting your data. Please try again.</p>}

                        <Button type="submit" className={classes.submit} margin="normal" variant="contained" color="primary">
                            Submit
                        </Button>
                        <Button variant="contained" className={classes.submit} margin="normal" color="secondary" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </form>
                </Box>
            </div>
        </div>
    );
};

export default AddMissionForm;
