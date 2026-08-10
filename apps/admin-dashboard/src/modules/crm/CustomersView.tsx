import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Paper,
} from '@mui/material';
import {
  Block as BlockIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { useAppStore } from '../../lib/store';
import { formatCurrency } from '../../lib/utils';

export const CustomersView: React.FC = () => {
  const { customers, toggleCustomerStatus, searchQuery } = useAppStore();
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.customerCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.pppoeUsername.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'ALL' || c.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Header & Filter Controls */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h1" sx={{ fontSize: '1.75rem', fontWeight: 700 }}>
            Subscriber Management (BSS/CRM)
          </Typography>
          <Typography variant="body2" color="text.secondary">
            View subscribers, manage PPPoE profiles, and trigger CoA bandwidth isolation
          </Typography>
        </Box>

        <ToggleButtonGroup
          value={filterStatus}
          exclusive
          onChange={(_, newStatus) => newStatus && setFilterStatus(newStatus)}
          size="small"
          color="primary"
        >
          <ToggleButton value="ALL">ALL</ToggleButton>
          <ToggleButton value="ACTIVE">ACTIVE</ToggleButton>
          <ToggleButton value="ISOLATED">ISOLATED</ToggleButton>
          <ToggleButton value="TERMINATED">TERMINATED</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Customers Table Paper */}
      <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 3 }}>
        <Table sx={{ minWidth: 650 }} aria-label="subscribers table">
          <TableHead sx={{ bgcolor: 'action.hover' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Code / Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>PPPoE Credentials</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Speed Plan</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCustomers.map((cust) => (
              <TableRow key={cust.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {cust.fullName}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {cust.customerCode} • {cust.email}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'primary.main', fontWeight: 600 }}>
                    {cust.pppoeUsername}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    IP: {cust.ipAddress}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {cust.planName}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 600 }}>
                    {formatCurrency(cust.monthlyPrice)} / mo
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={cust.status}
                    size="small"
                    color={
                      cust.status === 'ACTIVE'
                        ? 'success'
                        : cust.status === 'ISOLATED'
                        ? 'error'
                        : 'default'
                    }
                    variant={cust.status === 'ACTIVE' ? 'filled' : 'outlined'}
                    sx={{ fontWeight: 700 }}
                  />
                </TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    variant="outlined"
                    color={cust.status === 'ACTIVE' ? 'error' : 'success'}
                    startIcon={cust.status === 'ACTIVE' ? <BlockIcon /> : <CheckCircleIcon />}
                    onClick={() => toggleCustomerStatus(cust.id)}
                    sx={{ borderRadius: 2 }}
                  >
                    {cust.status === 'ACTIVE' ? 'Isolate (CoA)' : 'Unblock'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};
