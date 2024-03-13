import React, { useState } from 'react';
import './dropdown.css';

const Dropdown = ({ options, onChange }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
    onChange(e.target.value)
  };

  return (
    <div className="dropdown">
      <select value={selectedOption} onChange={handleChange}>
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;