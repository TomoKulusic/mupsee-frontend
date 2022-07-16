import React from "react";
import "./searchInput.css";

const SearchInput = ({ value, onChangeText }) => {
  React.useEffect(() => {
    let input = document.querySelector("input");
    input.addEventListener("input", onChangeText);
    return input.removeEventListener("input", onChangeText);
  }, []);
  return (
    <div className="search-container">
      <input
        type="text"
        value={value}
        onChange={onChangeText}
        placeholder="Search movie by name"
      />
    </div>
  );
};

export default SearchInput;
