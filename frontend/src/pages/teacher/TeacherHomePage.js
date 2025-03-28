import { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Divider,
  Avatar,
  IconButton,
  Chip,
  LinearProgress,
  Skeleton,
} from '@mui/material';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import styled from 'styled-components';
import Students from '../../assets/img1.png';
import Lessons from '../../assets/subjects.svg';
import Tests from '../../assets/assignment.svg';
import Time from '../../assets/time.svg';
import {
  getClassStudents,
  getSubjectDetails,
} from '../../redux/sclassRelated/sclassHandle';
import { useDispatch, useSelector } from 'react-redux';
import { School, Event, CalendarMonth, MoreVert } from '@mui/icons-material';

const TeacherHomePage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const { currentUser } = useSelector((state) => state.user);
  const { subjectDetails, sclassStudents } = useSelector(
    (state) => state.sclass
  );

  const classID = currentUser?.teachSclass?._id;
  const subjectID = currentUser?.teachSubject?._id;

  // Stats
  const numberOfStudents = sclassStudents?.length || 0;
  const numberOfSessions = subjectDetails?.sessions || 0;
  const testsTaken = currentUser?.testsTaken || 0;
  const teachingHours = currentUser?.teachingHours || 35; // Fallback value if not available

  // Sessions from subject details
  const upcomingSessions = subjectDetails?.upcomingSessions || [];

  // Getting top students based on marks/attendance
  const topStudents = sclassStudents ? getTopStudents(sclassStudents) : [];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (subjectID) {
        await dispatch(getSubjectDetails(subjectID, 'Subject'));
      }
      if (classID) {
        await dispatch(getClassStudents(classID));
      }
      setLoading(false);
    };

    fetchData();
  }, [dispatch, subjectID, classID]);

  // Function to get top performing students
  function getTopStudents(students) {
    if (!students || students.length === 0) return [];

    // Sort students by attendance and grades (you can adjust this logic based on your data structure)
    const sortedStudents = [...students].sort((a, b) => {
      // This is an example - adjust based on your actual student data structure
      const aAttendance = a.attendance || 0;
      const bAttendance = b.attendance || 0;

      // Sort by attendance as primary criteria
      return bAttendance - aAttendance;
    });

    // Return top 3 students or fewer if there aren't 3
    return sortedStudents.slice(0, 3);
  }

  // Calculate completion percentage for sessions
  const calculateSessionProgress = (session) => {
    const today = new Date();
    const sessionDate = new Date(session.date);

    // If session is in the past, it's 100% complete
    if (sessionDate < today) return 100;

    // If session is today, calculate based on time
    if (sessionDate.toDateString() === today.toDateString()) {
      const sessionTime = session.time?.split(':') || [0, 0];
      const sessionHour = parseInt(sessionTime[0]);
      const currentHour = today.getHours();

      // Simple calculation based on hour of the day
      if (currentHour >= sessionHour) return 100;
      return (currentHour / sessionHour) * 100;
    }

    // Future session has 0% progress
    return 0;
  };

  // Placeholder data for sessions if none exist
  const getSessionsDisplay = () => {
    if (loading) {
      return [1, 2, 3].map((i) => (
        <SessionCard key={i}>
          <Skeleton variant="text" width="70%" height={30} />
          <Skeleton variant="text" width="40%" height={20} />
          <Skeleton
            variant="rectangular"
            height={6}
            width="100%"
            sx={{ mt: 1, borderRadius: 3 }}
          />
        </SessionCard>
      ));
    }

    if (!upcomingSessions || upcomingSessions.length === 0) {
      // Generate placeholder sessions based on subject details
      const placeholderSessions = [];

      if (subjectDetails && subjectDetails.subName) {
        // Create some placeholder sessions for the next 3 days
        for (let i = 0; i < 3; i++) {
          const date = new Date();
          date.setDate(date.getDate() + i);

          placeholderSessions.push({
            id: i + 1,
            title: `${subjectDetails.subName} Session ${i + 1}`,
            date: date.toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            }),
            time: `${9 + i}:00 AM`,
            progress: i === 0 ? 50 : 0, // First session in progress
          });
        }
      }

      if (placeholderSessions.length === 0) {
        return (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography color="text.secondary">
              No upcoming sessions scheduled
            </Typography>
          </Box>
        );
      }

      return placeholderSessions.map((session) => (
        <SessionCard key={session.id}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <Box>
              <Typography variant="subtitle1" fontWeight="medium">
                {session.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {session.date} • {session.time}
              </Typography>
            </Box>
            <IconButton size="small">
              <MoreVert fontSize="small" />
            </IconButton>
          </Box>
          <Box sx={{ mt: 1, mb: 1 }}>
            <LinearProgress
              variant="determinate"
              value={session.progress}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: 'rgba(0,0,0,0.08)',
              }}
            />
          </Box>
        </SessionCard>
      ));
    }

    return upcomingSessions.map((session) => {
      const progress = calculateSessionProgress(session);

      return (
        <SessionCard key={session.id || session._id}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <Box>
              <Typography variant="subtitle1" fontWeight="medium">
                {session.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {session.date} • {session.time || 'Time TBD'}
              </Typography>
            </Box>
            <IconButton size="small">
              <MoreVert fontSize="small" />
            </IconButton>
          </Box>
          <Box sx={{ mt: 1, mb: 1 }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: 'rgba(0,0,0,0.08)',
              }}
            />
          </Box>
        </SessionCard>
      );
    });
  };

  // Display for top students
  const getStudentsDisplay = () => {
    if (loading) {
      return [1, 2, 3].map((i) => (
        <Box
          key={i}
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2,
            p: 2,
            borderRadius: 2,
            backgroundColor: 'rgba(0,0,0,0.02)',
          }}
        >
          <Skeleton variant="circular" width={40} height={40} />
          <Box sx={{ ml: 2, flexGrow: 1 }}>
            <Skeleton variant="text" width="60%" height={24} />
            <Skeleton variant="text" width="40%" height={20} />
          </Box>
          <Skeleton
            variant="rectangular"
            width={40}
            height={24}
            sx={{ borderRadius: 1 }}
          />
        </Box>
      ));
    }

    if (!topStudents || topStudents.length === 0) {
      return (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography color="text.secondary">
            No student data available
          </Typography>
        </Box>
      );
    }

    return topStudents.map((student, index) => (
      <Box
        key={student._id || index}
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2,
          p: 2,
          borderRadius: 2,
          backgroundColor: 'rgba(0,0,0,0.02)',
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.04)',
          },
        }}
      >
        <Avatar sx={{ bgcolor: `hsl(${(index + 1) * 100}, 80%, 70%)` }}>
          {student.name ? student.name.charAt(0) : 'S'}
          {/* {console.log('student', student)} */}
        </Avatar>
        <Box sx={{ ml: 2, flexGrow: 1 }}>
          <Typography variant="subtitle1" fontWeight="medium">
            {student.name || `Student ${index + 1}`};
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Attendance: {student.attendance ? `${student.attendance}%` : 'N/A'}
          </Typography>
        </Box>
        <Chip
          label={student.grade || 'N/A'}
          color={
            student.grade === 'A+' || student.grade === 'A'
              ? 'success'
              : 'primary'
          }
          size="small"
          sx={{ fontWeight: 'bold' }}
        />
      </Box>
    ));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Welcome Section */}
      <WelcomeCard elevation={3}>
        <Box className="content">
          <Box>
            <Typography variant="h4" component="h1" fontWeight="bold">
              Welcome back, {currentUser?.name || 'Teacher'}!
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Chip
                icon={<School />}
                label={`Class: ${
                  currentUser?.teachSclass?.sclassName || 'Not assigned'
                }`}
                sx={{ mr: 1, mb: 1 }}
                color="primary"
                variant="outlined"
              />
              <Chip
                icon={<Event />}
                label={`Subject: ${
                  currentUser?.teachSubject?.subName || 'Not assigned'
                }`}
                sx={{ mr: 1, mb: 1 }}
                color="secondary"
                variant="outlined"
              />
            </Box>
          </Box>
        </Box>
      </WelcomeCard>

      {/* Stats Section */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Students"
            count={numberOfStudents}
            icon={Students}
            color="#4a148c"
            lightColor="#e1bee7"
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Total Lessons"
            count={numberOfSessions}
            icon={Lessons}
            color="#0d47a1"
            lightColor="#bbdefb"
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Tests Taken"
            count={testsTaken}
            icon={Tests}
            color="#1b5e20"
            lightColor="#c8e6c9"
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title="Teaching Hours"
            count={teachingHours}
            icon={Time}
            suffix="hrs"
            color="#b71c1c"
            lightColor="#ffcdd2"
            loading={loading}
          />
        </Grid>
      </Grid>

      {/* Notices */}
      <Grid item xs={12}>
        <Paper sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            Recent Notices
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <SeeNotice />
        </Paper>
      </Grid>
    </Container>
  );
};

// Styled Components
const WelcomeCard = styled(Paper)`
  display: flex;
  padding: 24px;
  border-radius: 16px;
  background: linear-gradient(
    135deg,
    rgb(111, 133, 255) 0%,
    rgb(156, 168, 248) 100%
  );
  color: white;
  position: relative;
  overflow: hidden;

  .content {
    z-index: 1;
    flex: 1;
  }

  .illustration {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    img {
      max-height: 180px;
      max-width: 100%;
    }

    @media (max-width: 600px) {
      display: none;
    }
  }
`;

const StatsCard = ({
  title,
  count,
  icon,
  suffix = '',
  color,
  lightColor,
  loading,
}) => {
  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 2,
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
        },
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography
              color="text.secondary"
              variant="subtitle2"
              fontWeight="medium"
            >
              {title}
            </Typography>
            {loading ? (
              <Skeleton
                variant="rectangular"
                width={80}
                height={40}
                sx={{ mt: 1 }}
              />
            ) : (
              <Typography variant="h4" sx={{ mt: 1, fontWeight: 'bold' }}>
                <CountUp end={count} duration={2} suffix={suffix} />
              </Typography>
            )}
          </Box>
          <Avatar
            sx={{
              bgcolor: lightColor,
              p: 1,
              width: 60,
              height: 60,
            }}
          >
            {loading ? (
              <Skeleton variant="circular" width={40} height={40} />
            ) : (
              <img
                src={icon}
                alt={title}
                style={{ width: '70%', height: '70%' }}
              />
            )}
          </Avatar>
        </Box>
        <Box sx={{ mt: 2 }}>
          {loading ? (
            <Skeleton
              variant="rectangular"
              height={6}
              width="100%"
              sx={{ borderRadius: 3 }}
            />
          ) : (
            <LinearProgress
              variant="determinate"
              // Progress based on the relationship between count and a reference value
              // This logic can be adjusted based on your specific needs
              value={count > 0 ? Math.min(count * 5, 100) : 0}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: 'rgba(0,0,0,0.08)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: color,
                },
              }}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

const SessionCard = styled(Box)`
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.02);
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  }
`;

export default TeacherHomePage;
