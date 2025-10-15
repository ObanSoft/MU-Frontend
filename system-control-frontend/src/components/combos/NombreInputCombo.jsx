import { Box, TextField } from '@mui/material';

export default function ComboNombreInput({ nombreCombo, setNombreCombo, submitting }) {
  const pinkInputStyle = {
    '& .MuiOutlinedInput-root': {
      fontSize: '1.1rem',
      padding: '10px 12px',
      '&.Mui-focused fieldset': { borderColor: '#172b3dff', borderWidth: 2 },
    },
    '& label': { fontWeight: 'bold', fontSize: '1.05rem' },
    '& label.Mui-focused': { color: '#172b3dff' },
  };

  return (
    <Box sx={{ mb: 4 }}>
      <TextField
        label="Nombre del combo"
        value={nombreCombo}
        onChange={(e) => setNombreCombo(e.target.value)}
        fullWidth
        disabled={submitting}
        sx={pinkInputStyle}
        InputLabelProps={{ shrink: true }}
        size="medium"
      />
    </Box>
  );
}
