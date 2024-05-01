import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAssignment } from "../../redux/teacherRelated/teacherHandle";
import Popup from "../../components/Popup";
import { CircularProgress, TextField, Button, Typography, Container, Grid } from "@mui/material";

const TeacherAssignment = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [accessUrl, setAccessUrl] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);

    const assignmentData = {
      title,
      deadline,
      accessUrl,
      userId: currentUser._id,
    };

    dispatch(createAssignment(assignmentData))
      .then(() => {
        setMessage("Assignment added successfully");
        setShowPopup(true);
      })
      .catch((error) => {
        setMessage(error.message);
        setShowPopup(true);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Container maxWidth="sm">
        <form onSubmit={submitHandler}>
          <Typography variant="h5" gutterBottom>
            Add Assignment
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Deadline"
                type="date"
                variant="outlined"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Assignment URL"
                variant="outlined"
                value={accessUrl}
                onChange={(e) => setAccessUrl(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loader}
              >
                {loader ? <CircularProgress size={24} color="inherit" /> : "Add Assignment"}
              </Button>
            </Grid>
          </Grid>
        </form>
        <Popup
          message={message}
          setShowPopup={setShowPopup}
          showPopup={showPopup}
        />
      </Container>
    </div>
  );
};

export default TeacherAssignment;
