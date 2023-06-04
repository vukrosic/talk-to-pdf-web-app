import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

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
        <MenuItem value="python">Python</MenuItem>
        <MenuItem value="javascript">JavaScript</MenuItem>
        <MenuItem value="java">Java</MenuItem>
        <MenuItem value="c">C</MenuItem>
        <MenuItem value="c++">C++</MenuItem>
        <MenuItem value="c#">C#</MenuItem>
        <MenuItem value="ruby">Ruby</MenuItem>
        <MenuItem value="go">Go</MenuItem>
        <MenuItem value="swift">Swift</MenuItem>
        <MenuItem value="kotlin">Kotlin</MenuItem>
        <MenuItem value="rust">Rust</MenuItem>
        <MenuItem value="typescript">TypeScript</MenuItem>
        <MenuItem value="php">PHP</MenuItem>
        <MenuItem value="scala">Scala</MenuItem>
        <MenuItem value="perl">Perl</MenuItem>
        <MenuItem value="r">R</MenuItem>
        <MenuItem value="matlab">MATLAB</MenuItem>
        <MenuItem value="lua">Lua</MenuItem>
        <MenuItem value="groovy">Groovy</MenuItem>
        <MenuItem value="powershell">PowerShell</MenuItem>
        <MenuItem value="html">HTML</MenuItem>
        <MenuItem value="css">CSS</MenuItem>
        <MenuItem value="sql">SQL</MenuItem>
        <MenuItem value="shell">Shell Scripting</MenuItem>
        <MenuItem value="vb">Visual Basic</MenuItem>
        <MenuItem value="objective-c">Objective-C</MenuItem>
        <MenuItem value="dart">Dart</MenuItem>
        <MenuItem value="haskell">Haskell</MenuItem>
        <MenuItem value="elixir">Elixir</MenuItem>
        <MenuItem value="lua">Lua</MenuItem>
        <MenuItem value="perl">Perl</MenuItem>
        <MenuItem value="r">R</MenuItem>
        <MenuItem value="matlab">MATLAB</MenuItem>
        <MenuItem value="powershell">PowerShell</MenuItem>
        <MenuItem value="html">HTML</MenuItem>
        <MenuItem value="css">CSS</MenuItem>
        <MenuItem value="sql">SQL</MenuItem>
        <MenuItem value="shell">Shell Scripting</MenuItem>
        <MenuItem value="vb">Visual Basic</MenuItem>
        <MenuItem value="objective-c">Objective-C</MenuItem>
        <MenuItem value="dart">Dart</MenuItem>
        <MenuItem value="haskell">Haskell</MenuItem>
        <MenuItem value="elixir">Elixir</MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageSelect;
