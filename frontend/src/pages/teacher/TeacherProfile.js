import React from 'react';
import styled from 'styled-components';
import { Card, CardContent, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const TeacherProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) console.log(response);
  else if (error) console.log(error);

  const teachSclass = currentUser?.teachSclass;
  const teachSubject = currentUser?.teachSubject;
  const teachSchool = currentUser?.school;

  return (
    <ProfileContainer>
      <ProfileCard>
        <ProfileCardContent>
          <ProfileTitle variant="h5">Teacher Profile</ProfileTitle>
          <ProfileText>
            <strong>Name:</strong> {currentUser?.name}
          </ProfileText>
          <ProfileText>
            <strong>Email:</strong> {currentUser?.email}
          </ProfileText>
          <ProfileText>
            <strong>Class:</strong> {teachSclass?.sclassName}
          </ProfileText>
          <ProfileText>
            <strong>Subject:</strong> {teachSubject?.subName}
          </ProfileText>
          <ProfileText>
            <strong>School:</strong> {teachSchool?.schoolName}
          </ProfileText>
        </ProfileCardContent>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default TeacherProfile;

// Styled Components
const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(
    to bottom right,
    #f0f2f5,
    #dfe7fd
  ); /* Soft pastel colors */
`;

const ProfileCard = styled(Card)`
  width: 420px;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const ProfileCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
`;

const ProfileTitle = styled(Typography)`
  font-weight: bold;
  font-size: 22px;
  margin-bottom: 16px;
  color: #2c3e50;
  text-align: center;
  width: 100%;
`;

const ProfileText = styled(Typography)`
  font-size: 16px;
  margin: 8px 0;
  color: #444;
  background: #f8f9fa;
  padding: 10px;
  border-radius: 6px;
  width: 100%;
`;
