import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Grid,
  Box,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  TextField,
  CssBaseline,
  IconButton,
  InputAdornment,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import bgpic from '../assets/designlogin.jpg';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';
import styled from 'styled-components';

const theme = createTheme({
  palette: {
    primary: { main: '#6C63FF' },
    secondary: { main: '#FF6584' },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    h4: { fontWeight: 700 },
  },
});

const LoginPage = ({ role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, currentUser, response, error, currentRole } = useSelector(
    (state) => state.user
  );

  const [toggle, setToggle] = useState(false);
  const [guestLoader, setGuestLoader] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState({
    email: false,
    password: false,
    rollNumber: false,
    studentName: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors({
      email: false,
      password: false,
      rollNumber: false,
      studentName: false,
    });

    let fields = {};
    if (role === 'Student') {
      fields = {
        rollNum: event.target.rollNumber.value.trim(),
        studentName: event.target.studentName.value.trim(),
        password: event.target.password.value.trim(),
      };
      if (!fields.rollNum || !fields.studentName || !fields.password) {
        setErrors({
          rollNumber: !fields.rollNum,
          studentName: !fields.studentName,
          password: !fields.password,
        });
        return;
      }
    } else {
      fields = {
        email: event.target.email.value.trim(),
        password: event.target.password.value.trim(),
      };
      if (!fields.email || !fields.password) {
        setErrors({ email: !fields.email, password: !fields.password });
        return;
      }
    }

    setLoader(true);
    dispatch(loginUser(fields, role));
  };

  useEffect(() => {
    if (status === 'success' || currentUser) {
      navigate(`/${currentRole}/dashboard`);
    } else if (status === 'failed' || status === 'error') {
      setMessage(status === 'error' ? 'Network Error' : response);
      setShowPopup(true);
      setLoader(false);
      setGuestLoader(false);
    }
  }, [status, currentRole, navigate, error, response, currentUser]);

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography variant="h4" color="primary" sx={{ mb: 1 }}>
              {role} Login
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Welcome back! Please enter your details.
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 2, width: '100%' }}
            >
              {role === 'Student' ? (
                <>
                  <StyledTextField
                    label="Roll Number"
                    name="rollNumber"
                    type="number"
                    error={errors.rollNumber}
                    helperText={errors.rollNumber && 'Roll Number is required'}
                  />
                  <StyledTextField
                    label="Full Name"
                    name="studentName"
                    error={errors.studentName}
                    helperText={errors.studentName && 'Name is required'}
                  />
                </>
              ) : (
                <StyledTextField
                  label="Email"
                  name="email"
                  type="email"
                  error={errors.email}
                  helperText={errors.email && 'Email is required'}
                />
              )}
              <StyledTextField
                label="Password"
                name="password"
                type={toggle ? 'text' : 'password'}
                error={errors.password}
                helperText={errors.password && 'Password is required'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setToggle(!toggle)}>
                        {toggle ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Grid container sx={{ justifyContent: 'space-between', mt: 1 }}>
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="Remember me"
                />
              </Grid>
              <StyledButton type="submit">
                {loader ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Login'
                )}
              </StyledButton>
              {role === 'Admin' && (
                <Grid container sx={{ mt: 2, justifyContent: 'center' }}>
                  <Typography variant="body2">
                    Don't have an account?
                  </Typography>
                  <StyledLink to="/Adminregister">Sign up</StyledLink>
                </Grid>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            background: 'linear-gradient(135deg, #4a1e9e 0%, #7153fa 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              zIndex: 2,
              width: '80%',
              color: 'white',
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 3,
                textShadow: '0px 2px 4px rgba(0,0,0,0.2)',
              }}
            >
              Academic Nexus
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 400,
                mb: 4,
                opacity: 0.9,
              }}
            >
              Your complete education management solution
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 2,
                flexWrap: 'wrap',
              }}
            >
              <Feature>
                <Typography variant="subtitle1">
                  Easy Grade Management
                </Typography>
              </Feature>
              <Feature>
                <Typography variant="subtitle1">Attendance Tracking</Typography>
              </Feature>
              <Feature>
                <Typography variant="subtitle1">Course Planning</Typography>
              </Feature>
              <Feature>
                <Typography variant="subtitle1">Student Analytics</Typography>
              </Feature>
            </Box>
          </Box>

          {/* Decorative elements */}
          <DecorativeCircle
            sx={{
              width: '400px',
              height: '400px',
              top: '-100px',
              right: '-100px',
              opacity: 0.3,
            }}
          />
          <DecorativeCircle
            sx={{
              width: '300px',
              height: '300px',
              bottom: '-50px',
              left: '-50px',
              opacity: 0.2,
            }}
          />
          <DecorativeCircle
            sx={{
              width: '200px',
              height: '200px',
              top: '30%',
              left: '15%',
              opacity: 0.1,
            }}
          />
          <DecorativeCircle
            sx={{
              width: '150px',
              height: '150px',
              bottom: '20%',
              right: '10%',
              opacity: 0.15,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 16,
              left: 0,
              width: '100%',
              textAlign: 'center',
              color: 'rgba(255,255,255,0.7)',
              zIndex: 2,
            }}
          >
            <Typography variant="body2">
              © 2025 Academic Nexus. All rights reserved.
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={guestLoader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </ThemeProvider>
  );
};

export default LoginPage;

const StyledTextField = styled(TextField)`
  width: 100%;
  margin-top: 16px;
  & .MuiOutlinedInput-root {
    border-radius: 12px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  padding: 12px;
  margin-top: 20px;
  border-radius: 10px;
  font-size: 16px;
  background-color: #6c63ff;
  color: white;
  &:hover {
    background-color: #574bff;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #6c63ff;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
`;

const DecorativeCircle = styled(Box)`
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
`;

const Feature = styled(Box)`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
  border-radius: 8px;
  padding: 16px 24px;
  margin: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;
