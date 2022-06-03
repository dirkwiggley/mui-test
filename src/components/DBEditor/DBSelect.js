import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function DBSelect({ htc, tables, curSel }) {
  const [handleTableChange] = React.useState(htc);
  const [tableList, setTableList] = React.useState(tables);
  const [currentSelection, setCurrentSelection] = React.useState(curSel);

  React.useEffect(() => {
    setTableList(tables);
  }, [tables]);

  React.useEffect(() => {
    setCurrentSelection(curSel);
  }, [curSel]);

  const handleChange = (event) => {
    handleTableChange(event.target.value);
  };

  const createMenuItems = () => {
    const elements = [];
    tableList.forEach(name => {
      elements.push(<MenuItem key={name} value={name}>{name}</MenuItem>);
    });
    return elements;
  }

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="select-table">Table</InputLabel>
        <Select
          labelId="select-table"
          id="select-table"
          value={currentSelection ? currentSelection.tableName ? currentSelection.tableName : "" :""}
          label="Table"
          onChange={(e) => handleChange(e)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {createMenuItems()}

        </Select>
        <FormHelperText>Select database table</FormHelperText>
      </FormControl>
    </div>
  );
}
