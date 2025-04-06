import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const menuData = [
  // Define all menus as objects, using the same format as in your provided code.
];

const Checkout = () => {
  const [subscriptionPlan, setSubscriptionPlan] = useState("Basic"); // Replace "Basic" with actual plan retrieval logic

  // Filter menus based on subscription plan
  const filteredMenu = menuData.filter((menuItem) => {
    if (
      subscriptionPlan === "Basic" &&
      (menuItem.key === "pos" || menuItem.key === "hr")
    ) {
      return false;
    }
    if (subscriptionPlan === "Standard" && menuItem.key === "hr") {
      return false;
    }
    return true;
  });

  return (
    <div>
      <h2>Menu</h2>
      <ul>
        {filteredMenu.map((item) => (
          <li key={item.key}>
            <NavLink to={item.link || "#"}>
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Checkout;
