import React, { useState } from 'react';
import { Button, Container, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const StudentSubjects = () => {
    const [selectedSection, setSelectedSection] = useState(null);

    const handleSectionChange = (section) => {
        setSelectedSection(section);
    };

    return (
        <Container>
            <Typography variant="h4" align="center" gutterBottom>
                Choose an Option
            </Typography>
            <Grid container spacing={2} justifyContent="center">
                <Grid item>
                    <Button variant="contained" component={Link} to="/view-marks">
                        Marks
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" component={Link} to="/view-lectures">
                        Lectures
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" component={Link} to="/view-assignments">
                        Assignments
                    </Button>
                </Grid>
            </Grid>
            {selectedSection === 'marks' && (
                <div>
                    <Typography variant="h5" align="center" gutterBottom>
                        Marks Section
                    </Typography>
                    {/* Logic to display marks */}
                </div>
            )}
            {selectedSection === 'lectures' && (
                <div>
                    <Typography variant="h5" align="center" gutterBottom>
                        Lectures Section
                    </Typography>
                    {/* Logic to display lectures */}
                </div>
            )}
        </Container>
    );
};

export default StudentSubjects;
