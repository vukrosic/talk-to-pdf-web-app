import {
    Container,
    Typography,
    Button,
    Alert,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    IconButton
  } from "@mui/material";
  import ReactQuill from "react-quill";
  import { useState, useEffect } from "react";
  import "react-quill/dist/quill.snow.css";
  import CheckBoxIcon from "@mui/icons-material/CheckBox";
  import InfoIcon from "@mui/icons-material/Info";
  import WarningAmberIcon from "@mui/icons-material/WarningAmber";
  import ErrorIcon from "@mui/icons-material/Error";
  import DeleteIcon from "@mui/icons-material/Delete";
  import DOMPurify from "dompurify";
  
  const HeaderComponent = ({setSelectedSeverity, setIsEditMode, selectedSeverity, isEditMode, handleSeverityChange}) => {
    return (
       <>
         {!isEditMode && (
             <Button onClick={() => setIsEditMode(true)} variant="text" color="primary">
               Edit
             </Button>
         )}
         {isEditMode && (
           <FormControl sx={{ minWidth: 120, mt: 5 }}>
             <InputLabel>Add Callout</InputLabel>
             <Select
               value={selectedSeverity}
               onChange={handleSeverityChange}
               style={{ margin: "2rem" }}
             >
               <MenuItem value="success">Success</MenuItem>
               <MenuItem value="info">Info</MenuItem>
               <MenuItem value="warning">Warning</MenuItem>
               <MenuItem value="error">Error</MenuItem>
             </Select>
           </FormControl>
         )}
       </>
     );
    }

export default HeaderComponent;