import React, { useState } from 'react';
import Dropdown from './dropdown';
import Button from './button';
import './segment.css';
import axios from 'axios';

const Segment = ({closeModal}) => {
  const [value, setValue] = useState('');
  const [optionSelected,setOptionSelected]=useState(null)
  const [options] = useState([
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Gender', value: 'gender' },
    { label: 'Age', value: 'age' },
    { label: 'Account Name', value: 'account_name' }])
  const [dropdowns, setDropdowns] = useState([{ id: 1, value:optionSelected,options: options}]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const addDropdown = () => {
    if(optionSelected){
        const newDropdowns = [
            ...dropdowns,
            { id: Date.now(), value:optionSelected ,options: options}
          ];
          setDropdowns(newDropdowns);
          setOptionSelected(null)
    }
  };

  const handleOptionChange = (selectedOption) => {
    const selected = options.filter(elem=>elem.value==selectedOption)
    if(selected.length>0){
        setOptionSelected({
            [selected[0].value]:selected[0].label
        })
    }
  };

  const handleSaveSegment = async () =>{
    const schema = dropdowns.map(item => item["value"]).filter(elem=>elem!=null)
    if(value && schema){
        const payload = {
            segment_name:value,
            schema
        }
        try {
            // Send POST request to your API endpoint
            const response = await axios.post('https://webhook.site/#!/view/72047402-cfc8-406d-9624-24cf4036385f', payload);
            console.log('Schema stored successfully:', response.data);
            closeModal()
          } catch (error) {
            console.error('Error storing schema:', error);
          }
    }
  }

  return (
    <div className="segment">
      <label>Enter the name of the segment</label>
      <input type="text" placeholder="Name of the Segment" value={value} onChange={handleChange} />
      <label>To save your segment, you need to add the schemas to build the query</label>
      
      {dropdowns.map((dropdown, index) => (
        <Dropdown
          key={index}
          options={dropdown.options}
          onChange={(selectedOption) => handleOptionChange(selectedOption)}
        />
      ))}

      <button onClick={addDropdown}>Add Dropdown</button>

      <div className="button-view">
        <div className='button-container'>
            <Button onClick={handleSaveSegment}>Save Segment</Button>
            <button className='cancel-button' onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Segment;
