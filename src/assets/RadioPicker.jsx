import React, { useState } from "react";
import "./RadioPicker.css";

function RadioPicker({ setValue,name, options }) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);

    if(setValue !== undefined){
      setValue(event.target.value);
    }
  };

  return (
    <div className="radio-group-1">
      {options.map((option) => (
        <label    htmlFor={option.value}  className={selectedOption === option.value ? "checked": ""} key={option.value} >
          <input
            type="radio"
            value={option.value}
            name={name}
            checked={selectedOption === option.value}
            onChange={handleOptionChange}
            id={option.value}
          />
          {option.name}
        </label>
      ))}
    </div>
  );
}

export default RadioPicker;
