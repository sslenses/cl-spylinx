import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import {
  PictureAsPdf as PdfIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import { useAppStore } from '../../lib/store';
import { formatCurrency } from '../../lib/utils';

export const FinanceView: React.FC = () => {
  const { invoices, searchQuery } = useAppStore();
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'ALL' || inv.paymentStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Header & Filter Controls */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h1" sx={{ fontSize: '1.75rem', fontWeight: 700 }}>
            Finance & Invoicing (BSS/ERP)
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage billing invoices, proforma statements, and payment status
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
          <ToggleButton value="PAID">PAID</ToggleButton>
          <ToggleButton value="UNPAID">UNPAID</ToggleButton>
          <ToggleButton value="OVERDUE">OVERDUE</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Finance Invoices Table Paper */}
      <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="finance invoices table">
          <TableHead sx={{ bgcolor: 'action.hover' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Invoice Number</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Subscriber</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Total Amount</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Due Date</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Payment Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInvoices.map((inv) => (
              <TableRow key={inv.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell sx={{ fontFamily: 'monospace', fontWeight: 700, color: 'primary.main' }}>
                  {inv.invoiceNumber}
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }}>
                  {inv.customerName}
                </TableCell>
                <TableCell sx={{ fontWeight: 800, color: 'success.main' }}>
                  {formatCurrency(inv.totalAmount)}
                </TableCell>
                <TableCell sx={{ color: 'text.secondary', fontSize: '0.8125rem' }}>
                  {inv.dueDate}
                </TableCell>
                <TableCell>
                  <Chip
                    icon={inv.paymentStatus === 'PAID' ? <CheckCircleIcon /> : <WarningIcon />}
                    label={inv.paymentStatus}
                    size="small"
                    color={
                      inv.paymentStatus === 'PAID'
                        ? 'success'
                        : inv.paymentStatus === 'OVERDUE'
                        ? 'error'
                        : 'warning'
                    }
                    variant="outlined"
                    sx={{ fontWeight: 700 }}
                  />
                </TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    variant="outlined"
                    color="inherit"
                    startIcon={<PdfIcon />}
                    sx={{ borderRadius: 2 }}
                  >
                    PDF
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
