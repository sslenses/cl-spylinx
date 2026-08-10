import React from 'react';
import { Box, Typography, Link } from '@mui/material';

export const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        height: 36,
        py: 0.8,
        px: 3,
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(11, 19, 43, 0.9)' : 'rgba(244, 247, 252, 0.9)'),
        backdropFilter: 'blur(8px)',
        borderTop: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 400, fontSize: '0.75rem', letterSpacing: 0.3 }}>
        Powered by{' '}
        <Link href="#" underline="hover" sx={{ fontWeight: 500, color: 'primary.main' }}>
          Sidiq Setyadji
        </Link>
      </Typography>
    </Box>
  );
};
