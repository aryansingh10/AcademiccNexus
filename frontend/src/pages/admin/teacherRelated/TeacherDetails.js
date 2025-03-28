import React, { useEffect, useCallback } from "react";
import { getTeacherDetails } from "../../../redux/teacherRelated/teacherHandle";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
    Button, Container, Typography, CircularProgress, Alert, Card, CardContent, Grid 
} from "@mui/material";

const TeacherDetails = () => {
    const navigate = useNavigate();
    const { id: teacherID } = useParams();
    const dispatch = useDispatch();
    const { loading, teacherDetails, error } = useSelector((state) => state.teacher);

    useEffect(() => {
        dispatch(getTeacherDetails(teacherID));
    }, [dispatch, teacherID]);

    const handleAddSubject = useCallback(() => {
        navigate(`/Admin/teachers/choosesubject/${teacherDetails?.teachSclass?._id}/${teacherDetails?._id}`);
    }, [navigate, teacherDetails]);

    if (loading) {
        return (
            <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
                <CircularProgress size={50} />
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 5 }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", color: "#1976D2" }}>
                Teacher Details
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            <Card elevation={3} sx={{ p: 3, borderRadius: "12px", backgroundColor: "#f5f5f5" }}>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                Teacher Name: <span style={{ fontWeight: "normal" }}>{teacherDetails?.name || "N/A"}</span>
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                Class Name: <span style={{ fontWeight: "normal" }}>{teacherDetails?.teachSclass?.sclassName || "N/A"}</span>
                            </Typography>
                        </Grid>

                        {teacherDetails?.teachSubject?.subName ? (
                            <>
                                <Grid item xs={12}>
                                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                        Subject Name: <span style={{ fontWeight: "normal" }}>{teacherDetails?.teachSubject?.subName}</span>
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                        Subject Sessions: <span style={{ fontWeight: "normal" }}>{teacherDetails?.teachSubject?.sessions}</span>
                                    </Typography>
                                </Grid>
                            </>
                        ) : (
                            <Grid item xs={12}>
                                <Button 
                                    variant="contained" 
                                    onClick={handleAddSubject} 
                                    sx={{
                                        background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                                        color: "#fff",
                                        fontWeight: "bold",
                                        padding: "10px 20px",
                                        borderRadius: "8px",
                                        "&:hover": { background: "#1976D2" }
                                    }}
                                    fullWidth
                                >
                                    Add Subject
                                </Button>
                            </Grid>
                        )}
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
};

export default TeacherDetails;
