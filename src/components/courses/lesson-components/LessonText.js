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
  IconButton,
  TextField
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
const defaultContent = [
  {
    id: 0,
    text: "Welcome to our lesson!",
    isTextField: false,
    severity: "info",
    icon: <InfoIcon fontSize="inherit" />
  },
  {
    id: 1,
    text: "This is some text that you can edit.",
    isTextField: true
  },
  {
    id: 2,
    text: "Here is a warning message.",
    isTextField: false,
    severity: "warning",
    icon: <WarningAmberIcon fontSize="inherit" />
  },
  {
    id: 3,
    text: "Another editable text field.",
    isTextField: true
  }
];

const LessonText = ( textLessonContent ) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [content, setContent] = useState(defaultContent);
  const [selectedSeverity, setSelectedSeverity] = useState("warning");
  const [selectedIcon, setSelectedIcon] = useState(<WarningAmberIcon fontSize="inherit" />);
  

  // database - all content is in content

  useEffect(() => {
    console.log(JSON.stringify(content));
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
        id: content.length,
        text: "This is an important note.",
        severity: selectedSeverity,
        icon: icon,
        isTextField: false
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
        id: content.length,
        text: "New editable text field.",
        isTextField: true
      }
    ]);
  };

  const saveTypography = (index, value) => {
    const updatedCallouts = [...content];
    updatedCallouts[index].text = value;
    setContent(updatedCallouts);
  };

  const deleteContent = (id) => {
    const updatedCallouts = content.filter(content => content.id !== id);
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


      

      {content.map((content, index) => (
        <Box
          key={content.id}
          margin={2}
          padding={1}
          width={isEditMode ? "100%" : "89%"}
          sx={{
            position: "relative"
          }}
        >
          {!content.isTextField && (
            <>
            {isEditMode ? (
            <TextField
              value={content.text}
              variant="filled"
              onChange={(e) => saveTypography(content.id, e.target.value)}>
              <IconButton
                onClick={() => deleteContent(content.id)}
                sx={{
                  position: "absolute",
                  top: "0.5rem",
                  right: "0.5rem",
                }}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </TextField>
          ) : (
            <Alert severity={content.severity} icon={content.icon}>
              {content.text}
            </Alert>
          )}
            </>
          )}
          {content.isTextField && (
            <>
              {isEditMode ? (
                <ReactQuill
                  theme="snow"
                  value={content.text}
                  onChange={(value) => saveTypography(index, value)}
                />
              ) : (
                <Typography
                  variant="body1"
                  style={{ textAlign: "left", marginBottom: "1em" }}
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content.text) }}
                />
              )}
              {isEditMode && (
                <IconButton
                  onClick={() => deleteContent(content.id)}
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
    </Container>
  );
};

export default LessonText;