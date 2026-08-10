import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Divider,
} from '@mui/material';
import {
  Bolt as BoltIcon,
  Speed as SpeedIcon,
  People as PeopleIcon,
} from '@mui/icons-material';
import { useAppStore } from '../../lib/store';
import { formatCurrency } from '../../lib/utils';

export const TariffPlansView: React.FC = () => {
  const { tariffPlans } = useAppStore();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Header */}
      <Box>
        <Typography variant="h1" sx={{ fontSize: '1.75rem', fontWeight: 700 }}>
          Tariff Plans & FUP Rules (BSS)
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Bandwidth speed profiles, FUP data caps, and subscription pricing
        </Typography>
      </Box>

      {/* Tariff Plans Grid */}
      <Grid container spacing={3}>
        {tariffPlans.map((plan) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={plan.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between' }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, flexGrow: 1 }}>
                    {plan.name}
                  </Typography>
                  <BoltIcon sx={{ color: 'warning.main' }} />
                </Box>

                <Typography variant="h4" sx={{ fontWeight: 900, color: 'primary.main' }}>
                  {formatCurrency(plan.monthlyPrice)}{' '}
                  <Typography component="span" variant="caption" color="text.secondary">
                    / month
                  </Typography>
                </Typography>

                <Divider sx={{ my: 1 }} />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <SpeedIcon fontSize="inherit" /> Download / Upload:
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {plan.downloadSpeedMbps} / {plan.uploadSpeedMbps} Mbps
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                      FUP Threshold:
                    </Typography>
                    {plan.fupCapGb ? (
                      <Chip
                        label={`${plan.fupCapGb} GB → ${plan.fupThrottleSpeedMbps} Mbps`}
                        size="small"
                        color="warning"
                        variant="outlined"
                        sx={{ fontWeight: 700 }}
                      />
                    ) : (
                      <Chip
                        label="Truly Unlimited"
                        size="small"
                        color="success"
                        variant="outlined"
                        sx={{ fontWeight: 700 }}
                      />
                    )}
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto', pt: 1 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <PeopleIcon fontSize="inherit" /> Active Subscribers:
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {plan.subscriberCount} customers
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
