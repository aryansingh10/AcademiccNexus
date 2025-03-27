import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAssignment } from '../../redux/teacherRelated/teacherHandle';
import Popup from '../../components/Popup';
import {
  CircularProgress,
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Paper,
  Box,
} from '@mui/material';

const TeacherAssignment = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [accessUrl, setAccessUrl] = useState('');

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');
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
        setMessage('Assignment added successfully');
        setShowPopup(true);
        setTitle('');
        setDeadline('');
        setAccessUrl('');
      })
      .catch((error) => {
        setMessage(error.message);
        setShowPopup(true);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const today = new Date().toISOString().split('T')[0];
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{ padding: '24px', borderRadius: '12px', boxShadow: 4 }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: 600 }}
          >
            Add Assignment
          </Typography>
          <form onSubmit={submitHandler}>
            <Grid container spacing={3}>
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
                  InputLabelProps={{ shrink: true }}
                  inputProps={{
                    min: new Date().toISOString().split('T')[0],
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
                  fullWidth
                  disabled={loader}
                  sx={{
                    padding: '12px',
                    fontSize: '16px',
                    fontWeight: 500,
                    borderRadius: '8px',
                  }}
                >
                  {loader ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Add Assignment'
                  )}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
        <Popup
          message={message}
          setShowPopup={setShowPopup}
          showPopup={showPopup}
        />
      </Container>
    </Box>
  );
};

export default TeacherAssignment;
