import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box } from '@mui/material';
import styled from 'styled-components';
import CoolStudents from '../assets/college.jpg'; // Add a stylish student image
import { LightPurpleButton } from '../components/buttonStyles';

const Homepage = () => {
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
              <span>Academic Nexus</span>
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
};

export default Homepage;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #f8f9fa, #e3e7fc);
  padding: 20px;
`;

const StyledPaper = styled.div`
  padding: 40px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 20px;
`;

const StyledTitle = styled.h1`
  font-size: 2.8rem;
  color: #252525;
  font-weight: bold;
  span {
    color: #550080;
  }
`;

const StyledText = styled.p`
  font-size: 1.1rem;
  color: #555;
  margin: 20px 0;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  width: 100%;
`;

const StyledImage = styled.img`
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
