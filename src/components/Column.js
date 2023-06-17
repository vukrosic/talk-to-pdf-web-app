import React from "react";
import { Card, CardContent, Grid, Button } from "@mui/material";
import Collection from "./Collection";
import { addDocumentToTopic } from "../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { callOpenAIAPI } from "./CallOpenAIAPIToGenerateTopics";


const Column = ({ items, onItemClick, selectedItem }) => {
  return (
    <Grid item>
      <Card>
        <CardContent>
          {items.map((item, index) => (
            <Collection
              key={index}
              item={item}
              onClick={() => onItemClick(item)}
              isSelected={selectedItem === item}
            />
          ))}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Column;
