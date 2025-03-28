import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box, Button } from '@mui/material';
import styled from 'styled-components';
import Students from "../assets/students.svg";
import { LightPurpleButton } from '../components/buttonStyles';

const Homepage = () => {
<<<<<<< Updated upstream
    return (
        <StyledContainer>
            <Grid container spacing={0}>
                <Grid item xs={12} md={6}>
                    <img src={Students} alt="students" style={{ width: '100%' }} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <StyledPaper elevation={3}>
                        <StyledTitle>
                            Welcome to
                            <br />
                            Academic 
                            <br />
                            Nexus
                        </StyledTitle>
                        <StyledText>
                          
Streamline school administration, class organization, and add students and faculty.
Seamlessly monitor attendance, assess performance, and provide feedback.
Access records, view grades, and communicate effortlessly.
                        </StyledText>
                        <StyledBox>
                            <StyledLink to="/choose">
                                <LightPurpleButton variant="contained" fullWidth>
                                    Login
                                </LightPurpleButton>
                            </StyledLink>
                            <StyledLink to="/chooseasguest">
                            
                            </StyledLink>
                            <StyledText>
                                Don't have an account?{' '}
                                <Link to="/Adminregister" style={{color:"#550080"}}>
                                    Sign up
                                </Link>
                            </StyledText>
                        </StyledBox>
                    </StyledPaper>
                </Grid>
            </Grid>
        </StyledContainer>
    );
=======
  return (
    <StyledContainer>
      <Grid container spacing={0} alignItems="center">
        <Grid item xs={12} md={6}>
          <StyledImage src={CoolStudents} alt="Cool Students" />
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <StyledTitle>
              Welcome to <br />
              <span>Smart Learn</span>
            </StyledTitle>
            <StyledText>
              Simplify school management, connect with faculty and students
              seamlessly. Monitor attendance, track performance, and enhance
              communication with ease.
            </StyledText>
            <StyledBox>
              <StyledLink to="/choose">
                <LightPurpleButton variant="contained" fullWidth>
                  Get Started
                </LightPurpleButton>
              </StyledLink>
              <StyledText>
                New here?{' '}
                <Link
                  to="/Adminregister"
                  style={{ color: '#550080', fontWeight: 'bold' }}
                >
                  Sign up
                </Link>
              </StyledText>
            </StyledBox>
          </StyledPaper>
        </Grid>
      </Grid>
    </StyledContainer>
  );
>>>>>>> Stashed changes
};

export default Homepage;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledPaper = styled.div`
  padding: 24px;
  height: 100vh;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
  gap: 16px;
  padding: 24px;
`;

const StyledTitle = styled.h1`
  font-size: 3rem;
  color: #252525;
  /* font-family: "Manrope"; */
  font-weight: bold;
  padding-top: 0;
  letter-spacing: normal;
  line-height: normal;
`;

const StyledText = styled.p`
  /* color: #550080; */
  margin-top: 30px;
  margin-bottom: 30px; 
  letter-spacing: normal;
  line-height: normal;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
