import React, { useEffect, useState } from "react";
import { getClassStudents, getSubjectDetails } from "../../../redux/sclassRelated/sclassHandle";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Divider,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GradeIcon from "@mui/icons-material/Grade";

const ViewSubject = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { subloading, subjectDetails, sclassStudents, getresponse, error } = useSelector((state) => state.sclass);

  const { classID, subjectID } = params;

  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, "Subject"));
    dispatch(getClassStudents(classID));
  }, [dispatch, subjectID, classID]);

  if (error) {
    console.log(error);
  }

  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (event, newValue) => setTabValue(newValue);

  return (
    <Container sx={{ mt: 5, mb: 5 }}>
      {subloading ? (
        <Box sx={{ textAlign: "center", mt: 5 }}>
          <CircularProgress />
          <Typography variant="h6" mt={2}>
            Loading...
          </Typography>
        </Box>
      ) : (
        <>
          {/* Tabs for Switching Views */}
          <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider", mb: 3 }}>
            <Tabs value={tabValue} onChange={handleTabChange} centered>
              <Tab icon={<SchoolIcon />} label="Subject Details" />
              <Tab icon={<PersonIcon />} label="Students List" />
            </Tabs>
          </Box>

          {tabValue === 0 && (
            <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}>
                  📖 Subject Information
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6">
                      <strong>📚 Subject Name:</strong> {subjectDetails?.subName || "N/A"}
                    </Typography>
                    <Typography variant="h6">
                      <strong>🆔 Subject Code:</strong> {subjectDetails?.subCode || "N/A"}
                    </Typography>
                    <Typography variant="h6">
                      <strong>📅 Sessions:</strong> {subjectDetails?.sessions || "N/A"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6">
                      <strong>👥 Enrolled Students:</strong> {sclassStudents.length}
                    </Typography>
                    <Typography variant="h6">
                      <strong>🏫 Class:</strong> {subjectDetails?.sclassName?.sclassName || "N/A"}
                    </Typography>
                    {subjectDetails?.teacher ? (
                      <Typography variant="h6">
                        <strong>👨‍🏫 Teacher:</strong> {subjectDetails.teacher.name}
                      </Typography>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                        onClick={() => navigate(`/Admin/teachers/addteacher/${subjectDetails?._id}`)}
                      >
                        Add Subject Teacher
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}

          {tabValue === 1 && (
            <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2, mt: 3 }}>
              <CardContent>
                <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}>
                  👥 Students List
                </Typography>
                <Divider sx={{ mb: 3 }} />

                {getresponse ? (
                  <Box sx={{ textAlign: "center" }}>
                    <Button variant="contained" color="success" onClick={() => navigate(`/Admin/class/addstudents/${classID}`)}>
                      Add Students
                    </Button>
                  </Box>
                ) : (
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell><strong>Roll No.</strong></TableCell>
                          <TableCell><strong>Name</strong></TableCell>
                          <TableCell align="center"><strong>Actions</strong></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {sclassStudents.map((student) => (
                          <TableRow key={student._id}>
                            <TableCell>{student.rollNum}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell align="center">
                              <Button variant="contained" color="info" onClick={() => navigate(`/Admin/students/student/${student.id}`)} sx={{ mr: 1 }}>
                                View
                              </Button>
                              <Button
                                variant="contained"
                                color="secondary"
                                sx={{ mr: 1 }}
                                startIcon={<CheckCircleIcon />}
                                onClick={() => navigate(`/Admin/subject/student/attendance/${student.id}/${subjectID}`)}
                              >
                                Attendance
                              </Button>
                              <Button
                                variant="contained"
                                color="warning"
                                startIcon={<GradeIcon />}
                                onClick={() => navigate(`/Admin/subject/student/marks/${student.id}/${subjectID}`)}
                              >
                                Marks
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </CardContent>
            </Card>
          )}
        </>
      )}
    </Container>
  );
};

export default ViewSubject;
