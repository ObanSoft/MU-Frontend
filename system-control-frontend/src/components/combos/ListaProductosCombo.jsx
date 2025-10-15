import { Box, Grid, FormControl, InputLabel, Select, MenuItem, TextField, IconButton, Typography, CircularProgress } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export default function ComboProductosLista({ filas, agregarFila, quitarFila, actualizarFila, productosNombres, loadingProductos, submitting }) {
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
    <>
      <Typography variant="h6" sx={{ mb: 3, color: '#474444ff', fontWeight: 'bold', letterSpacing: 1 }}>
        Productos del combo
      </Typography>

      {loadingProductos ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
          <CircularProgress sx={{ color: '#172b3dff' }} size={35} />
        </Box>
      ) : (
        filas.map((fila, idx) => (
          <Grid container spacing={3} key={idx} alignItems="center" sx={{ mb: 3 }}>
            <Grid item xs={8}>
              <FormControl fullWidth sx={pinkInputStyle} size="medium">
                <InputLabel sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Producto</InputLabel>
                <Select
                  value={fila.nombre}
                  label="Producto"
                  onChange={(e) => actualizarFila(idx, 'nombre', e.target.value)}
                  disabled={submitting}
                  sx={{ fontSize: '1.05rem', color: fila.nombre ? 'inherit' : 'rgba(0,0,0,0.5)' }}
                >
                  <MenuItem value="">
                    <em>-- seleccionar --</em>
                  </MenuItem>
                  {productosNombres.map((n) => (
                    <MenuItem key={`${n}-${idx}`} value={n} sx={{ fontSize: '1.05rem' }}>
                      {n}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={3}>
              <TextField
                label="Cantidad"
                type="number"
                inputProps={{ min: 1, style: { fontSize: '1.05rem', padding: '10px 12px' } }}
                value={fila.cantidad}
                onChange={(e) => actualizarFila(idx, 'cantidad', Math.max(1, Number(e.target.value)))}
                fullWidth
                disabled={submitting}
                sx={pinkInputStyle}
                size="medium"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={1} sx={{ textAlign: 'center' }}>
              {idx === 0 ? (
                <IconButton onClick={agregarFila} size="large" disabled={submitting} sx={{ color: '#172b3dff' }}>
                  <AddCircleOutlineIcon fontSize="large" />
                </IconButton>
              ) : (
                <IconButton onClick={() => quitarFila(idx)} size="large" disabled={submitting} sx={{ color: '#172b3dff' }}>
                  <RemoveCircleOutlineIcon fontSize="large" />
                </IconButton>
              )}
            </Grid>
          </Grid>
        ))
      )}
    </>
  );
}
