import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Card,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addStuff } from "../../../redux/userRelated/userHandle";
import { underControl } from "../../../redux/userRelated/userSlice";
import Popup from "../../../components/Popup";

const SubjectForm = () => {
  const [subjects, setSubjects] = useState([{ subName: "", subCode: "", sessions: "" }]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const userState = useSelector((state) => state.user);
  const { status, currentUser, response, error } = userState;

  const sclassName = params.id;
  const adminID = currentUser._id;
  const address = "Subject";

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);

  // Handle input change for dynamic fields
  const handleInputChange = (index, field) => (event) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = event.target.value;
    setSubjects(newSubjects);
  };

  // Add new subject row
  const handleAddSubject = () => {
    setSubjects([...subjects, { subName: "", subCode: "", sessions: "" }]);
  };

  // Remove subject row
  const handleRemoveSubject = (index) => () => {
    const newSubjects = [...subjects];
    newSubjects.splice(index, 1);
    setSubjects(newSubjects);
  };

  const fields = { sclassName, subjects, adminID };

  // Submit handler
  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(addStuff(fields, address));
  };

  useEffect(() => {
    if (status === "added") {
      navigate("/Admin/subjects");
      dispatch(underControl());
      setLoader(false);
    } else if (status === "failed" || status === "error") {
      setMessage(response || "Network Error");
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, error, response, dispatch]);

  return (
    <Box sx={styles.container}>
      <Card sx={styles.card}>
        <Typography variant="h4" align="center" sx={{ marginBottom: "20px", fontWeight: "bold" }}>
          Add Subjects
        </Typography>
        <form onSubmit={submitHandler}>
          <Grid container spacing={2}>
            {subjects.map((subject, index) => (
              <React.Fragment key={index}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Subject Name"
                    variant="outlined"
                    value={subject.subName}
                    onChange={handleInputChange(index, "subName")}
                    sx={styles.inputField}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="Subject Code"
                    variant="outlined"
                    value={subject.subCode}
                    onChange={handleInputChange(index, "subCode")}
                    sx={styles.inputField}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="Sessions"
                    variant="outlined"
                    type="number"
                    inputProps={{ min: 0 }}
                    value={subject.sessions}
                    onChange={handleInputChange(index, "sessions")}
                    sx={styles.inputField}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={2} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {index === 0 ? (
                    <IconButton color="primary" onClick={handleAddSubject}>
                      <Add />
                    </IconButton>
                  ) : (
                    <IconButton color="error" onClick={handleRemoveSubject(index)}>
                      <Remove />
                    </IconButton>
                  )}
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
          <Box sx={styles.buttonContainer}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddSubject}
              startIcon={<Add />}
              sx={styles.addButton}
            >
              Add Subject
            </Button>
            <Button
              variant="contained"
              color="success"
              type="submit"
              disabled={loader}
              sx={styles.submitButton}
            >
              {loader ? <CircularProgress size={24} color="inherit" /> : "Submit"}
            </Button>
          </Box>
        </form>
        <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
      </Card>
    </Box>
  );
};

export default SubjectForm;

// 🌟 Styles for the Form
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f4f6f8",
    padding: "20px",
  },
  card: {
    width: "90%",
    maxWidth: "700px",
    padding: "30px",
    boxShadow: "0px 6px 15px rgba(0,0,0,0.2)",
    borderRadius: "12px",
    backgroundColor: "#fff",
  },
  inputField: {
    "& .MuiInputLabel-root": {
      color: "#666",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "#ccc" },
      "&:hover fieldset": { borderColor: "#888" },
      "&.Mui-focused fieldset": { borderColor: "#1976d2" },
    },
  },
  buttonContainer: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-between",
  },
  addButton: {
    backgroundColor: "#1976d2",
    "&:hover": {
      backgroundColor: "#1565c0",
    },
  },
  submitButton: {
    backgroundColor: "#2e7d32",
    "&:hover": {
      backgroundColor: "#1b5e20",
    },
  },
};
