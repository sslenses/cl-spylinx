import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Box,
  Typography,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useAppStore } from '../../lib/store';

export const QuickAddModal: React.FC = () => {
  const { isQuickAddOpen, setQuickAddOpen, addCustomer } = useAppStore();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pppoeUsername, setPppoeUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    addCustomer({
      customerCode: `ISP-${Math.floor(1000 + Math.random() * 9000)}`,
      fullName,
      email,
      phone: phone || '+628123456789',
      status: 'ACTIVE',
      billingType: 'POSTPAID',
      pppoeUsername: pppoeUsername || `${fullName.toLowerCase().replace(/\s+/g, '_')}_net`,
      planName: 'Ultra Fiber 100 Mbps',
      monthlyPrice: 450000,
      ipAddress: `103.144.12.${Math.floor(Math.random() * 200)}`,
      address: 'Jakarta, Indonesia',
    });

    setFullName('');
    setEmail('');
    setPhone('');
    setPppoeUsername('');
    setQuickAddOpen(false);
  };

  return (
    <Dialog
      open={isQuickAddOpen}
      onClose={() => setQuickAddOpen(false)}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            p: 1,
          },
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyBetween: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, flexGrow: 1 }}>
          + Add New Subscriber
        </Typography>
        <IconButton
          aria-label="close"
          onClick={() => setQuickAddOpen(false)}
          sx={{ color: (theme) => theme.palette.grey[500] }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, py: 2.5 }}>
          <TextField
            label="Full Name"
            required
            fullWidth
            size="small"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="e.g. John Doe"
          />

          <TextField
            label="Email"
            type="email"
            required
            fullWidth
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
          />

          <TextField
            label="Phone Number"
            fullWidth
            size="small"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+628123456789"
          />

          <TextField
            label="PPPoE Username"
            fullWidth
            size="small"
            value={pppoeUsername}
            onChange={(e) => setPppoeUsername(e.target.value)}
            placeholder="john_net"
          />
        </DialogContent>

        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={() => setQuickAddOpen(false)} color="inherit" size="small">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary" size="small">
            Save Subscriber
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
