import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  ToggleButtonGroup,
  ToggleButton,
  Avatar,
  Stack,
} from '@mui/material';
import {
  ConfirmationNumber as TicketIcon,
  Person as PersonIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { useAppStore } from '../../lib/store';

export const TicketsView: React.FC = () => {
  const { tickets, searchQuery } = useAppStore();
  const [filterPriority, setFilterPriority] = useState<string>('ALL');

  const filteredTickets = tickets.filter((t) => {
    const matchesSearch =
      t.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority === 'ALL' || t.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Header & Controls */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h1" sx={{ fontSize: '1.75rem', fontWeight: 700 }}>
            Support Ticketing (CRM)
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage support tickets, SLA response times, and field escalation
          </Typography>
        </Box>

        <ToggleButtonGroup
          value={filterPriority}
          exclusive
          onChange={(_, newPriority) => newPriority && setFilterPriority(newPriority)}
          size="small"
          color="primary"
        >
          <ToggleButton value="ALL">ALL</ToggleButton>
          <ToggleButton value="CRITICAL">CRITICAL</ToggleButton>
          <ToggleButton value="HIGH">HIGH</ToggleButton>
          <ToggleButton value="MEDIUM">MEDIUM</ToggleButton>
          <ToggleButton value="LOW">LOW</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Ticket List Cards */}
      <Stack spacing={2}>
        {filteredTickets.map((tkt) => {
          const isHighPriority = tkt.priority === 'CRITICAL' || tkt.priority === 'HIGH';

          return (
            <Card key={tkt.id} sx={{ p: 0.5 }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, '&:last-child': { pb: 2 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: isHighPriority ? 'error.main' : 'primary.main',
                      color: '#ffffff',
                      width: 44,
                      height: 44,
                    }}
                  >
                    <TicketIcon />
                  </Avatar>

                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                      <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'primary.main', fontWeight: 700, fontSize: '0.85rem' }}>
                        {tkt.ticketNumber}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {tkt.subject}
                      </Typography>
                      <Chip
                        label={tkt.priority}
                        size="small"
                        color={tkt.priority === 'CRITICAL' ? 'error' : tkt.priority === 'HIGH' ? 'warning' : 'default'}
                        sx={{ height: 20, fontSize: '0.65rem', fontWeight: 800 }}
                      />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 0.8, flexWrap: 'wrap' }}>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <PersonIcon fontSize="inherit" /> Subscriber: <strong>{tkt.customerName}</strong>
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <ScheduleIcon fontSize="inherit" /> Agent: <strong>{tkt.assignedAgent}</strong>
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Created: {tkt.createdAt}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Chip
                  label={tkt.status}
                  color="warning"
                  variant="outlined"
                  sx={{ fontWeight: 700, px: 1 }}
                />
              </CardContent>
            </Card>
          );
        })}
      </Stack>
    </Box>
  );
};
