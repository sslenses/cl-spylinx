import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  Avatar,
  Divider,
} from '@mui/material';
import {
  Router as RouterIcon,
  VpnKey as VpnKeyIcon,
} from '@mui/icons-material';
import { useAppStore } from '../../lib/store';

export const NetworkingView: React.FC = () => {
  const { routers } = useAppStore();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Header */}
      <Box>
        <Typography variant="h1" sx={{ fontSize: '1.75rem', fontWeight: 700 }}>
          Networking & Device Management (OSS)
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Core BRAS Routers, RADIUS sessions, and TR-069 CPE device provisioning
        </Typography>
      </Box>

      {/* Routers Grid */}
      <Grid container spacing={2.5}>
        {routers.map((rtr) => (
          <Grid size={{ xs: 12, md: 6 }} key={rtr.id}>
            <Card>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2.5, '&:last-child': { pb: 2.5 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', color: '#ffffff', width: 44, height: 44 }}>
                      <RouterIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.05rem' }}>
                        {rtr.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Type: {rtr.type} • IP: {rtr.ipAddress}:{rtr.apiPort}
                      </Typography>
                    </Box>
                  </Box>
                  <Chip label={rtr.status} color="success" size="small" sx={{ fontWeight: 700 }} />
                </Box>

                <Divider />

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: 0.5 }}>
                  <Typography variant="body2" color="text.secondary">
                    Active RADIUS Sessions: <strong>{rtr.activeSessions} subscribers</strong>
                  </Typography>
                  <Button size="small" variant="text" color="primary" startIcon={<VpnKeyIcon fontSize="small" />}>
                    Manage Secrets
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
