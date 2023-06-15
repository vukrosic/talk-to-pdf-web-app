import React from 'react';
import { Box, Button } from '@mui/material';


const Collection = ({ item, onClick, isSelected }) => (
    <Box mb={1}>
      <Button
        fullWidth
        variant={isSelected ? 'contained' : 'outlined'}
        color="primary"
        sx={{
          bgcolor: isSelected ? '#e0e0e0' : 'transparent',
          color: isSelected ? 'red' : 'inherit',
          '&:hover': {
            color: isSelected ? 'white' : 'inherit',
          },
        }}
        onClick={onClick}
      >
        {item}
      </Button>
    </Box>
  );

export default Collection;  