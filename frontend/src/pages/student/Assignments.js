import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubjectList } from "../../redux/sclassRelated/sclassHandle";
import { Table, TableBody, TableHead, Typography, Input } from "@mui/material";

import { StyledTableCell, StyledTableRow } from "../../components/styles";
import { Link, useNavigate } from "react-router-dom";

const Assignments = () => {
  const subjectAssignments = [
    {
      title: "Assignment-1",
      deadline: "04/04/2024",
      url: "https://docs.google.com/document/d/14BbMovlbfz8knkrL9uYMg5RVU66fuBD1zCPCGX_qmEw/edit?usp=drive_link",
    },
    {
      title: "Assignment-2",
      deadline: "07/04/2024",
      url: "https://docs.google.com/document/d/1TvrttA6WCZvriG6ZedwnQeoA7RPn5BY3ZffFPvgGuao/edit?usp=drive_link",
    },
    {
      title: "Assignment-3",
      deadline: "18/04/2024",
      url: "https://docs.google.com/document/d/1aHVODXnHhn4BOcDzqNj4sNag5erpUFumelHqfJ4WtyY/edit?usp=drive_link",
    },
  ];
  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        Assignment
      </Typography>

      <Table>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Subject</StyledTableCell>
            <StyledTableCell>Deadline</StyledTableCell>
            <StyledTableCell>Link</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {subjectAssignments.map((result, index) => {
            return (
              <StyledTableRow key={index}>
                <StyledTableCell>{result.title}</StyledTableCell>
                <StyledTableCell>{result.deadline}</StyledTableCell>
                <StyledTableCell>
                    <Link to={result.url} download={result.title}>
                        Download {result.title} 
                    </Link>
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default Assignments;
