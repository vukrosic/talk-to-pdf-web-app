import React, { useState } from 'react';

function Feedback() {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can perform any necessary actions with the submitted feedback
    console.log(feedback);
    setFeedback('');
  };

  const handleChange = (e) => {
    setFeedback(e.target.value);
  };

  return (
    <div>
      <h1>Feedback Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Feedback:
          <textarea value={feedback} onChange={handleChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Feedback;
