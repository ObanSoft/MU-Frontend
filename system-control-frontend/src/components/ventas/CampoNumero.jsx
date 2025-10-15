import React from 'react';
import { TextField } from '@mui/material';

const CampoNumero = ({ label, value, onChange, min = 1, sx }) => (
  <TextField
    type="number"
    label={label}
    fullWidth
    value={value}
    onChange={onChange}
    inputProps={{ min }}
    sx={{
      mb: 2,
      '& label.Mui-focused': { color: '#172b3dff' },
      '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#172b3dff' },
      ...sx,
    }}
  />
);

export default CampoNumero;
