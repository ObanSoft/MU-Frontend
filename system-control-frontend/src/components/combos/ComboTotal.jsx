import { Box, Typography } from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

export default function ComboTotalYError({ totalAprox, errorMsg }) {
  return (
    <>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#4a4a4a', fontSize: '1.2rem' }}>
          Total aproximado:{' '}
          <span style={{ color: '#172b3dff', fontSize: '1.25rem' }}>
            ${Number(totalAprox || 0).toFixed(2)}
          </span>
        </Typography>
      </Box>

      {errorMsg && (
        <Box
          sx={{
            mt: 3,
            p: 2,
            borderRadius: 2,
            backgroundColor: '#fdecea',
            color: '#b00020',
            fontWeight: 'bold',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <CancelOutlinedIcon fontSize="medium" />
          {errorMsg}
        </Box>
      )}
    </>
  );
}
