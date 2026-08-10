import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Link,
  Select,
  MenuItem,
  FormControl,
  Tooltip,
  Chip,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  TextField,
  InputAdornment,
  TableSortLabel,
} from '@mui/material';
import {
  Layers as InventoryIcon,
  Refresh as RefreshIcon,
  Search as SearchIcon,
  MoreHoriz as MoreIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  OpenInNew as ExportIcon,
  KeyboardDoubleArrowLeft as FirstPageIcon,
  KeyboardDoubleArrowRight as LastPageIcon,
  UnfoldMore as SortIcon,
} from '@mui/icons-material';

// Suppliers data matching the screenshot
const suppliersData = [
  { name: 'Hayes, Green and Grady', address: '91752 Kiehn Land West Danny, LA 13752-7896', contactName: '', email: 'carolanne.witting@anderson.com', phone: '620.356.3577', taxIncluded: false },
  { name: 'Morissette, Romaguera and Wunsch', address: '63836 Eveline Heights Aliyahstad, NE 71621', contactName: '', email: 'nswift@kohler.com', phone: '807.976.4424', taxIncluded: true },
  { name: 'Reseller', address: 'Reseller', contactName: 'Reseller', email: 'Reseller@reseller.com', phone: '', taxIncluded: false },
  { name: 'Veum, Ondricka and Okuneva', address: '7627 Dooley Hills New Erinmouth, NH 59607-6953', contactName: '', email: 'jacobi.judge@hotmail.com', phone: '+1-471-223-1835', taxIncluded: true },
  { name: 'Williamson Inc', address: '1290 Carmen Square Apt. 955 New Marianne, MS 40568-4745', contactName: '', email: 'kraig.pollich@gmail.com', phone: '+1-618-844-9546', taxIncluded: true },
  { name: 'Wolff-Koch', address: '99059 Neoma Squares East Deonmouth, MN 41508', contactName: '', email: 'orn.ursula@hotmail.com', phone: '+1.401.458.3967', taxIncluded: false },
];

export const InventorySuppliersView: React.FC = () => {
  const [stockLocation, setStockLocation] = useState<string>('all');
  const [entriesPerPage, setEntriesPerPage] = useState<number>(100);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 1,
              bgcolor: '#00bfa5',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <InventoryIcon fontSize="small" />
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: '#00bfa5', fontWeight: 600, fontSize: '0.7rem' }}>
              Inventory / Supply /
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 800, fontSize: '1.5rem', lineHeight: 1.2 }}>
              Suppliers
            </Typography>
          </Box>
        </Box>

        {/* Top-right filters */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}>
            Stock location
          </Typography>
          <FormControl size="small" sx={{ minWidth: 100 }}>
            <Select
              value={stockLocation}
              onChange={(e) => setStockLocation(e.target.value)}
              sx={{ fontSize: '0.8125rem', height: 32 }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="main">Main</MenuItem>
              <MenuItem value="customer-premises">Customer premises</MenuItem>
            </Select>
          </FormControl>
          <Tooltip title="Refresh">
            <IconButton size="small" sx={{ border: 1, borderColor: 'divider', borderRadius: 1 }}>
              <RefreshIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Button
            variant="contained"
            size="small"
            sx={{ textTransform: 'none', fontWeight: 600, height: 32, fontSize: '0.8125rem', whiteSpace: 'nowrap' }}
          >
            Add supplier
          </Button>
        </Box>
      </Box>

      {/* Table Controls Row */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Show
          </Typography>
          <FormControl size="small" sx={{ minWidth: 60 }}>
            <Select
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(e.target.value as number)}
              sx={{ fontSize: '0.8125rem', height: 28 }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            entries
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextField
            size="small"
            placeholder="Search"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              },
            }}
            sx={{ width: 180, '& .MuiInputBase-root': { height: 30, fontSize: '0.8125rem' } }}
          />
          <Tooltip title="More options">
            <IconButton size="small" sx={{ border: 1, borderColor: 'divider', borderRadius: 1 }}>
              <MoreIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Export">
            <IconButton size="small" sx={{ border: 1, borderColor: 'divider', borderRadius: 1 }}>
              <ExportIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Data Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 2 }}>
        <Table sx={{ minWidth: 900 }} size="small" aria-label="inventory suppliers table">
          <TableHead sx={{ bgcolor: 'action.hover' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.8125rem' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <span>Name</span>
                  <SortIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.8125rem' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <span>Address</span>
                  <SortIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.8125rem', whiteSpace: 'nowrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <span>Contact name</span>
                  <SortIcon sx={{ fontSize: 16, color: 'text.disabled', ml: 0.5 }} />
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.8125rem' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <span>Email</span>
                  <SortIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.8125rem' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <span>Phone</span>
                  <SortIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.8125rem', whiteSpace: 'nowrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <span>Tax included</span>
                  <SortIcon sx={{ fontSize: 16, color: 'text.disabled', ml: 0.5 }} />
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.8125rem' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <span>Actions</span>
                  <SortIcon sx={{ fontSize: 16, color: 'text.disabled', ml: 0.5 }} />
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suppliersData.map((item, idx) => (
              <TableRow
                key={`${item.name}-${idx}`}
                hover
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  <Link
                    component="button"
                    underline="hover"
                    sx={{ fontSize: '0.8125rem', color: 'primary.main', cursor: 'pointer', fontWeight: 500, whiteSpace: 'nowrap' }}
                  >
                    {item.name}
                  </Link>
                </TableCell>
                <TableCell sx={{ fontSize: '0.8125rem' }}>
                  {item.address}
                </TableCell>
                <TableCell sx={{ fontSize: '0.8125rem' }}>
                  {item.contactName}
                </TableCell>
                <TableCell sx={{ fontSize: '0.8125rem' }}>
                  {item.email}
                </TableCell>
                <TableCell sx={{ fontSize: '0.8125rem', whiteSpace: 'nowrap' }}>
                  {item.phone}
                </TableCell>
                <TableCell>
                  <Chip
                    label={item.taxIncluded ? 'Yes' : 'No'}
                    size="small"
                    sx={{
                      bgcolor: item.taxIncluded ? '#4CAF50' : '#FF9800',
                      color: '#ffffff',
                      fontWeight: 700,
                      fontSize: '0.7rem',
                      height: 22,
                      borderRadius: 0.5,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 0.3 }}>
                    <IconButton size="small" sx={{ color: 'primary.main' }}>
                      <ViewIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                    <IconButton size="small" sx={{ color: 'warning.main' }}>
                      <EditIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                    {item.name !== 'Reseller' && (
                      <IconButton size="small" sx={{ color: 'error.main' }}>
                        <DeleteIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Pagination Footer */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1.5 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8125rem' }}>
          Showing 1 to 6 of 6 entries
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
          <IconButton size="small" disabled sx={{ border: 1, borderColor: 'divider', borderRadius: 1 }}>
            <FirstPageIcon sx={{ fontSize: 16 }} />
          </IconButton>
          <Button
            size="small"
            variant="contained"
            sx={{
              minWidth: 28,
              height: 28,
              fontSize: '0.75rem',
              fontWeight: 700,
              p: 0,
            }}
          >
            1
          </Button>
          <IconButton size="small" disabled sx={{ border: 1, borderColor: 'divider', borderRadius: 1 }}>
            <LastPageIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};
