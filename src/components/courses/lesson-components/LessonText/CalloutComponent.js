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

const CalloutComponent = ({callout, deleteCallout, isEditMode}) => {
    return (
       <>
         <Alert severity={callout.severity} icon={callout.icon}>
           {callout.message}
         </Alert>
         {isEditMode && (
           <IconButton
             onClick={() => deleteCallout(callout.id)}
             sx={{
               position: "absolute",
               top: "0.5rem",
               right: "0.5rem",
             }}
           >
             <DeleteIcon fontSize="small" />
           </IconButton>
         )}
       </>
     );
    }

export default CalloutComponent;