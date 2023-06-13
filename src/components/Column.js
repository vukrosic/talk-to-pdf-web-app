import React from "react";
import { Card, CardContent, Grid } from "@mui/material";
import Collection from "./Collection";

const Column = ({ items, onItemClick, selectedItem }) => (
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

export default Column;