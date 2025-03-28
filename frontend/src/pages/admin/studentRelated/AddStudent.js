import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../redux/userRelated/userHandle";
import Popup from "../../../components/Popup";
import { underControl } from "../../../redux/userRelated/userSlice";
import { getAllSclasses } from "../../../redux/sclassRelated/sclassHandle";
import {
  Container,
  TextField,
  MenuItem,
  Button,
  Typography,
  Box,
  CircularProgress,
  Paper,
} from "@mui/material";

const AddStudent = ({ situation }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const userState = useSelector((state) => state.user);
  const { status, currentUser, response, error } = userState;
  const { sclassesList } = useSelector((state) => state.sclass);

  const [name, setName] = useState("");
  const [rollNum, setRollNum] = useState("");
  const [password, setPassword] = useState("");
  const [className, setClassName] = useState("");
  const [sclassName, setSclassName] = useState("");
  const [email, setEmail] = useState("");

  const adminID = currentUser._id;
  const role = "Student";
  const attendance = [];

  useEffect(() => {
    if (situation === "Class") {
      setSclassName(params.id);
    }
  }, [params.id, situation]);

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    dispatch(getAllSclasses(adminID, "Sclass"));
  }, [adminID, dispatch]);

  const changeHandler = (event) => {
    if (event.target.value === "Select Class") {
      setClassName("Select Class");
      setSclassName("");
    } else {
      const selectedClass = sclassesList.find(
        (classItem) => classItem.sclassName === event.target.value
      );
      setClassName(selectedClass.sclassName);
      setSclassName(selectedClass._id);
    }
  };

  const fields = {
    name,
    email,
    rollNum,
    password,
    sclassName,
    adminID,
    role,
    attendance,
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (sclassName === "") {
      setMessage("Please select a class name");
      setShowPopup(true);
    } else {
      setLoader(true);
      dispatch(registerUser(fields, role));
    }
  };

  useEffect(() => {
    if (status === "added") {
      dispatch(underControl());
      navigate(-1);
    } else if (status === "failed") {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === "error") {
      setMessage("Network Error");
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, error, response, dispatch]);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 5, borderRadius: 2 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Add Student
        </Typography>
        <form onSubmit={submitHandler}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            margin="normal"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

          {situation === "Student" && (
            <TextField
              fullWidth
              select
              label="Class"
              variant="outlined"
              margin="normal"
              value={className}
              onChange={changeHandler}
              required
            >
              <MenuItem value="Select Class">Select Class</MenuItem>
              {sclassesList.map((classItem, index) => (
                <MenuItem key={index} value={classItem.sclassName}>
                  {classItem.sclassName}
                </MenuItem>
              ))}
            </TextField>
          )}

          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Roll Number"
            variant="outlined"
            margin="normal"
            type="number"
            value={rollNum}
            onChange={(event) => setRollNum(event.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            margin="normal"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <Box mt={2} display="flex" justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loader}
              sx={{ width: "50%" }}
            >
              {loader ? <CircularProgress size={24} color="inherit" /> : "Add"}
            </Button>
          </Box>
        </form>
      </Paper>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </Container>
  );
};

export default AddStudent;
