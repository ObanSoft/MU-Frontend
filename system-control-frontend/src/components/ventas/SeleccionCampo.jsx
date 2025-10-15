import React from 'react';
import { TextField, MenuItem } from '@mui/material';

const CampoSelect = ({ label, value, onChange, opciones, sx }) => (
  <TextField
    select
    fullWidth
    label={label}
    value={value}
    onChange={onChange}
    sx={{
      mb: 2,
      '& label.Mui-focused': { color: '#172b3dff' },
      '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: '#172b3dff' },
      ...sx,
    }}
  >
    {opciones.map((o) => (
      <MenuItem key={o} value={o}>{o}</MenuItem>
    ))}
  </TextField>
);

export default CampoSelect;
