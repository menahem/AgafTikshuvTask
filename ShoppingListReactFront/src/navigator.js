import React from "react";
import { Link } from "react-router-dom";

function Navigator() {
  return (
    <nav style={styles.nav}>
      <ul style={styles.ul}>
        <li style={styles.li}>
          <Link to="/">Products Selection</Link>
        </li>
        <li style={styles.li}>
          <Link to="/checkout">Checkout</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigator;

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1rem",
    borderBottom: "1px solid #ccc",
  },
  ul: {
    display: "flex",
    listStyle: "none",
  },
  li: {
    marginLeft: "1rem",
  },
};
