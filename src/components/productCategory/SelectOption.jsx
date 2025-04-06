import React from "react";

const SelectOption = ({ selectedType, onTypeChange }) => {
  return (
    <div>
      <label htmlFor="product-type" className="sr-only">
        Select Product Type
      </label>
      <select
        id="product-type"
        className="p-2"
        value={selectedType || ""}
        onChange={(e) => onTypeChange(Number(e.target.value))}
      >
        <option value="" disabled>
          Select Type
        </option>
        <option value={10}>Shop</option>
        <option value={20}>Deals</option>
        <option value={30}>Luxury</option>
        <option value={40}>Bulk Purchase</option>
        <option value={50}>Health & Supplies</option>
      </select>
    </div>
  );
};

export default SelectOption;
