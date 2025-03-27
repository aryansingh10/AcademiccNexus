import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper,
  Box,
  Checkbox,
  Typography,
  CircularProgress,
} from '@mui/material';
import { getAllComplains } from '../../redux/complainRelated/complainHandle';
import TableTemplate from '../../components/TableTemplate';

const TeacherComplain = () => {
  const dispatch = useDispatch();
  const { complainsList, loading, error, response } = useSelector(
    (state) => state.complain
  );
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllComplains('660e4618b231dce874b41fae', 'Complain'));
  }, [currentUser._id, dispatch]);

  if (error) {
    console.log(error);
  }

  const complainColumns = [
    { id: 'user', label: 'User', minWidth: 170 },
    { id: 'complaint', label: 'Complaint', minWidth: 100 },
    { id: 'date', label: 'Date', minWidth: 170 },
  ];

  const complainRows =
    complainsList &&
    complainsList.length > 0 &&
    complainsList.map((complain) => {
      const date = new Date(complain.date);
      const dateString =
        date.toString() !== 'Invalid Date'
          ? date.toISOString().substring(0, 10)
          : 'Invalid Date';
      return {
        // user: currentUser.name,
        complaint: complain.complaint,
        date: dateString,
        id: complain._id,
      };
    });

  const ComplainButtonHaver = ({ row }) => {
    return <Checkbox sx={{ color: '#1976D2' }} />;
  };

  return (
    <Box
      sx={{
        padding: '20px',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {loading ? (
        <CircularProgress color="primary" sx={{ marginTop: '20px' }} />
      ) : (
        <>
          {response || !complainsList.length ? (
            <Typography
              variant="h6"
              color="textSecondary"
              sx={{ marginTop: '20px' }}
            >
              No Complaints Available
            </Typography>
          ) : (
            <Paper
              sx={{
                width: '90%',
                overflow: 'hidden',
                padding: '20px',
                boxShadow: 3,
              }}
            >
              <TableTemplate
                buttonHaver={ComplainButtonHaver}
                columns={complainColumns}
                rows={complainRows}
              />
            </Paper>
          )}
        </>
      )}
    </Box>
  );
};

export default TeacherComplain;
