import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { Container } from "@mui/system";
import { useSelector } from "react-redux";

function Checkout() {
  const { categories } = useSelector((state) => state.categories);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const allItems = categories.map((category) => category.items).flat();

  const placeOrder = async () => {
    console.log({ name, address, email, allItems });

    await fetch("http://localhost:3001/saveData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, address, email, allItems }),
    }).then((response) => {
      if (response.ok) {
        alert("ההזמנה בוצעה בהצלחה");
      } else {
        alert("ההזמנה נכשלה");
      }
    });
  };

  return (
    <Box>
      <h1>סיכום</h1>
      <Container
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          noValidate
          autoComplete="off"
        >
          <Typography variant="h5" gutterBottom>
            פרטים אישיים
          </Typography>
          <TextField
            onChange={(e) => setName(e.target.value)}
            required
            id="name"
            name="name"
            label="שם מלא"
          />
          <TextField
            onChange={(e) => setAddress(e.target.value)}
            required
            id="address"
            name="address"
            label="כתובת מלאה"
          />
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            required
            id="email"
            type="email"
            name="email"
            label="מייל"
          />
          <Button onClick={placeOrder} variant="contained" sx={{ mt: 2 }}>
            אשר הזמנה
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="h5" gutterBottom>
            הזמנה
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              useFlexGap
              flexWrap={"wrap"}
            >
              {categories.map((category) => {
                return category.items.map((element) => {
                  return (
                    <Box display="flex">
                      <Typography sx={{ marginRight: 2 }}>
                        {element.name}
                      </Typography>
                      <Typography sx={{ marginRight: 2 }}>X</Typography>
                      <Typography sx={{ marginRight: 2 }}>
                        {element.quantity}
                      </Typography>
                    </Box>
                  );
                });
              })}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Checkout;
