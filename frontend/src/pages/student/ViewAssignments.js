import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubjectList } from "../../redux/sclassRelated/sclassHandle";
import { Typography, Button, Container, Grid, Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const ViewAssignments = () => {
  const dispatch = useDispatch();
  const { subjectsList, sclassDetails } = useSelector((state) => state.sclass);

  console.log(subjectsList);

  return (
    <Container maxWidth="md" sx={{ paddingTop: "20px" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        View Assignments
      </Typography>
      <Grid container spacing={3}>
        {subjectsList.map((result, index) => {
          return (
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, textAlign: "center", height: "100%" }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  {result.subName} - {result.subCode}
                </Typography>
                <Link
                  to="/viewassignment"
                  style={{ textDecoration: "none" }}
                >
                  <Button variant="contained" color="primary">
                    View {result.subName} Assignments
                  </Button>
                </Link>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default ViewAssignments;
