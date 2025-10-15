import { Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const VENDEDOR_OPTIONS = ['Lauren Vanegas', 'Juan Obando'];
const METODO_PAGO_OPTIONS = ['Efectivo', 'Nequi'];

export default function ComboSelectores({ vendidoPor, setVendidoPor, metodoPago, setMetodoPago, submitting }) {
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
    <Grid container spacing={4} sx={{ mt: 4 }}>
      <Grid item xs={6}>
        <FormControl fullWidth sx={pinkInputStyle} size="medium">
          <InputLabel sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Vendido por</InputLabel>
          <Select value={vendidoPor} onChange={(e) => setVendidoPor(e.target.value)} disabled={submitting}>
            <MenuItem value="">
              <em>-- seleccionar --</em>
            </MenuItem>
            {VENDEDOR_OPTIONS.map((v) => (
              <MenuItem key={v} value={v}>
                {v}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <FormControl fullWidth sx={pinkInputStyle} size="medium">
          <InputLabel sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Método de pago</InputLabel>
          <Select value={metodoPago} onChange={(e) => setMetodoPago(e.target.value)} disabled={submitting}>
            <MenuItem value="">
              <em>-- seleccionar --</em>
            </MenuItem>
            {METODO_PAGO_OPTIONS.map((m) => (
              <MenuItem key={m} value={m}>
                {m}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}
