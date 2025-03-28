import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Box,
  Container,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import { AccountCircle, School, Group } from '@mui/icons-material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = 'zxc';

  const { status, currentUser, currentRole } = useSelector(
    (state) => state.user
  );

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');

  const navigateHandler = (user) => {
    if (user === 'Admin') {
      if (visitor === 'guest') {
        const email = 'yogendra@12';
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Adminlogin');
      }
    } else if (user === 'Student') {
      if (visitor === 'guest') {
        const rollNum = '1';
        const studentName = 'Dipesh Awasthi';
        const fields = { rollNum, studentName, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Studentlogin');
      }
    } else if (user === 'Teacher') {
      if (visitor === 'guest') {
        const email = 'tony@12';
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Teacherlogin');
      }
    }
  };

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') {
        navigate('/Admin/dashboard');
      } else if (currentRole === 'Student') {
        navigate('/Student/dashboard');
      } else if (currentRole === 'Teacher') {
        navigate('/Teacher/dashboard');
      }
    } else if (status === 'error') {
      setLoader(false);
      setMessage('Network Error');
      setShowPopup(true);
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <StyledContainer>
      <Container>
        <StyledHeading>Choose Your Role</StyledHeading>
        <Grid container spacing={3} justifyContent="center">
          {[
            {
              role: 'Admin',
              icon: <AccountCircle fontSize="large" />,
              desc: 'Manage app data and users.',
              color: '#ff9800',
            },
            {
              role: 'Student',
              icon: <School fontSize="large" />,
              desc: 'Access courses and assignments.',
              color: '#4caf50',
            },
            {
              role: 'Teacher',
              icon: <Group fontSize="large" />,
              desc: 'Create courses and track progress.',
              color: '#2196f3',
            },
          ].map(({ role, icon, desc, color }) => (
            <Grid item xs={12} sm={6} md={4} key={role}>
              <StyledPaper
                elevation={4}
                onClick={() => navigateHandler(role)}
                hovercolor={color}
              >
                <IconWrapper>{icon}</IconWrapper>
                <StyledTypography>{role}</StyledTypography>
                <StyledDescription>{desc}</StyledDescription>
              </StyledPaper>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </StyledContainer>
  );
};

export default ChooseUser;

// Styled Components
const StyledContainer = styled.div`
  background: linear-gradient(to right, #1c1c3c, #191970);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const StyledHeading = styled.h1`
  color: white;
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
`;

const StyledPaper = styled(Paper)`
  padding: 25px;
  text-align: center;
  background-color: #222242;
  color: white;
  cursor: pointer;
  border-radius: 15px;
  transition: transform 0.3s ease, background 0.3s ease;
  box-shadow: 0px 4px 15px rgba(255, 255, 255, 0.2);

  &:hover {
    transform: translateY(-8px);
    background: ${(props) => props.hovercolor};
  }
`;

const StyledTypography = styled.h2`
  margin-top: 10px;
  font-size: 1.5rem;
  font-weight: 600;
`;

const StyledDescription = styled.p`
  font-size: 1rem;
  opacity: 0.8;
`;

const IconWrapper = styled(Box)`
  font-size: 3rem;
  color: white;
  margin-bottom: 10px;
`;
