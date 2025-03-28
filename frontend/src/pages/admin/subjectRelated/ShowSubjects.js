import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import {
    Paper, Box, IconButton, Tooltip, CircularProgress, Container, Typography, Stack
} from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import DeleteIcon from "@mui/icons-material/Delete";
import TableTemplate from '../../../components/TableTemplate';
import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';

const ShowSubjects = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { subjectsList, loading, error } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getSubjectList(currentUser._id, "AllSubjects"));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.error("Error fetching subjects:", error);
    }

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const deleteHandler = (deleteID, address) => {
        setMessage("Sorry, the delete function has been disabled for now.");
        setShowPopup(true);

        // dispatch(deleteUser(deleteID, address))
        //     .then(() => {
        //         dispatch(getSubjectList(currentUser._id, "AllSubjects"));
        //     })
    };

    const subjectColumns = [
        { id: 'subName', label: 'Subject Name', minWidth: 200 },
        { id: 'sessions', label: 'Total Sessions', minWidth: 150 },
        { id: 'sclassName', label: 'Class', minWidth: 150 },
    ];

    const subjectRows = subjectsList?.map((subject) => ({
        subName: subject.subName,
        sessions: subject.sessions,
        sclassName: subject.sclassName?.sclassName || "N/A",
        sclassID: subject.sclassName?._id,
        id: subject._id,
    }));

    const SubjectsButtonHaver = ({ row }) => (
        <Stack direction="row" spacing={1}>
            <Tooltip title="Delete Subject">
                <IconButton onClick={() => deleteHandler(row.id, "Subject")}>
                    <DeleteIcon color="error" />
                </IconButton>
            </Tooltip>
            <BlueButton 
                variant="contained" 
                size="small" 
                onClick={() => navigate(`/Admin/subjects/subject/${row.sclassID}/${row.id}`)}
            >
                View
            </BlueButton>
        </Stack>
    );

    const actions = [
        {
            icon: <PostAddIcon color="primary" />, name: 'Add New Subject',
            action: () => navigate("/Admin/subjects/chooseclass")
        },
        {
            icon: <DeleteIcon color="error" />, name: 'Delete All Subjects',
            action: () => deleteHandler(currentUser._id, "Subjects")
        }
    ];

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" sx={{ my: 3, textAlign: 'center', fontWeight: 'bold' }}>
                Manage Subjects
            </Typography>

            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <Box display="flex" justifyContent="flex-end" my={2}>
                        <GreenButton variant="contained" onClick={() => navigate("/Admin/subjects/chooseclass")}>
                            Add Subjects
                        </GreenButton>
                    </Box>

                    <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 2, p: 2 }}>
                        {Array.isArray(subjectsList) && subjectsList.length > 0 ? (
                            <TableTemplate buttonHaver={SubjectsButtonHaver} columns={subjectColumns} rows={subjectRows} />
                        ) : (
                            <Typography textAlign="center" sx={{ py: 4 }} color="text.secondary">
                                No subjects available.
                            </Typography>
                        )}
                        <SpeedDialTemplate actions={actions} />
                    </Paper>
                </>
            )}

            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Container>
    );
};

export default ShowSubjects;
