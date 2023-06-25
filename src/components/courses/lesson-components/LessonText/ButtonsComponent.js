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

const ButtonsComponent = ({addCallout, addText, setIsEditMode, setContent, isEditMode}) => {
    return(
      <>
       {isEditMode && (
        <div>
         <Box marginBottom={1} width="100%">
           <Button onClick={addText} variant="text" color="primary" style={{ marginLeft: "1.65em" }}>
             Add Text
           </Button>
           <Button onClick={addCallout} variant="text" color="primary" style={{ marginLeft: "1em" }}>
             Add Callout
           </Button>
         </Box>

           <Button
             onClick={() => setIsEditMode(false)}
             variant="icon"
             color="primary"
             style={{ marginLeft: "1em" }}
           >
             Done Editing
           </Button>
           <Button
             onClick={() => setContent([])}
             variant="contained"
             color="error"
             style={{ marginLeft: "1em" }}
           >
             Clear Content
           </Button>
         </div>
       )}
      </>
      
    );
  }

export default ButtonsComponent;