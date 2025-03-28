import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotices } from '../redux/noticeRelated/noticeHandle';
import {
  Paper,
  CircularProgress,
  Typography,
  Box,
  Button,
} from '@mui/material';
import TableViewTemplate from './TableViewTemplate';

const SeeNotice = () => {
  const dispatch = useDispatch();

  // Selecting necessary state from Redux store
  const { currentUser, currentRole } = useSelector((state) => state.user);
  const { noticesList, loading, error, response } = useSelector(
    (state) => state.notice
  );

  // Fetch notices based on user role
  useEffect(() => {
    const userId =
      currentRole === 'Admin' ? currentUser._id : currentUser.school._id;
    dispatch(getAllNotices(userId, 'Notice'));
  }, [dispatch, currentRole, currentUser]);

  // Handle error logging
  if (error) {
    console.error('Error fetching notices:', error);
  }

  // Define columns for the notice table
  const noticeColumns = [
    { id: 'title', label: 'Title', minWidth: 170 },
    { id: 'details', label: 'Details', minWidth: 100 },
    { id: 'date', label: 'Date', minWidth: 170 },
  ];

  // Map notices to rows for the table
  const noticeRows = noticesList.map((notice) => {
    const date = new Date(notice.date);
    return {
      title: notice.title,
      details: notice.details,
      date:
        date.toString() !== 'Invalid Date'
          ? date.toISOString().substring(0, 10)
          : 'Invalid Date',
      id: notice._id,
    };
  });

  return (
    <Box
      sx={{
        marginTop: '50px',
        marginRight: '20px',
        padding: '20px',
        backgroundColor: '#e3f2fd', // Light blue background
        borderRadius: '12px',
        boxShadow: '0px 6px 20px rgba(0,0,0,0.1)',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          marginBottom: '20px',
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#1976d2', // Primary color for headings
        }}
      >
        Notices
      </Typography>

      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '200px',
          }}
        >
          <CircularProgress />
        </Box>
      ) : response ? (
        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
            fontSize: '20px',
            color: '#757575',
          }}
        >
          No Notices to Show Right Now
        </Typography>
      ) : (
        <>
          <Paper
            sx={{
              width: '100%',
              overflowX: 'auto',
              padding: '20px',
              borderRadius: '12px',
              boxShadow: '0px 4px 15px rgba(0,0,0,0.1)',
              backgroundColor: '#ffffff', // White background for the table
            }}
          >
            {Array.isArray(noticesList) && noticesList.length > 0 ? (
              <TableViewTemplate columns={noticeColumns} rows={noticeRows} />
            ) : (
              <Typography
                variant="body1"
                sx={{
                  textAlign: 'center',
                  paddingTop: '20px',
                  color: '#757575',
                }}
              >
                No Notices Available
              </Typography>
            )}
          </Paper>

          {/* Add a button to refresh or create new notices */}
          <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: '8px' }}
              onClick={() =>
                dispatch(
                  getAllNotices(
                    <TableViewTemplate
                      columns={noticeColumns}
                      rows={noticeRows}
                    />
                  )
                )
              }
            >
              Refresh Notices
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default SeeNotice;
