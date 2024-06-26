import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

export default function SelectComponent({ data, selected, setData, type, fieldName, disabled }) {
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    
    setData(value);
  };

  return (
    <div>
      {type === 'object' ? (
        <FormControl fullWidth variant="standard" sx={{width: 300, mt: 1 }}>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={selected}
              renderValue={(item) => Object.keys(item).length > 0 ? `${item.id} - ${item[fieldName]}` : ``}
              onChange={handleChange}
              disabled={disabled}
            >
              {data.map((item) => (
                <MenuItem
                  key={item.id}
                  value={item}
                >
                  {item.id} - {item[fieldName]}
                </MenuItem>
              ))}
            </Select>
        </FormControl>)
      : (
        <FormControl fullWidth variant="standard" sx={{ width: 300, mt: 1 }}>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            value={selected}
            onChange={handleChange}
            disabled={disabled}
          >
            {data.map((name) => (
              <MenuItem
                key={name}
                value={name}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )} 
    </div>
  );
}