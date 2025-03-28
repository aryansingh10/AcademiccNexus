import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { BlueButton } from "../../../components/buttonStyles";
import Popup from "../../../components/Popup";
import Classroom from "../../../assets/classroom.png";
import styled from "styled-components";

const AddClass = () => {
    const [sclassName, setSclassName] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error, tempDetails } = userState;
    const adminID = currentUser._id;
    const address = "Sclass";
    
    const [loader, setLoader] = useState(false);
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const fields = { sclassName, adminID };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true);
        dispatch(addStuff(fields, address));
    };

    useEffect(() => {
        if (status === 'added' && tempDetails) {
            navigate("/Admin/classes/class/" + tempDetails._id);
            dispatch(underControl());
            setLoader(false);
        } else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        } else if (status === 'error') {
            setMessage("Network Error");
            setShowPopup(true);
            setLoader(false);
        }
    }, [status, navigate, error, response, dispatch, tempDetails]);

    return (
        <StyledContainer>
            <StyledBox>
                <Stack alignItems="center" spacing={2}>
                    <Typography variant="h4" fontWeight="bold" color="#1976D2">
                        Create a New Class
                    </Typography>
                    <Typography variant="body1" color="gray">
                        Organize your students and manage classrooms efficiently
                    </Typography>
                    <StyledImage src={Classroom} alt="Classroom Illustration" />
                </Stack>
                <form onSubmit={submitHandler}>
                    <Stack spacing={3}>
                        <TextField
                            label="Class Name"
                            variant="outlined"
                            value={sclassName}
                            onChange={(event) => setSclassName(event.target.value)}
                            required
                            fullWidth
                        />
                        <BlueButton
                            fullWidth
                            size="large"
                            sx={{ mt: 2 }}
                            variant="contained"
                            type="submit"
                            disabled={loader}
                        >
                            {loader ? <CircularProgress size={24} color="inherit" /> : "Create Class"}
                        </BlueButton>
                        <Button variant="outlined" onClick={() => navigate(-1)} fullWidth>
                            Go Back
                        </Button>
                    </Stack>
                </form>
            </StyledBox>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </StyledContainer>
    );
};

export default AddClass;

const StyledContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
`;

const StyledBox = styled(Box)`
  max-width: 500px;
  padding: 40px;
  background: white;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const StyledImage = styled.img`
  width: 100px;
  height: auto;
`;
