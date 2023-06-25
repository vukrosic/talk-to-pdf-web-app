import React from "react";
import { useState, useEffect } from "react";
import { Container, Typography, Button, TextField, Box, IconButton, Grid } from "@mui/material";
import DOMPurify from "dompurify";
import DeleteIcon from "@mui/icons-material/Delete";
import ReactQuill from "react-quill";

const TextEditorComponent = ({callout, saveTypography, index, isEditMode, deleteCallout}) => {
    return(
     <>
       {isEditMode ? (
         <ReactQuill
           theme="snow"
           value={callout.text}
           onChange={(value) => saveTypography(index, value)}
         />
       ) : (
         <Typography
           variant="body1"
           style={{ textAlign: "left", marginBottom: "1em" }}
           dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(callout.text) }}
         />
       )}
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

export default TextEditorComponent;