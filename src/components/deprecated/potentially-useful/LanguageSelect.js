import React from "react";
import { FormControl, InputLabel, Select, MenuItem, ListSubheader } from "@mui/material";

const LanguageSelect = ({ selectedLanguage, handleLanguageChange }) => {
  return (
    <FormControl>
      <InputLabel id="language-label">Language</InputLabel>
      <Select
        labelId="language-label"
        id="language-select"
        value={selectedLanguage}
        onChange={handleLanguageChange}
      >
        <ListSubheader>Popular Languages</ListSubheader>
        <MenuItem value="c">C</MenuItem>
        <MenuItem value="cpp">C++</MenuItem>
        <MenuItem value="csharp">C#</MenuItem>
        <MenuItem value="java">Java</MenuItem>
        <MenuItem value="javascript">JavaScript</MenuItem>
        <MenuItem value="python">Python</MenuItem>

        {/* Add a new line between sections */}
        <MenuItem disabled />

        
        <ListSubheader>Other Languages</ListSubheader>  
        <MenuItem value="css">CSS</MenuItem>
        <MenuItem value="dart">Dart</MenuItem>
        <MenuItem value="elixir">Elixir</MenuItem>
        <MenuItem value="go">Go</MenuItem>
        <MenuItem value="groovy">Groovy</MenuItem>
        <MenuItem value="haskell">Haskell</MenuItem>
        <MenuItem value="html">HTML</MenuItem>
        <MenuItem value="kotlin">Kotlin</MenuItem>
        <MenuItem value="lua">Lua</MenuItem>
        <MenuItem value="matlab">MATLAB</MenuItem>
        <MenuItem value="objective-c">Objective-C</MenuItem>
        <MenuItem value="perl">Perl</MenuItem>
        <MenuItem value="php">PHP</MenuItem>
        <MenuItem value="powershell">PowerShell</MenuItem>
        <MenuItem value="r">R</MenuItem>
        <MenuItem value="ruby">Ruby</MenuItem>
        <MenuItem value="rust">Rust</MenuItem>
        <MenuItem value="scala">Scala</MenuItem>
        <MenuItem value="shell">Shell Scripting</MenuItem>
        <MenuItem value="sql">SQL</MenuItem>
        <MenuItem value="swift">Swift</MenuItem>
        <MenuItem value="typescript">TypeScript</MenuItem>
        <MenuItem value="vb">Visual Basic</MenuItem>

      </Select>
    </FormControl>
  );
};

export default LanguageSelect;
