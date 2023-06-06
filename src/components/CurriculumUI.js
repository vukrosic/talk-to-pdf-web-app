import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Paper,
} from '@mui/material';

const CurriculumUI = ({ curriculum }) => {
  return (
    <Container>
      {curriculum.map((module, index) => (
        <Grid key={index} container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">{`${module.number}. ${module.title}`}</Typography>
          </Grid>
          {module.subModules.map((subModule, index) => (
            <Grid key={index} item xs={12}>
              <Box pl={2}>
                <Typography variant="h6">
                  {`${module.number}.${subModule.letter}. ${subModule.title}`}
                </Typography>
                {subModule.subSubModules.map((subSubModule, index) => (
                  <Box key={index} pl={2}>
                    <Paper elevation={1} sx={{ p: 1, mt: 1 }} square>
                      <Typography variant="body1">
                        { `${module.number}.${subModule.letter}${subSubModule.greekLetter}. ${subSubModule.title}`}
                      </Typography>
                    </Paper>
                  </Box>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>
      ))}
    </Container>
  );
};

export default CurriculumUI;













// import React from 'react';
// import {
//   Container,
//   Typography,
//   Grid,
//   Box,
//   Paper,
//   Divider,
//   IconButton,
//   ListItemIcon,
//   ListItemText,
//   ListItem,
//   ListSubheader,
//   List,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
// } from '@mui/material';
// import { styled } from '@mui/system';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// const useStyles = styled((theme) => ({
//   root: {
//     padding: theme.spacing(2),
//   },
//   moduleHeader: {
//     marginBottom: theme.spacing(1),
//   },
//   subModuleHeader: {
//     padding: theme.spacing(1, 2),
//   },
//   subSubModuleItem: {
//     paddingLeft: theme.spacing(4),
//   },
//   accordion: {
//     backgroundColor: theme.palette.background.paper,
//     boxShadow: 'none',
//   },
// }));

// const CurriculumUI = ({ curriculum }) => {
//   const classes = useStyles();

//   return (
//     <Container className={classes.root}>
//       <Grid container spacing={4}>
//         {curriculum.map((module, index) => (
//           <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
//             <Box className={classes.moduleHeader}>
//               <Typography variant="h5" component="h2" gutterBottom>
//                 {`${module.number}. ${module.title}`}
//               </Typography>
//             </Box>

//             <Accordion className={classes.accordion} elevation={1}>
//               <AccordionSummary
//                 expandIcon={<ExpandMoreIcon />}
//                 aria-controls="panel1a-content"
//                 id="panel1a-header"
//               >
//                 <Typography variant="subtitle1">Submodules</Typography>
//               </AccordionSummary>
//               <AccordionDetails>
//                 <List
//                   component="nav"
//                   aria-labelledby="nested-list-subheader"
//                   subheader={
//                     <ListSubheader
//                       component="div"
//                       id="nested-list-subheader"
//                       disableSticky
//                     >
//                       {module.title}
//                     </ListSubheader>
//                   }
//                 >
//                   {module.subModules.map((subModule, index) => (
//                     <React.Fragment key={index}>
//                       <ListItem
//                         className={classes.subModuleHeader}
//                         button
//                         onClick={() => {}}
//                       >
//                         <ListItemIcon>
//                           {subModule.isOpen ? (
//                             <RemoveCircleOutlineIcon />
//                           ) : (
//                             <AddCircleOutlineIcon />
//                           )}
//                         </ListItemIcon>
//                         <ListItemText
//                           primary={`${module.number}.${subModule.letter}. ${subModule.title}`}
//                         />
//                       </ListItem>
//                       <Divider />
//                       {subModule.isOpen &&
//                         subModule.subSubModules.map((subSubModule, index) => (
//                           <ListItem
//                             key={index}
//                             className={classes.subSubModuleItem}
//                             button
//                             onClick={() => {}}
//                           >
//                             <ListItemIcon>
//                               <AddCircleOutlineIcon />
//                             </ListItemIcon>
//                             <ListItemText
//                               primary={`${module.number}.${subModule.letter}${subSubModule.greekLetter}. ${subSubModule.title}`}
//                             />
//                           </ListItem>
//                         ))}
//                     </React.Fragment>
//                   ))}
//                 </List>
//               </AccordionDetails>
//             </Accordion>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };

// export default CurriculumUI;