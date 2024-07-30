import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import ProductsSelection from "./components/products-selection";
import Checkout from "./components/checkout";
import Navigator from "./navigator";

function App() {
  return (
    <Router>
      <div className="App">
        <Navigator />
        <Routes>
          <Route exact path="/" element={<ProductsSelection />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
