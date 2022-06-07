import { useState } from 'react';

import { TextField, Tooltip, Box, Menu, MenuItem } from "@mui/material";
import { styled } from '@mui/system';

const StyledBox = styled(Box, {
  name: "StyledBox",
  slot: "Wrapper"
})({
  zIndex: "100",
  fontSize: "14px",
  backgroundColor: "#fff",
  borderRadius: "2px",
  padding: "5px 0 5px 0",
  width: "150px",
  height: "auto",
  margin: "0",
  /* use absolute positioning  */
  position: "absolute",
  listStyle: "none",
  boxShadow: "0 0 20px 0 #ccc",
  opacity: "1",
  // transition: "opacity 0.5s linear",
});

const menuBox = {
  zIndex: "100",
  fontSize: "14px",
  // bgcolor: "background.lightestBlue",
  // borderRadius: "2px",
  // padding: "5px 0 5px 0",
  // width: "150px",
  // height: "auto",
  margin: "0",
  /* use absolute positioning  */
  position: "absolute",
  listStyle: "none",
  boxShadow: "0 0 20px 0 #ccc",
  opacity: "1",
}

function DBEMenu({ x, y, anchorElement, ui, cs, ctd, dt, cc, dc, rtd, rcd }) {
  const [updateItem] = useState(ui);
  const [anchorEl, setAnchorEl] = useState(anchorElement);
  const [xPos] = useState(x);
  const [yPos] = useState(y);
  const [currentSelection] = useState(cs);
  const [showCreateTableDialog] = useState(ctd);
  const [showRenameTableDialog] = useState(rtd);
  const [showDeleteTableDialog] = useState(dt);
  const [showCreateColumnDialog] = useState(cc);
  const [showDeleteColumnDialog] = useState(dc);
  const [showRenameColumnDialog] = useState(rcd);
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  }

  const createHeaderMenu = (key) => {
    const ON_HEADER_ROW = 0;
    if (key === ON_HEADER_ROW) {
      return (
        <Menu
          sx={{
            ...menuBox,
          }}
          id="dbmenu"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={() => showCreateTableDialog(true)}>Create new table</MenuItem>
          <MenuItem onClick={() => showDeleteTableDialog(true)}>Delete this table</MenuItem>
          <MenuItem onClick={() => showRenameTableDialog(true)}>Rename this table</MenuItem>
          <MenuItem onClick={() => showCreateColumnDialog(true)}>Add column</MenuItem>
          <MenuItem onClick={() => showRenameColumnDialog(true)}>Rename this column</MenuItem>
        </Menu>
      );
    } else {
      return (
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          sx={{
            ...menuBox,
          }}
        >
          <MenuItem onClick={() => showCreateTableDialog(true)}>Create new table</MenuItem>
          <MenuItem onClick={() => showDeleteTableDialog(true)}>Delete this table</MenuItem>
          <MenuItem onClick={() => showRenameTableDialog(true)}>Rename this table</MenuItem>
          <MenuItem onClick={() => showCreateColumnDialog(true)}>Add column</MenuItem>
          <MenuItem onClick={() => showDeleteColumnDialog(true)}>Remove column</MenuItem>
          <MenuItem onClick={() => showRenameColumnDialog(true)}>Rename this column</MenuItem>
        </Menu>
      );
    }
  }

  const textEntered = (e) => {
    if (e.key === "Escape") {
      updateItem(null);
    } else if (e.key === "Enter") {
      updateItem(currentSelection.id, currentSelection.columnName, e.target.value);
    }
  }

  const editorClicked = (e) => {
    e.stopPropagation();
  }

  const createRowDataEditor = (columnName) => {
    if (columnName !== "id") {
      return (
        <StyledBox
          sx={{
            top: yPos,
            left: xPos,
            // opacity: "1",
            bgcolor: "background.lightestBlue"
          }}
        >
          <Tooltip title="While selected escape to close">
            <TextField
              sx={{ zIndex: "100", backgroundColor: "white" }}
              id="outlined-basic"
              label="New Value"
              variant="outlined"
              defaultValue={currentSelection.value}
              onKeyUp={(e) => textEntered(e)}
              onClick={editorClicked}
              autoFocus />
          </Tooltip>
        </StyledBox>
      )
    }
  }

  return (
    <div>
      {currentSelection.id === "header" ?
        createHeaderMenu(currentSelection.id) :
        createRowDataEditor(currentSelection.columnName)
      }
    </div>
  );
}

export default DBEMenu;