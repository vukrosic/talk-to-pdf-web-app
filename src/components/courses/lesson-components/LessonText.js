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
import LessonTextEditMode from "./LessonText/LessonTextEditMode";

const LessonText = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [content, setContent] = useState([]);
  const [selectedSeverity, setSelectedSeverity] = useState("warning");
  const [selectedIcon, setSelectedIcon] = useState(<WarningAmberIcon fontSize="inherit" />);
  

  // database - all content is in content

  useEffect(() => {
    console.log(content);
  }, [content]);

  const addCallout = () => {
    let icon;
    switch (selectedSeverity) {
      case "success":
        icon = <CheckBoxIcon fontSize="inherit" />;
        break;
      case "info":
        icon = <InfoIcon fontSize="inherit" />;
        break;
      case "warning":
        icon = <WarningAmberIcon fontSize="inherit" />;
        break;
      case "error":
        icon = <ErrorIcon fontSize="inherit" />;
        break;
      default:
        icon = <WarningAmberIcon fontSize="inherit" />;
    }
    setContent([
      ...content,
      {
        id: content.length + 1,
        message: "This is an important note.",
        severity: selectedSeverity,
        icon: icon
      }
    ]);
  };

  const handleSeverityChange = (event) => {
    setSelectedSeverity(event.target.value);
    switch (event.target.value) {
      case "success":
        setSelectedIcon(<CheckBoxIcon fontSize="inherit" />);
        break;
      case "info":
        setSelectedIcon(<InfoIcon fontSize="inherit" />);
        break;
      case "warning":
        setSelectedIcon(<WarningAmberIcon fontSize="inherit" />);
        break;
      case "error":
        setSelectedIcon(<ErrorIcon fontSize="inherit" />);
        break;
      default:
        setSelectedIcon(<WarningAmberIcon fontSize="inherit" />);
    }
  };

  const addText = () => {
    setContent([
      ...content,
      {
        id: content.length + 1,
        text: "New editable text field.",
        isText: true
      }
    ]);
  };

  const saveTypography = (index, value) => {
    const updatedCallouts = [...content];
    updatedCallouts[index].text = value;
    setContent(updatedCallouts);
  };

  const deleteCallout = (id) => {
    const updatedCallouts = content.filter(callout => callout.id !== id);
    setContent(updatedCallouts);
  }

  return (
    <Container
      maxWidth="md"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%"
      }}
    >


      

      {content.map((callout, index) => (
        <Box
          key={callout.id}
          margin={2}
          padding={1}
          width={isEditMode ? "100%" : "89%"}
          sx={{
            position: "relative"
          }}
        >
          {!callout.isText && (
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
          )}
          {callout.isText && (
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
          )}
        </Box>
      ))}

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

      <Box mt={isEditMode ? 2 : 0}>
        {!isEditMode && (
          <Button onClick={() => setIsEditMode(true)} variant="text" color="primary">
            Edit
          </Button>
        )}
        {isEditMode && (
          <>

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
          </>
        )}
      </Box>
      {/* <LessonTextEditMode
          addText={addText}
          addCallout={addCallout}
          deleteCallout={deleteCallout}
          handleSeverityChange={handleSeverityChange}
        /> */}
    </Container>
  );
};

export default LessonText;













// import React, { useState, useEffect } from 'react';
// import DOMPurify from 'dompurify';
// import {
//   Container,
//   Typography,
//   Box,
//   IconButton,
//   Button,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from '@mui/material';
// import ReactQuill from 'react-quill';
// import Alert from '@mui/material/Alert';
// import CheckBoxIcon from '@mui/icons-material/CheckBox';
// import InfoIcon from '@mui/icons-material/Info';
// import WarningAmberIcon from '@mui/icons-material/WarningAmber';
// import ErrorIcon from '@mui/icons-material/Error';
// import DeleteIcon from '@mui/icons-material/Delete';

// import HeaderComponent from './LessonText/HeaderComponent';
// import CalloutComponent from './LessonText/CalloutComponent';
// import TextEditorComponent from './LessonText/TextEditorComponent';
// import ButtonsComponent from './LessonText/ButtonsComponent';

// const LessonText = () => {
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [content, setContent] = useState([]);
//   const [selectedSeverity, setSelectedSeverity] = useState('warning');
//   const [selectedIcon, setSelectedIcon] = useState(
//     <WarningAmberIcon fontSize="inherit" />
//   );

//   useEffect(() => {
//     console.log(content);
//   }, [content]);

//   const addCallout = () => {
//     let icon;
//     switch (selectedSeverity) {
//       case 'success':
//         icon = <CheckBoxIcon fontSize="inherit" />;
//         break;
//       case 'info':
//         icon = <InfoIcon fontSize="inherit" />;
//         break;
//       case 'warning':
//         icon = <WarningAmberIcon fontSize="inherit" />;
//         break;
//       case 'error':
//         icon = <ErrorIcon fontSize="inherit" />;
//         break;
//       default:
//         icon = <WarningAmberIcon fontSize="inherit" />;
//     }
//     setContent([
//       ...content,
//       {
//         id: content.length + 1,
//         message: 'This is an important note.',
//         severity: selectedSeverity,
//         icon: icon,
//       },
//     ]);
//   };

//   const handleSeverityChange = (event) => {
//     setSelectedSeverity(event.target.value);
//     switch (event.target.value) {
//       case 'success':
//         setSelectedIcon(<CheckBoxIcon fontSize="inherit" />);
//         break;
//       case 'info':
//         setSelectedIcon(<InfoIcon fontSize="inherit" />);
//         break;
//       case 'warning':
//         setSelectedIcon(<WarningAmberIcon fontSize="inherit" />);
//         break;
//       case 'error':
//         setSelectedIcon(<ErrorIcon fontSize="inherit" />);
//         break;
//       default:
//         setSelectedIcon(<WarningAmberIcon fontSize="inherit" />);
//     }
//   };

//   const addText = () => {
//     setContent([
//       ...content,
//       {
//         id: content.length + 1,
//         text: 'New editable text field.',
//         isText: true,
//       },
//     ]);
//   };

//   const saveTypography = (index, value) => {
//     const updatedCallouts = [...content];
//     updatedCallouts[index].text = value;
//     setContent(updatedCallouts);
//   };

//   const deleteCallout = (id) => {
//     const updatedCallouts = content.filter((callout) => callout.id !== id);
//     setContent(updatedCallouts);
//   };

//   return (
//     <Container
//       maxWidth="md"
//       style={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'flex-start',
//         width: '100%',
//       }}
//     >
//       <HeaderComponent
//         setSelectedSeverity={setSelectedSeverity}
//         setIsEditMode={setIsEditMode}
//         selectedSeverity={selectedSeverity}
//         isEditMode={isEditMode}
//         handleSeverityChange={handleSeverityChange}
//       />

//       {content.map((callout, index) => (
//         <Box
//           key={callout.id}
//           margin={2}
//           padding={1}
//           width={isEditMode ? '100%' : '89%'}
//           sx={{
//             position: 'relative',
//           }}
//         >
//           {!callout.isText && (
//             <>
//               <CalloutComponent
//                 callout={callout}
//                 deleteCallout={deleteCallout}
//                 isEditMode={isEditMode}
//               />
//             </>
//           )}
//           {callout.isText && (
//             <>
//               <TextEditorComponent
//                 callout={callout}
//                 saveTypography={saveTypography}
//                 index={index}
//                 isEditMode={isEditMode}
//                 deleteCallout={deleteCallout}
//               />
//             </>
//           )}
//         </Box>
//       ))}

//       <ButtonsComponent
//         addCallout={addCallout}
//         addText={addText}
//         setIsEditMode={setIsEditMode}
//         setContent={setContent}
//         isEditMode={isEditMode}
//       />
//     </Container>
//   );
// };

// export default LessonText;