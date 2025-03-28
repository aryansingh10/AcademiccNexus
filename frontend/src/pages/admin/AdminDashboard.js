import { useState } from 'react';
import {
    CssBaseline,
    Box,
    Toolbar,
    List,
    Typography,
    Divider,
} from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppBar, Drawer } from '../../components/styles';
import Logout from '../Logout';
import SideBar from './SideBar';
import AdminProfile from './AdminProfile';
import AdminHomePage from './AdminHomePage';

import AddStudent from './studentRelated/AddStudent';
import SeeComplains from './studentRelated/SeeComplains';
import ShowStudents from './studentRelated/ShowStudents';
import StudentAttendance from './studentRelated/StudentAttendance';
import StudentExamMarks from './studentRelated/StudentExamMarks';
import ViewStudent from './studentRelated/ViewStudent';

import AddNotice from './noticeRelated/AddNotice';
import ShowNotices from './noticeRelated/ShowNotices';

import ShowSubjects from './subjectRelated/ShowSubjects';
import SubjectForm from './subjectRelated/SubjectForm';
import ViewSubject from './subjectRelated/ViewSubject';

import AddTeacher from './teacherRelated/AddTeacher';
import ChooseClass from './teacherRelated/ChooseClass';
import ChooseSubject from './teacherRelated/ChooseSubject';
import ShowTeachers from './teacherRelated/ShowTeachers';
import TeacherDetails from './teacherRelated/TeacherDetails';

import AddClass from './classRelated/AddClass';
import ClassDetails from './classRelated/ClassDetails';
import ShowClasses from './classRelated/ShowClasses';
import AccountMenu from '../../components/AccountMenu';

const AdminDashboard = () => {
    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <CssBaseline />
            {/* Permanent Sidebar */}
            <Drawer variant="permanent" sx={styles.drawerStyled}>
                <Toolbar sx={styles.toolBarStyled}>
                    <Typography variant="h6" color="white">
                        Admin Dashboard
                    </Typography>
                </Toolbar>
                <Divider />
                <List component="nav">
                    <SideBar />
                </List>
            </Drawer>
            {/* Main Content */}
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Top Bar without Admin Dashboard Text */}
                <AppBar position='static' sx={styles.appBarStyled}>
                    <Toolbar>
                    <Box sx={{ flexGrow: 1 }} /> 
                      <AccountMenu />
                    </Toolbar>
                </AppBar>
                {/* Content Area */}
                <Box component="main" sx={styles.boxStyled}>
                    <Routes>
                        <Route path="/" element={<AdminHomePage />} />
                        <Route path='*' element={<Navigate to="/" />} />
                        <Route path="/Admin/dashboard" element={<AdminHomePage />} />
                        <Route path="/Admin/profile" element={<AdminProfile />} />
                        <Route path="/Admin/complains" element={<SeeComplains />} />
                        <Route path="/Admin/addnotice" element={<AddNotice />} />
                        <Route path="/Admin/notices" element={<ShowNotices />} />
                        <Route path="/Admin/subjects" element={<ShowSubjects />} />
                        <Route path="/Admin/subjects/subject/:classID/:subjectID" element={<ViewSubject />} />
                        <Route path="/Admin/subjects/chooseclass" element={<ChooseClass situation="Subject" />} />
                        <Route path="/Admin/addsubject/:id" element={<SubjectForm />} />
                        <Route path="/Admin/class/subject/:classID/:subjectID" element={<ViewSubject />} />
                        <Route path="/Admin/subject/student/attendance/:studentID/:subjectID" element={<StudentAttendance situation="Subject" />} />
                        <Route path="/Admin/subject/student/marks/:studentID/:subjectID" element={<StudentExamMarks situation="Subject" />} />
                        <Route path="/Admin/addclass" element={<AddClass />} />
                        <Route path="/Admin/classes" element={<ShowClasses />} />
                        <Route path="/Admin/classes/class/:id" element={<ClassDetails />} />
                        <Route path="/Admin/class/addstudents/:id" element={<AddStudent situation="Class" />} />
                        <Route path="/Admin/addstudents" element={<AddStudent situation="Student" />} />
                        <Route path="/Admin/students" element={<ShowStudents />} />
                        <Route path="/Admin/students/student/:id" element={<ViewStudent />} />
                        <Route path="/Admin/students/student/attendance/:id" element={<StudentAttendance situation="Student" />} />
                        <Route path="/Admin/students/student/marks/:id" element={<StudentExamMarks situation="Student" />} />
                        <Route path="/Admin/teachers" element={<ShowTeachers />} />
                        <Route path="/Admin/teachers/teacher/:id" element={<TeacherDetails />} />
                        <Route path="/Admin/teachers/chooseclass" element={<ChooseClass situation="Teacher" />} />
                        <Route path="/Admin/teachers/choosesubject/:id" element={<ChooseSubject situation="Norm" />} />
                        <Route path="/Admin/teachers/choosesubject/:classID/:teacherID" element={<ChooseSubject situation="Teacher" />} />
                        <Route path="/Admin/teachers/addteacher/:id" element={<AddTeacher />} />
                        <Route path="/logout" element={<Logout />} />
                    </Routes>
                </Box>
            </Box>
        </Box>
    );
}

export default AdminDashboard;

const styles = {
    drawerStyled: {
        width: '260px',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
            width: '260px',
            backgroundColor: '#2C3E50',
            color: 'white',
        },
    },
    toolBarStyled: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        backgroundColor: '#1E88E5',
        color: 'white',
    },
    appBarStyled: {
        backgroundColor: '#1E88E5',
        color: 'white',
    },
    boxStyled: {
        flexGrow: 1,
        backgroundColor: '#f4f6f8',
        padding: '24px',
        borderRadius: '10px',
    },
};
