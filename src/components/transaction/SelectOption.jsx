import React from "react";

const SelectOption = ({ selectedType, onTypeChange }) => {
  return (
    <div>
      <label htmlFor="transaction-type" className="sr-only">
        Select Transaction Type
      </label>
      <select
        id="transaction-type"
        className="p-2"
        value={selectedType || ""}
        onChange={(e) => onTypeChange(Number(e.target.value))}
      >
        <option value="" disabled>
          Select Type
        </option>
        <option value={10}>Online</option>
        <option value={20}>Offline/POS</option>
      </select>
    </div>
  );
};

export default SelectOption;
