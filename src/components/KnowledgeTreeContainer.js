import React from "react";
import { useSelector } from "react-redux";
import KnowledgeTreeUI from "./KnowledgeTreeUI";
import { Grid, Typography } from "@mui/material";

const KnowledgeTreeContainer = () => {
  const { knowledgeTree } = useSelector((state) => state.knowledgeTree);

  return knowledgeTree ? <div>
  <KnowledgeTreeUI knowledgeTree={knowledgeTree} />
  </div> : <p><Grid item xs={12}>
      
  <Typography
    variant="body1"
    gutterBottom
    sx={{
      bgcolor: "#fff",
      width: "70%",
      display: "flex",
      justifyContent: "center",
      borderRadius: "5px",
      alignSelf: "center",
      margin: "0 auto",
      padding: "1rem",
      border: "1px solid #333",
      mt: 4
    }}
  >
      Loading...
  </Typography>
  </Grid></p>;
};

export default KnowledgeTreeContainer;