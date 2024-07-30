import React, { useEffect, useState } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Button,
  Stack,
  Card,
  Typography,
  Container,
  CardContent,
  Box,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { addItem, increment, decrement } from "../store/item";
import CartItem from "./cart-item";
import { useNavigate } from "react-router-dom";

function ProductsSelection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [itemName, setItemName] = useState("");

  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    fetch("http://localhost:5049/api/Categories").then((response) => {
      response.json().then((data) => {
        const result = data.map((category) => {
          return {
            id: category.id,
            name: category.name,
            label: category.name,
            value: category.id,
          };
        });
        setOptions(result);
      });
    });
  }, []);

  const handleChange = (event) => {
    const selected = options.find(
      (option) => option.value === event.target.value
    );
    setSelectedOption(selected);
  };

  const addItemToCategory = () => {
    if (!selectedOption | !itemName) {
      return;
    }
    dispatch(
      addItem({
        categoryId: selectedOption.value,
        categoryName: selectedOption.name,
        item: { name: itemName, quantity: 1 },
      })
    );
  };

  return (
    <div>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Container>
          <h1>בחירת מוצרים</h1>
          <Stack
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            direction="row"
            spacing={5}
          >
            <div dir="rtl">
              <FormControl>
                <InputLabel className="custom-label-rtl">
                  בחירת קטגוריה
                </InputLabel>
                <Select
                  label={"בחירת קטגוריה"}
                  style={{ width: "200px", color: "black" }}
                  value={selectedOption ? selectedOption.id : ""}
                  onChange={handleChange}
                  error={!selectedOption}
                >
                  {options.map((option) => (
                    <MenuItem
                      key={option.id}
                      name={option.name}
                      TextFieldProps={{
                        dir: "rtl",
                      }}
                      value={option.value}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <TextField
              label="שם המוצר"
              placeholder="שם מוצר"
              onChange={(event) => setItemName(event.target.value)}
              error={!itemName}
            ></TextField>

            <Button variant="contained" onClick={addItemToCategory}>
              הוסף מוצר
            </Button>
          </Stack>
        </Container>
        <Container sx={{ minHeight: "60vh" }}>
          <Stack
            direction="row"
            spacing={5}
            sx={{
              "& > :not(style)": { m: 1, marginTop: 2 },
            }}
            useFlexGap
            flexWrap={"wrap"}
          >
            {categories.map((category) => {
              return (
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {category.categoryName}
                    </Typography>

                    {category.items.map((item) => {
                      return (
                        <CartItem
                          name={item.name}
                          increment={() => {
                            dispatch(
                              increment({
                                itemId: item.id,
                                categoryId: category.categoryId,
                              })
                            );
                          }}
                          decrement={() => {
                            dispatch(
                              decrement({
                                itemId: item.id,
                                categoryId: category.categoryId,
                              })
                            );
                          }}
                          category={category}
                          quantity={item.quantity}
                        />
                      );
                    })}
                  </CardContent>
                </Card>
              );
            })}
          </Stack>
        </Container>
        <Box
          component="footer"
          sx={{ py: 2, textAlign: "center", backgroundColor: "#f5f5f5" }}
        >
          <Button
            variant="contained"
            onClick={() => {
              navigate("/checkout");
            }}
          >
            המשך להזמנה
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default ProductsSelection;
