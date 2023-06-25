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
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import InfoIcon from "@mui/icons-material/Info";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorIcon from "@mui/icons-material/Error";
import DeleteIcon from "@mui/icons-material/Delete";
import DOMPurify from "dompurify";

const LessonText = ({ content }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [text, setText] = useState(content);
  const [callouts, setCallouts] = useState([]);
  const [selectedSeverity, setSelectedSeverity] = useState("warning");
  const [selectedIcon, setSelectedIcon] = useState(<WarningAmberIcon fontSize="inherit" />);

  const handleChange = (value) => {
    setText(value);
  };

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
    setCallouts([
      ...callouts,
      {
        id: callouts.length + 1,
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
    setCallouts([
      ...callouts,
      {
        id: callouts.length + 1,
        text: "New editable text field.",
        isText: true
      }
    ]);
  };

  const saveTypography = (index, value) => {
    const updatedCallouts = [...callouts];
    updatedCallouts[index].text = value;
    setCallouts(updatedCallouts);
  };

  const deleteCallout = (id) => {
    const updatedCallouts = callouts.filter(callout => callout.id !== id);
    setCallouts(updatedCallouts);
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
      <Box
        display="flex"
        alignItems="flex-start"
        justifyContent="space-between"
        width={isEditMode ? "100%" : "100%"}
      >
        {!isEditMode && (
          <Typography
            variant="body1"
            style={{ textAlign: "left", marginBottom: "1em" }}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text) }}
          />
        )}
        {isEditMode && (
          <div style={{ width: "100%", marginBottom: "1em" }}>
            <ReactQuill theme="snow" value={text} onChange={handleChange} />
          </div>
        )}
      </Box>

      

      {callouts.map((callout, index) => (
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
              onClick={() => setCallouts([])}
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