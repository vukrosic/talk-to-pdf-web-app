import React, { useState } from "react";

const TopicInput = ({ onSubmit }) => {
    const [value, setValue] = useState("");
  
    const handleChange = e => {
      setValue(e.target.value);
    }
  
    const handleSubmit = () => {
      onSubmit(value);
      setValue("");
    }
  
    return (
      <div>
        <input type="text" value={value} onChange={handleChange} />
        <button onClick={handleSubmit}>Add Topic</button>
      </div>
    );
  };

export default TopicInput;