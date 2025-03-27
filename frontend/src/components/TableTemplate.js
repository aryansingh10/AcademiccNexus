import React, { useState } from 'react';
import { StyledTableCell, StyledTableRow } from './styles';
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  Paper,
  Box,
} from '@mui/material';

const TableTemplate = ({ buttonHaver: ButtonHaver, columns, rows }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  return (
    <Box sx={{ padding: 2 }}>
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
        <Table stickyHeader aria-label="customized table">
          <TableHead>
            <StyledTableRow sx={{ backgroundColor: '#1976D2' }}>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    fontWeight: 'bold',
                    color: '#fff',
                  }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
              <StyledTableCell
                align="center"
                sx={{ fontWeight: 'bold', color: '#fff' }}
              >
                Actions
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <StyledTableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                  sx={{
                    '&:nth-of-type(odd)': { backgroundColor: '#f5f5f5' },
                    '&:hover': { backgroundColor: '#e0f7fa' },
                  }}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <StyledTableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number'
                          ? column.format(value)
                          : value}
                      </StyledTableCell>
                    );
                  })}
                  <StyledTableCell align="center">
                    <ButtonHaver row={row} />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
        sx={{
          '& .MuiTablePagination-root': { backgroundColor: '#f5f5f5' },
          '& .MuiSelect-select': { fontWeight: 'bold' },
        }}
      />
    </Box>
  );
};

export default TableTemplate;
