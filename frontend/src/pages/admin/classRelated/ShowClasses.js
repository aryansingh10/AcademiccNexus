import { useEffect, useState } from 'react';
import {
  IconButton, Box, Menu, MenuItem, ListItemIcon, Tooltip, Typography, CircularProgress
} from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';

import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AddCardIcon from '@mui/icons-material/AddCard';
import styled from 'styled-components';
import Popup from '../../../components/Popup';

const ShowClasses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { sclassesList, loading, error, getresponse } = useSelector((state) => state.sclass);
  const { currentUser } = useSelector(state => state.user);
  const adminID = currentUser?._id;

  useEffect(() => {
    if (adminID) {
      dispatch(getAllSclasses(adminID, "Sclass"));
    }
  }, [adminID, dispatch]);

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const deleteHandler = (deleteID, address) => {
    setMessage("Sorry, the delete function has been disabled for now.");
    setShowPopup(true);
  };

  const sclassColumns = [{ id: 'name', label: 'Class Name', minWidth: 170 }];

  const sclassRows = sclassesList?.map((sclass) => ({
    name: sclass.sclassName,
    id: sclass._id,
  })) || [];

  const SclassButtonHaver = ({ row }) => {
    const actions = [
      { icon: <PostAddIcon />, name: 'Add Subjects', action: () => navigate(`/Admin/addsubject/${row.id}`) },
      { icon: <PersonAddAlt1Icon />, name: 'Add Student', action: () => navigate(`/Admin/class/addstudents/${row.id}`) },
    ];

    return (
      <ButtonContainer>
        <Tooltip title="Delete Class">
          <IconButton onClick={() => deleteHandler(row.id, "Sclass")} color="secondary">
            <DeleteIcon color="error" />
          </IconButton>
        </Tooltip>
        <BlueButton variant="contained" onClick={() => navigate(`/Admin/classes/class/${row.id}`)}>
          View
        </BlueButton>
        <ActionMenu actions={actions} />
      </ButtonContainer>
    );
  };

  const ActionMenu = ({ actions }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
      <>
        <Tooltip title="More Actions">
          <IconButton onClick={handleClick} sx={{ ml: 2 }}>
            <SpeedDialIcon />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{ elevation: 3, sx: styles.styledPaper }}
        >
          {actions.map((action, index) => (
            <MenuItem key={index} onClick={action.action}>
              <ListItemIcon>{action.icon}</ListItemIcon>
              {action.name}
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  };

  const actions = [
    { icon: <AddCardIcon color="primary" />, name: 'Add New Class', action: () => navigate("/Admin/addclass") },
    { icon: <DeleteIcon color="error" />, name: 'Delete All Classes', action: () => deleteHandler(adminID, "Sclasses") },
  ];

  return (
    <Box sx={{ padding: '24px' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
        Manage Classes
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {error && (
            <Typography color="error" sx={{ textAlign: 'center', mb: 2 }}>
              Error: {error}
            </Typography>
          )}

          {getresponse ? (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              <GreenButton variant="contained" onClick={() => navigate("/Admin/addclass")}>
                Add Class
              </GreenButton>
            </Box>
          ) : (
            <>
              {Array.isArray(sclassesList) && sclassesList.length > 0 ? (
                <TableTemplate buttonHaver={SclassButtonHaver} columns={sclassColumns} rows={sclassRows} />
              ) : (
                <Typography sx={{ textAlign: 'center', mt: 3, fontSize: 18, fontStyle: 'italic' }}>
                  No classes found. Add new classes to get started.
                </Typography>
              )}
              <SpeedDial
                ariaLabel="SpeedDial Actions"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
              >
                {actions.map((action, index) => (
                  <SpeedDialAction
                    key={index}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={action.action}
                  />
                ))}
              </SpeedDial>
            </>
          )}
        </>
      )}

      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </Box>
  );
};

export default ShowClasses;

const styles = {
  styledPaper: {
    overflow: 'visible',
    filter: 'drop-shadow(0px 4px 10px rgba(0,0,0,0.3))',
    mt: 1.5,
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  },
};

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;
