import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const CurriculumBrowser = ({ curricula }) => {
  return (
    <div>
      <h2>Curriculum Browser</h2>
      <List>
        {curricula.map((curriculum, index) => (
          <ListItem key={index}>
            <ListItemText primary={curriculum.title} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default CurriculumBrowser;