import {
  Container,
  Typography,
  Button,
  Alert,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import ReactQuill from "react-quill";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import InfoIcon from "@mui/icons-material/Info";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorIcon from "@mui/icons-material/Error";
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

  return (
    <Container
      maxWidth="md"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "60%"
      }}
    >
      <Box
        display="flex"
        alignItems="flex-start"
        justifyContent="space-between"
        width={isEditMode ? "100%" : "60%"}
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

      {isEditMode && (
        <Box marginBottom={1} width="100%">
          <Button onClick={addText} variant="contained">
            Add Text
          </Button>
        </Box>
      )}

      {callouts.map((callout) => (
        <Box
          key={callout.id}
          margin={2}
          padding={1}
          width={isEditMode ? "100%" : "60%"}
        >
          {!callout.isText && (
            <Alert severity={callout.severity} icon={callout.icon}>
              {callout.message}
            </Alert>
          )}
          {callout.isText && (
            <ReactQuill
              theme="snow"
              defaultValue={callout.text}
              onChange={(value) => {
                callout.text = value;
              }}
            />
          )}
        </Box>
      ))}

      {isEditMode && (
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Severity</InputLabel>
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

      {isEditMode && (
        <Button onClick={addCallout} variant="contained">
          Add Callout
        </Button>
      )}

      {!isEditMode && (
        <Button onClick={() => setIsEditMode(true)} variant="contained">
          Edit
        </Button>
      )}
      {isEditMode && (
        <Button
          onClick={() => setIsEditMode(false)}
          variant="contained"
          style={{ marginTop: "1em" }}
        >
          Done Editing
        </Button>
      )}
    </Container>
  );
};

export default LessonText;