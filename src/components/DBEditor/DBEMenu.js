import * as React from 'react';

import { TextField, List, ListItem, Box } from "@mui/material";
import { styled } from '@mui/system';

const StyledListItem = styled(ListItem, {
  name: "StyledListItem",
  slot: "Wrapper"
})({
    paddingLeft: '5px',
    cursor: 'pointer',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: "text.disabled",
  },
});

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
}

function DBEMenu({ x, y, ui, cs, ctd, dt, cc, dc, rtd, rcd }) {
  const [updateItem] = React.useState(ui);
  const [xPos] = React.useState(x);
  const [yPos] = React.useState(y);
  const [currentSelection] = React.useState(cs);
  const [showCreateTableDialog] = React.useState(ctd);
  const [showRenameTableDialog] = React.useState(rtd);
  const [showDeleteTableDialog] = React.useState(dt);
  const [showCreateColumnDialog] = React.useState(cc);
  const [showDeleteColumnDialog] = React.useState(dc);
  const [showRenameColumnDialog] = React.useState(rcd);

  const createHeaderMenu = (key) => {
    const ON_HEADER_ROW = 0;
    if (key === ON_HEADER_ROW) {
      return (
        <List
          sx={{
            ...menuBox,
            top: yPos,
            left: xPos
          }}
        >
          <StyledListItem onClick={() => showCreateTableDialog(true)}>Create new table</StyledListItem>
          <StyledListItem onClick={() => showDeleteTableDialog(true)}>Delete this table</StyledListItem>
          <StyledListItem onClick={() => showRenameTableDialog(true)}>Rename this table</StyledListItem>
          <StyledListItem onClick={() => showCreateColumnDialog(true)}>Add column</StyledListItem>
          <StyledListItem onClick={() => showRenameColumnDialog(true)}>Rename this column</StyledListItem>
        </List>
      );
    } else {
      return (
        <List
          sx={{
            ...menuBox,
            top: yPos,
            left: xPos
          }}
        >
          <StyledListItem onClick={() => showCreateTableDialog(true)}>Create new table</StyledListItem>
          <StyledListItem onClick={() => showDeleteTableDialog(true)}>Delete this table</StyledListItem>
          <StyledListItem onClick={() => showRenameTableDialog(true)}>Rename this table</StyledListItem>
          <StyledListItem onClick={() => showCreateColumnDialog(true)}>Add column</StyledListItem>
          <StyledListItem onClick={() => showDeleteColumnDialog(true)}>Remove column</StyledListItem>
          <StyledListItem onClick={() => showRenameColumnDialog(true)}>Rename this column</StyledListItem>
        </List>
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
          // className={classes.menu}
          sx={{
            top: yPos,
            left: xPos,
            // opacity: "1",
            // backgroundColor: "white"
          }}
        >
          <TextField
            sx={{ zIndex: "100", backgroundColor: "white" }}
            id="outlined-basic" 
            label="New Value" 
            variant="outlined" 
            defaultValue={currentSelection.value}
            onKeyUp={(e) => textEntered(e)}
            onClick={editorClicked}
            autoFocus />
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