import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Avatar,
  Divider,
} from '@mui/material';
import { Build as BuildIcon } from '@mui/icons-material';
import { useAppStore } from '../../lib/store';

export const SchedulingView: React.FC = () => {
  const { workOrders } = useAppStore();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Header */}
      <Box>
        <Typography variant="h1" sx={{ fontSize: '1.75rem', fontWeight: 700 }}>
          Field Scheduling & Dispatches (CRM/OSS)
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Technician work order assignments, installation scheduling, and proof-of-work
        </Typography>
      </Box>

      {/* Work Orders Grid */}
      <Grid container spacing={2.5}>
        {workOrders.map((wo) => (
          <Grid size={{ xs: 12, md: 6 }} key={wo.id}>
            <Card>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2.5, '&:last-child': { pb: 2.5 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', color: '#ffffff', width: 44, height: 44 }}>
                      <BuildIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.05rem' }}>
                        {wo.orderNumber}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Task: {wo.taskType.replace(/_/g, ' ')}
                      </Typography>
                    </Box>
                  </Box>
                  <Chip
                    label={wo.status}
                    color={wo.status === 'COMPLETED' ? 'success' : 'warning'}
                    size="small"
                    sx={{ fontWeight: 700 }}
                  />
                </Box>

                <Divider />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" color="text.secondary">Subscriber:</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>{wo.customerName}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" color="text.secondary">Technician:</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>{wo.technicianName}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" color="text.secondary">Scheduled Date:</Typography>
                    <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 600 }}>{wo.scheduledDate}</Typography>
                  </Box>

                  {wo.opmSignalDbm && (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        bgcolor: 'action.hover',
                        p: 1.5,
                        borderRadius: 2,
                        mt: 1,
                        border: '1px solid',
                        borderColor: 'divider',
                      }}
                    >
                      <Typography variant="caption" color="text.secondary">OPM Optical Signal:</Typography>
                      <Typography variant="caption" sx={{ color: 'success.main', fontFamily: 'monospace', fontWeight: 800 }}>
                        {wo.opmSignalDbm} dBm (PASS)
                      </Typography>
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
