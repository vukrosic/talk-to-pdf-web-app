import { useState } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, IconButton } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import InfoIcon from "@mui/icons-material/Info";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorIcon from "@mui/icons-material/Error";
import DeleteIcon from "@mui/icons-material/Delete";

const EditMode = ({ addText, addCallout, deleteCallout, handleSeverityChange }) => {
  const [selectedSeverity, setSelectedSeverity] = useState("warning");

  const handleAddText = () => {
    addText();
  };

  const handleAddCallout = () => {
    addCallout(selectedSeverity);
  };

  const handleDeleteCallout = (id) => {
    deleteCallout(id);
  };

  const handleSeveritySelect = (event) => {
    setSelectedSeverity(event.target.value);
    handleSeverityChange(event.target.value);
  };

  return (
    <>
      <Box marginBottom={1} width="100%">
        <Button onClick={handleAddText} variant="text" color="primary" style={{ marginLeft: "1.65em" }}>
          Add Text
        </Button>
        <Button onClick={handleAddCallout} variant="text" color="primary" style={{ marginLeft: "1em" }}>
          Add Callout
        </Button>
      </Box>

      <FormControl sx={{ minWidth: 120, mt: 5 }}>
        <InputLabel>Add Callout</InputLabel>
        <Select
          value={selectedSeverity}
          onChange={handleSeveritySelect}
          style={{ margin: "2rem" }}
        >
          <MenuItem value="success">Success</MenuItem>
          <MenuItem value="info">Info</MenuItem>
          <MenuItem value="warning">Warning</MenuItem>
          <MenuItem value="error">Error</MenuItem>
        </Select>
      </FormControl>

      <Button variant="icon" color="primary" style={{ marginLeft: "1em" }}>
        Done Editing
      </Button>
      <Button variant="contained" color="error" style={{ marginLeft: "1em" }}>
        Clear Content
      </Button>

      <IconButton onClick={() => handleDeleteCallout(1)}>
        <DeleteIcon fontSize="small" />
      </IconButton>
    </>
  );
};

export default EditMode;