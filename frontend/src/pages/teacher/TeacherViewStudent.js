import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Collapse,
  Table,
  TableBody,
  TableHead,
  Typography,
  Container,
  Paper,
  Grid,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import {
  calculateOverallAttendancePercentage,
  calculateSubjectAttendancePercentage,
  groupAttendanceBySubject,
} from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart';
import { PurpleButton } from '../../components/buttonStyles';
import { StyledTableCell, StyledTableRow } from '../../components/styles';

const TeacherViewStudent = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { currentUser, userDetails, loading } = useSelector(
    (state) => state.user
  );

  const address = 'Student';
  const studentID = params.id;
  const teachSubject = currentUser?.teachSubject?.subName;
  const teachSubjectID = currentUser?.teachSubject?._id;

  useEffect(() => {
    dispatch(getUserDetails(studentID, address));
  }, [dispatch, studentID]);

  const [sclassName, setSclassName] = useState('');
  const [studentSchool, setStudentSchool] = useState('');
  const [subjectMarks, setSubjectMarks] = useState([]);
  const [subjectAttendance, setSubjectAttendance] = useState([]);

  const [openStates, setOpenStates] = useState({});

  const handleOpen = (subId) => {
    setOpenStates((prevState) => ({
      ...prevState,
      [subId]: !prevState[subId],
    }));
  };

  useEffect(() => {
    if (userDetails) {
      setSclassName(userDetails.sclassName || '');
      setStudentSchool(userDetails.school || '');
      setSubjectMarks(userDetails.examResult || []);
      setSubjectAttendance(userDetails.attendance || []);
    }
  }, [userDetails]);

  const overallAttendancePercentage =
    calculateOverallAttendancePercentage(subjectAttendance);
  const overallAbsentPercentage = 100 - overallAttendancePercentage;

  const chartData = [
    { name: 'Present', value: overallAttendancePercentage },
    { name: 'Absent', value: overallAbsentPercentage },
  ];

  const styles = {
    root: {
      backgroundColor: '#f4f6f8',
      minHeight: '100vh',
      padding: '24px 0',
    },
    container: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      padding: '24px',
    },
    section: {
      marginBottom: '24px',
      padding: '16px',
      backgroundColor: '#f9fafb',
      borderRadius: '8px',
    },
    sectionTitle: {
      marginBottom: '16px',
      fontWeight: 600,
      color: '#2c3e50',
    },
    infoGrid: {
      backgroundColor: '#f1f3f5',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '16px',
    },
    actionButton: {
      marginTop: '16px',
      textTransform: 'none',
    },
  };

  return (
    <Box sx={styles.root}>
      <Container maxWidth="lg">
        {loading ? (
          <Typography variant="h6" align="center">
            Loading...
          </Typography>
        ) : (
          <Paper sx={styles.container}>
            <Grid container spacing={3}>
              {/* Student Profile */}
              <Grid item xs={12} sx={styles.infoGrid}>
                <Typography variant="h5" sx={styles.sectionTitle}>
                  Student Profile
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography>Name: {userDetails.name}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography>Roll Number: {userDetails.rollNum}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography>Class: {sclassName.sclassName}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography>School: {studentSchool.schoolName}</Typography>
                  </Grid>
                </Grid>
              </Grid>

              {/* Attendance Section */}
              <Grid item xs={12} sx={styles.section}>
                <Typography variant="h6" sx={styles.sectionTitle}>
                  Attendance
                </Typography>

                {subjectAttendance.length > 0 &&
                  Object.entries(
                    groupAttendanceBySubject(subjectAttendance)
                  ).map(
                    (
                      [subName, { present, allData, subId, sessions }],
                      index
                    ) => {
                      if (subName === teachSubject) {
                        const subjectAttendancePercentage =
                          calculateSubjectAttendancePercentage(
                            present,
                            sessions
                          );

                        return (
                          <Table key={index}>
                            <TableHead>
                              <StyledTableRow>
                                <StyledTableCell>Subject</StyledTableCell>
                                <StyledTableCell>Present</StyledTableCell>
                                <StyledTableCell>
                                  Total Sessions
                                </StyledTableCell>
                                <StyledTableCell>Attendance %</StyledTableCell>
                                <StyledTableCell align="center">
                                  Actions
                                </StyledTableCell>
                              </StyledTableRow>
                            </TableHead>
                            <TableBody>
                              <StyledTableRow>
                                <StyledTableCell>{subName}</StyledTableCell>
                                <StyledTableCell>{present}</StyledTableCell>
                                <StyledTableCell>{sessions}</StyledTableCell>
                                <StyledTableCell>
                                  {subjectAttendancePercentage}%
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  <Button
                                    variant="contained"
                                    onClick={() => handleOpen(subId)}
                                  >
                                    {openStates[subId] ? (
                                      <KeyboardArrowUp />
                                    ) : (
                                      <KeyboardArrowDown />
                                    )}
                                    Details
                                  </Button>
                                </StyledTableCell>
                              </StyledTableRow>
                            </TableBody>
                          </Table>
                        );
                      }
                      return null;
                    }
                  )}

                {/* Always show Add Attendance Button */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mt: 2,
                  }}
                >
                  <Typography>
                    Overall Attendance Percentage:{' '}
                    {overallAttendancePercentage.toFixed(2)}%
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={styles.actionButton}
                    onClick={() =>
                      navigate(
                        `/Teacher/class/student/attendance/${studentID}/${teachSubjectID}`
                      )
                    }
                  >
                    Add Attendance
                  </Button>
                </Box>

                {/* Always show pie chart */}
                <Box sx={{ mt: 2 }}>
                  <CustomPieChart data={chartData} />
                </Box>
              </Grid>

              {/* Subject Marks Section */}
              <Grid item xs={12} sx={styles.section}>
                <Typography variant="h6" sx={styles.sectionTitle}>
                  Subject Marks
                </Typography>

                {/* Always show Add Marks Button */}
                <Box
                  sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}
                >
                  <PurpleButton
                    variant="contained"
                    sx={styles.actionButton}
                    onClick={() =>
                      navigate(
                        `/Teacher/class/student/marks/${studentID}/${teachSubjectID}`
                      )
                    }
                  >
                    Add Marks
                  </PurpleButton>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        )}
      </Container>
    </Box>
  );
};

export default TeacherViewStudent;
