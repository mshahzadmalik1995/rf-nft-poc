"use client";
import React, {useEffect,  useState } from "react";
import MyContext from "@/app/context/mycontext";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  FormLabel,
  TextField,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  maxWidth
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import bgImage from '../images/image1.jpg';
import homePage from '../home/page.js'


const useStyles = makeStyles((theme) => ({
  paper: {
    // marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "3%"
  },
  form: {
    width: "200px",
    margin: theme.spacing(1, 1, 0),
  },
  backgroundImage: {
    backgroundImage: `url(${bgImage.src})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    overflow: "auto",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Upload = () => {
  const classes = useStyles();
  const router = useRouter();
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState(null);
  const [userMissions, setUserMissions] = useState();
  const [selectedMissionChecklist, setSelectedMissionChecklist] = useState();
  const [selectedMission, setSelectedMission] = useState('');
  const [selectedChecklist, setSelectedChecklist] = useState();
  const [selectedUserAsctMissionId, setSelectedUserAsctMissionId] = useState();

  // const publishToKafka = async(topicToPublish, userAsctMissionId, chlistId, e) => {
  //   try{
  //     console.log("inside publish to kafka", userAsctMissionId, chlistId);
  //     console.log("topic passed from upload function:", topicToPublish);
  //     const response = await fetch('/api/publishKafka', {
  //       method: 'POST',
  //       headers: {"Content_Type":"application/json"},
  //       body: JSON.stringify({topic: topicToPublish, usrasctmisid: userAsctMissionId, chklistId: chlistId})
  //   });
    
  //   if (response.ok) {
  //     console.log('Message sent to Kafka consumer on topic my-topic for checklist id:', userAsctMissionId, chlistId);
  //   } else {
  //     console.error('Error sending to Kafka:', e);
  //   }
  //   }

  //   catch(e){
  //     console.log("this is error from publish to Kafka", e);
  //   }
  // }

    const getUserMissions = async () => {
      try {
          const userData = localStorage.getItem("myUserState");
          const parsedUserData = JSON.parse(userData);
          const response = await fetch(`/api/getuserassociatemission?userId=${parsedUserData._id}`, {
              method: 'GET',
              headers: { "Content_Type": "application/json" },
          })
          const data = await response.json()
          if (Object.keys(data.userMission).length != 0 && response.status === 200) {
              setUserMissions(data.userMission);
          }
          else {
              console.log("no data found while fetching user mission!.")
          }
      } catch (e) {
          console.error('Error fetching data in fetching user mission :', e);
      }
  }

  const handleImageUpload = async(e) => {
      const files = e.target.files[0];
      console.log(files);
      try{
          const formData = new FormData();
          setIsLoading(true);
          formData.append("image", files);
          const response = await fetch('/api/uploadUserImage', {
              method: 'POST',
              headers: { "Content_Type": "multipart/form-data" },
              body: formData
          });
        
            if (response.ok) {
              setApiStatus('success')
              console.log('Visual uploaded successfully. selectedChecklist:', selectedChecklist, '    selectedUserAsctMissionId: ', selectedUserAsctMissionId);
              // await publishToKafka("checklist-1", selectedUserAsctMissionId, selectedChecklist);
              const bodyJson = {
                "userasctmisid" : selectedUserAsctMissionId,
                "checklistid" : selectedChecklist
            }
            console.log("stringified body", JSON.stringify(bodyJson));
              const res = await fetch(`/api/updatechecklistuserassociatemission`, {
                method: 'POST',
                headers: { "Content_Type": "application/json" },
                body: JSON.stringify(bodyJson)
              })
              console.log("res:", res);
              if(res.status === 200){
                console.log("checklist updated")
              }
              else{
                console.log("db updation failed")
              }
            } else {
              setApiStatus('error');
              console.error('Error uploading file.');
            }
            setIsLoading(false);
      }catch(error) {
          setApiStatus('error');
          console.log(error);
      }
  }

  const handleChange = async (event, id) => {
    console.log("selected mission name", event.target.value)
    setSelectedMission(event.target.value);
    //const userData = ;
    const parsedUserData = JSON.parse(localStorage.getItem("myUserState"));
    try {
      const response = await fetch(`/api/getuserassociatemission?missionId=${event.target.value}&userId=${parsedUserData._id}`, {
          method: 'GET',
          headers: { "Content_Type": "application/json" },
      })
      const data = await response.json();
      console.log("data line number 145:", data);
      if (response.status === 200) {
      setSelectedMissionChecklist(data.userMission.missionCheckList);
      console.log("setSelectedMissionChecklist:", selectedMissionChecklist);
      setSelectedUserAsctMissionId(data.userMission._id);
      } else {
          console.log("no data found while fetching mission!")
      }
  } catch (e) {
      console.error('Error fetching data in fetching mission :', e);
  }
}

const handleChangeChecklist = async (event, id) => {
  //TODO: Need to uncomment it when we are able to see the values in checklist dropdown
  setSelectedChecklist(event.target.value);
  //setSelectedChecklist("6487175f788eedbb48e3d6c3");
  console.log("selected user associate mission table Id:", selectedUserAsctMissionId, "checklist id", selectedChecklist)
}

useEffect(() => {
  getUserMissions();
}, [])


  return (
    <Box className={classes.backgroundImage}>
      <Container component="main">
        <CssBaseline />
        <div className={classes.paper}>
          <img
            src="/royalenfield.png"
            alt="company logo"
            style={{ width: '30em' }}
          />
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <Typography component="h1" variant="h5" style={{ color: 'red' }}>
            <b>Select Mission/Checklist:</b>
          </Typography>
          <br></br>
          <br></br>

          <FormControl className={classes.form}>
            <label style={{color: 'red'}}><b>Enrolled Mission</b></label>
              <Select
                  id="dropdown"
                  style={{ background: 'white' }}
                  onChange={handleChange}
                  value={selectedMission}
              >
                  {userMissions ? userMissions.map((msn, index) => (
                      <MenuItem key={index} value={msn.missionId}>
                          {msn.missionName}
                      </MenuItem>
                  )) : <MenuItem value="">
                      <em>None</em>
                  </MenuItem>
                  }
              </Select>
              <br></br>
              <br></br>
              </FormControl>
              <FormControl className={classes.form}>
              <label style={{color: 'red'}}><b>Select Mission Checklist</b></label>
              <Select
                  id="dropdown2"
                  style={{ background: 'white' }}
                  onChange={handleChangeChecklist}
                  value={selectedChecklist}
              >
                  {selectedMissionChecklist ? selectedMissionChecklist.map((msnChk, index) => (
                      <MenuItem key={index} value={msnChk._id}>
                          {msnChk.task}
                      </MenuItem>
                  )) : <MenuItem value="">
                      <em>None</em>
                  </MenuItem>
                  }
              </Select>
            </FormControl>
          
          <br></br>
          <br></br>
          <br></br>
          <Typography component="h1" variant="h5" style={{ color: 'red' }}>
            <b>Upload Image</b>
          </Typography>
          <div>
              <br></br>
              <Grid container spacing={10}>
                        <Grid item>
                            <input style={{display: 'none', fontSize: '18px', size:'small'}}
                                accept="image/*"
                                id="image-upload"
                                type="file"
                                onChange={handleImageUpload}
                            />
                            <label htmlFor="image-upload">
                                <Button color="secondary" variant="contained" component="span">
                                  Choose File
                                </Button>
                                </label> 
                                <p>  </p>
                                <br></br>
                              {apiStatus === 'success' && <p className="text-green-600">File uploaded successfully!</p>}
                              {apiStatus === 'error' && <p className="text-red-600">There was an error uploading your image. Please try again.</p>}
                              <br></br>
                              <br></br>
                              <br></br>
                              <Link href="/components/home">
                                <h1 style={{ textAlign: "center", color: "white" }}>
                                  Back to Dashboard
                                </h1>
                              </Link>
                        </Grid>
                </Grid>
              <br></br>
              <br></br>
          </div>
        </div>
      </Container>
    </Box >
  );
};
export default Upload;
