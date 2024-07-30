import React from "react";
import { TextField, IconButton, Typography, Stack } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

const CartItem = ({ quantity, name, increment, decrement }) => {
  const handleIncrement = () => {
    increment();
  };

  const handleDecrement = () => {
    decrement();
  };

  return (
    <Stack
      direction="row"
      justifyContent={"space-between"}
      alignItems={"center"}
      marginBottom={2}
    >
      <Typography>{name}</Typography>

      <Stack direction={"row"} alignContent={"space-around"}>
        <IconButton onClick={handleDecrement} aria-label="decrease quantity">
          <Remove />
        </IconButton>
        <TextField
          value={quantity}
          readonly
          inputProps={{ min: 1 }}
          sx={{ width: 40, textAlign: "center" }}
        />
        <IconButton onClick={handleIncrement} aria-label="increase quantity">
          <Add />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default CartItem;
