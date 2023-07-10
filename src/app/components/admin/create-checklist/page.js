'use client';
import React, { useState } from "react";
import {
    Grid, TextField, Button, Box, Typography, FormLabel, IconButton
} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { makeStyles } from "@material-ui/core/styles";
import AdminHeader from "../admin-header/page";
import { useRouter } from 'next/navigation';
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


const CreateNFTForm = () => {
    const [status, setStatus] = useState(null);
    const classes = useStyles();
    const router = useRouter();
    const [tasks, setTasks] = useState([]);
    const [subscription, setSubscription] = useState();


    const [data, setData] = useState({})


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/savechecklist', {
                method: 'POST',
                headers: { "Content_Type": "application/json" },
                body: JSON.stringify({
                    subscription: subscription,
                    tasks: tasks
                })
            })
            if (response.status === 200) {
                setTasks([])
                setSubscription(null)
                setStatus('success')
            } else {
                setStatus('error')
            }
        } catch (e) {
            setStatus('error')
            console.error(`Error while saving the checklist data ${e}`)
        }
    }

    const handleTaskAdd = (e) => {
        const taskField = document.getElementById("add-task-field");
        const newTask = { task: taskField.value };
        if (newTask.task !== "") {
            setTasks((prevTasks) => [...prevTasks, newTask]);
            taskField.value = "";
        }
    };

    const handleTaskDelete = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);
        setTasks(updatedTasks);
    };

    const handleCancel = () => {
        setData({});
        router.push("/components/admin/home")
    };

    const valueChange = (e) => {
        const value = e.target.value;
        setSubscription(value);
    }

    return (
        <div className={classes.root}>
            <AdminHeader />
            <Box display="flex" justifyContent="center" align="left">
                <form onSubmit={handleSubmit} className={classes.form}>
                    <Typography variant="h4" style={{ color: 'white', marginBottom: '32px' }} align="center" gutterBottom>
                        Create Checklist
                    </Typography>

                    <FormLabel id="subscription" style={{ color: 'white' }}>Subscription*</FormLabel>
                    <TextField
                        name="subscription"
                        value={subscription}
                        variant="outlined"
                        fullWidth
                        onChange={valueChange}
                        margin="normal"
                        style={{ background: 'white', marginBottom: '16px' }}
                    />

                    <Grid container spacing={2} alignItems="center" style={{ marginTop: '16px' }}>
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

                    {status === 'success' && <p className="text-green-600">Checklist saved successfully!</p>}
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

export default CreateNFTForm;
