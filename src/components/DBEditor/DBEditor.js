import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

import DBSelect from './DBSelect';
import DBEMenu from './DBEMenu';
import AddTableDialog from './AddTableDialog';
import RemoveTableDialog from './RemoveTableDialog';
import AddColumnDialog from './AddColumnDialog';
import RemoveColumnDialog from './RemoveColumnDialog';
import RenameTableDialog from './RenameTableDialog';
import RenameColumnDialog from './RenameColumnDialog';

import {
  getTables,
  getTableData,
  updateElement,
  createNewTable,
  dropTable,
  renTable,
  createCol,
  renameCol,
  createNewRow,
  dropCol
} from '../../api';
import { useAuthContext } from '../AuthContext';

// const useStyles = makeStyles(theme => ({
//   bodyItem: {
//     marginTop: "150px",
//   },
//   tableHeader: {
//     marginTop: "50px",
//     backgroundColor: theme.palette.grey[200],
//     padding: theme.spacing(4),
//   },
//   headerElement: {
//     backgroundColor: "#FFFCBB",
//   },
//   tableElement: {
//     backgroundColor: 'white',
//     cursor: 'pointer',
//     '&:hover': {
//       cursor: 'pointer',
//       backgroundColor: theme.palette.grey[100],
//     },
//   },
//   tableIdElement: {
//     '&:hover': {
//       backgroundColor: theme.palette.grey[100],
//     },
//   },
//   menu: {
//     fontSize: "14px",
//     backgroundColor: "#fff",
//     borderRadius: "2px",
//     padding: "5px 0 5px 0",
//     width: "150px",
//     height: "auto",
//     margin: "0",
//     /* use absolute positioning  */
//     position: "absolute",
//     listStyle: "none",
//     boxShadow: "0 0 20px 0 #ccc",
//     opacity: "1",
//     transition: "opacity 0.5s linear",
//   },
//   clickableBackground: {
//     height: "100vh",
//     width: "100vh",
//     backgroundColor: "transparent",
//     top: "0",
//     left: "0",
//     /* use absolute positioning  */
//     position: "absolute",
//     listStyle: "none",
//     // opacity: "0.5",
//     // transition: "opacity 0.5s linear",
//   }
// }));

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


const StyledIdTableCell = styled(TableCell, {
  name: "StyledIdTableCell",
  slot: "Wrapper"
})({
  '&:hover': {
    backgroundColor: "background.lightGray",
  }
});

const StyledTableCell = styled(TableCell, {
  name: "StyledTableCell",
  slot: "Wrapper"
})({
  backgroundColor: 'white',
  cursor: 'pointer',
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: "lightGray",
  },
});

const StyledTableHeaderGrid = styled(Grid, {
  name: "StyledTableHeaderGrid",
  slot: "Wrapper"
})({
  marginTop: "50px", 
  backgroundColor: "lightGray", 
  padding: 4
});

const StyledHeaderGrid = styled(Grid, {
  name: "StyledHeaderGrid",
  slot: "Wrapper"
})({
  marginTop: "50px", 
  padding: 4
})

export default function CustomPaginationActionsTable() {
  const { auth, setAuth } = useAuthContext();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [columnHeaders, setColumnHeaders] = useState([]);
  const [rows, setRows] = useState([]);
  const [tables, setTables] = useState([]);
  const [showAddTblDlg, setShowAddTblDlg] = useState(false);
  const [showRemoveTblDlg, setShowRemoveTblDlg] = useState(false);
  const [showRenameTblDlg, setShowRenameTblDlg] = useState(false);
  const [showAddColDlg, setShowAddColDlg] = useState(false);
  const [showDeleteColDlg, setShowDeleteColDlg] = useState(false);
  const [showRenameColDlg, setShowRenameColDlg] = useState(false);

  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [showDBEMenu, setShowDBEMenu] = useState(false);
  const [currentSelection, setCurrentSelection] = useState({});

  useEffect(() => {
    console.log(JSON.stringify(currentSelection));
  }, [currentSelection]);

  const equalsIgnoreOrder = (a, b) => {
    if (a.length !== b.length) return false;
    const uniqueValues = new Set([...a, ...b]);
    for (const v of uniqueValues) {
      const aCount = a.filter(e => e === v).length;
      const bCount = b.filter(e => e === v).length;
      if (aCount !== bCount) return false;
    }
    return true;
  }

  useEffect(() => {
    getTables()
      .then(response => {
        console.log(response);
        return response;
      })
      .then(tableNames => {
        if (Array.isArray(tableNames)) {
          if (!equalsIgnoreOrder(tables, tableNames)) {
            setTables(tableNames);
          }
        }
      });
  }, [tables]);

  const handleDoubleClick = useCallback(
    (event, id, colName, value, tableName) => {
      event.preventDefault();
      let columnName = colName;
      if (id === "header") { columnName = value };
      const newCS = { id: id, columnName: columnName, value: value, tableName: tableName };
      setCurrentSelection(newCS);
      setAnchorPoint({ x: event.pageX, y: event.pageY });
      setShowDBEMenu(!showDBEMenu);
    },
    [setAnchorPoint, setShowDBEMenu, showDBEMenu]
  );

  useEffect(() => {
    if (!currentSelection || !currentSelection.tableName || currentSelection.tableName === "") {
      setRows([]);
      return;
    };
    const table = currentSelection.tableName;
    getTableData(table)
      // .then(response => response.json())
      .then(response => {
        setRows(response.data);
        let headers = [];
        if (Array.isArray(response.columnNames)) {
          response.columnNames.forEach((element, index) => {
            headers.push(
              <TableCell
                key={index}
                sx={{ 
                  bgcolor: "background.lightBlue",
                  "&:hover": {
                    cursor: "pointer",
                    backgroundColor: "background.darkerBlue",
                  }
                }}
                component="th"
                scope="row"
                onDoubleClick={e => handleDoubleClick(e, "header", index, element, currentSelection.tableName)}>
                  {element} 
              </TableCell>
            );
          });
          setColumnHeaders(headers);
        };
      });
  }, [currentSelection, handleDoubleClick]);

  function createRow(row) {
    const cells = [];
    for (const [key, value] of Object.entries(row)) {
      let keyValue = key + row.id;
      if (key === "id") {
        cells.push(<StyledIdTableCell key={keyValue} onDoubleClick={e => handleDoubleClick(e, row.id, key, value, currentSelection.tableName)} component="th" scope="row">{value}</StyledIdTableCell>);
      } else {
        cells.push(<StyledTableCell key={keyValue} onDoubleClick={e => handleDoubleClick(e, row.id, key, value, currentSelection.tableName)} component="th" scope="row">{value}</StyledTableCell>);
      }
    }
    return (
      <TableRow key={row.id}>
        {cells}
      </TableRow>
    );
  }

  const handleTableChange = (table) => {
    if (currentSelection.tableName !== table) {
      setCurrentSelection(createDefaultCurrentSelection(table));
    }
  }

  const createDefaultCurrentSelection = (name) => {
    const cs = { id: 0, columnName: "", value: "", tableName: name };
    return cs;
  }

  //------------------------------------------------

  // Avoid a layout jump when reaching the last page with empty rows.
  function getEmptyRows() {
    return page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  }

  function hasNoRows() {
    return rows.length === 0;
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  //------------------------------------------------

  const closeMenu = (e) => {
    setShowDBEMenu(false);
  }

  const updateItem = (id, column, value) => {
    if (id === null) {
      closeMenu();
      return;
    }
    setShowDBEMenu(false);
    updateElement(currentSelection.tableName, id, column, value)
      .then(response => response.json())
      .then(response => {
        setCurrentSelection(createDefaultCurrentSelection(currentSelection.tableName));
      });
  }

  const showAddTableDialog = (show) => {
    setShowAddTblDlg(show);
  }

  const showRemoveTableDialog = (show) => {
    setShowRemoveTblDlg(show);
  }

  const showRenameTableDialog = (show) => {
    setShowRenameTblDlg(show);
  }

  const createTable = (tableName, columnName) => {
    createNewTable(tableName, columnName)
      .then(
        function (response) {
          setTables([]);
          setCurrentSelection(createDefaultCurrentSelection(tableName));
        }
      )
  }

  const deleteTable = (tableName) => {
    dropTable(tableName)
      .then(result => {
        setTables([]);
        setCurrentSelection(createDefaultCurrentSelection(""));
      });
  }

  const renameTable = (oldTableName, newTableName) => {
    renTable(oldTableName, newTableName)
      .then(result => {
        setTables([]);
        setCurrentSelection(createDefaultCurrentSelection(newTableName));
      });
  }

  const showCreateColumnDialog = (show) => {
    setShowAddColDlg(show);
  }

  const createColumn = (tableName, columnName) => {
    createCol(tableName, columnName)
      .then(result => {
        setCurrentSelection(createDefaultCurrentSelection(tableName));
      });
  }

  const showRenameColumnDialog = (show) => {
    setShowRenameColDlg(show);
  }

  const renameColumn = (tableName, newColumnName, oldColumnName) => {
    renameCol(tableName, oldColumnName, newColumnName)
      .then(result => {
        setCurrentSelection(createDefaultCurrentSelection(tableName));
      })
      .catch(err => {
        console.error(err);
      });
  }

  const createDBRow = () => {
    createNewRow(currentSelection.tableName)
      .then(result => {
        setCurrentSelection(createDefaultCurrentSelection(currentSelection.tableName));
      });
  }

  const showDeleteColumnDialog = (show) => {
    setShowDeleteColDlg(show);
  }

  const deleteColumn = (columnName) => {
    dropCol(currentSelection.tableName, columnName)
      .then(result => {
        setCurrentSelection(createDefaultCurrentSelection(currentSelection.tableName));
      });
  }

  return (rows && currentSelection.tableName) ? (
    <StyledHeaderGrid>
      {showDBEMenu ? (
        <Box
          sx={{
            height: "100vh",
            width: "100vh",
            backgroundColor: "transparent",
            top: "0",
            left: "0",
            /* use absolute positioning  */
            position: "absolute",
            listStyle: "none",
          }}
          onClick={(e) => closeMenu(e)}>
          <DBEMenu
            x={anchorPoint.x}
            y={anchorPoint.y}
            ui={() => updateItem}
            cs={currentSelection}
            ctd={() => showAddTableDialog}
            dt={() => setShowRemoveTblDlg}
            cc={() => showCreateColumnDialog}
            dc={() => showDeleteColumnDialog}
            rtd={() => showRenameTableDialog}
            rcd={() => showRenameColumnDialog}
          />
        </Box>
      ) : null}
      <AddTableDialog
        openDlg={showAddTblDlg ? showAddTblDlg : false}
        setOpen={() => showAddTableDialog}
        createCallback={() => createTable} />
      <RemoveTableDialog
        openDlg={showRemoveTblDlg ? showRemoveTblDlg : false}
        setOpen={() => showRemoveTableDialog}
        removeCallback={() => deleteTable}
        name={currentSelection.tableName} />
      <RenameTableDialog
        openDlg={showRenameTblDlg ? showRenameTblDlg : false}
        setOpen={() => showRenameTableDialog}
        renameCallback={() => renameTable}
        oldTableName={currentSelection.tableName} />
      <AddColumnDialog
        openDlg={showAddColDlg ? showAddColDlg : false}
        setOpen={() => showCreateColumnDialog}
        createCallback={() => createColumn}
        tableName={currentSelection.tableName} />
      <RemoveColumnDialog
        openDlg={showDeleteColDlg ? showDeleteColDlg : false}
        setOpen={() => showDeleteColumnDialog}
        removeCallback={() => deleteColumn}
        name={currentSelection ? currentSelection.columnName : ""} />
      <RenameColumnDialog
        openDlg={showRenameColDlg ? showRenameColDlg : false}
        setOpen={() => showRenameColumnDialog}
        renameCallback={() => renameColumn}
        tableName={currentSelection.tableName}
        oldColumnName={currentSelection.columnName} />

      <Grid item xs={12}>
        <DBSelect
          htc={() => handleTableChange}
          tables={tables}
          curSel={currentSelection} />
      </Grid>
      <Grid item>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableBody>
              <TableRow>
                {(columnHeaders)}
              </TableRow>
              {hasNoRows() && (
                <TableRow style={{ hieght: 53 * getEmptyRows() }}>
                  <TableCell colSpan={6}>No data in table <Button onClick={createDBRow} variant="text">Create a row</Button></TableCell>
                </TableRow>
              )}

              {(rowsPerPage > 0
                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows
              ).map(createRow)}

              {getEmptyRows() > 0 && (
                <TableRow style={{ height: 53 * getEmptyRows() }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>

      </Grid>
    </StyledHeaderGrid>
  ) :
    <StyledHeaderGrid>
      <Grid item>
        <DBSelect
          htc={() => handleTableChange}
          tables={tables} />
      </Grid>
    </StyledHeaderGrid>;
}
