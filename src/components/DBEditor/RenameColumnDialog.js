import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function RenameColumnDialog( { openDlg, setOpen, renameCallback, tableName, oldColumnName } ) {
  const [show, setShow] = React.useState(openDlg);
  const [setShowDlg] = React.useState(setOpen);
  const [rename] = React.useState(renameCallback);

  React.useEffect(() => {
    setShow(openDlg);
  }, [openDlg]);

  const handleClose = (request) => {
    setShowDlg(false);
    if (request === "rename") {
      const newColumnName = document.getElementById("newcolumnname").value;
      rename(tableName, newColumnName, oldColumnName);
    }
  };

  const textEntered = (e) => {
    if (e.key === "Escape") {
      setShowDlg(false);
    } else if (e.key === "Enter") {
      setShowDlg(false);
      const newColumnName = document.getElementById("newcolumnname").value;
      rename(tableName, newColumnName, oldColumnName);
    }
  }

  return (
    <div>
      <Dialog open={show} onClose={handleClose}>
        <DialogTitle>Rename Column</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the new column name.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="newcolumnname"
            label="New Column Name"
            type="text"
            fullWidth
            variant="standard"
            onKeyUp={(e) => textEntered(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose("cancel")}>Cancel</Button>
          <Button onClick={() => handleClose("rename")}>Rename Column</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}