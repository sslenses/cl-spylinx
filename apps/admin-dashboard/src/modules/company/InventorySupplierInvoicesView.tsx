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
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  TextField,
  InputAdornment,
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
  QrCodeScanner as BarcodeIcon,
  Article as InvoiceDetailIcon,
  Layers as StockItemsIcon,
  KeyboardDoubleArrowLeft as FirstPageIcon,
  KeyboardDoubleArrowRight as LastPageIcon,
  UnfoldMore as SortIcon,
} from '@mui/icons-material';

// Supplier Invoices data matching the screenshot
const invoicesData = [
  { id: 1, supplier: 'Wolff-Koch', invoiceNumber: '392662202385', invoiceFile: '', date: '2026-08-10' },
  { id: 2, supplier: 'Wolff-Koch', invoiceNumber: '773174195', invoiceFile: '', date: '2026-08-10' },
  { id: 3, supplier: 'Veum, Ondricka and Okuneva', invoiceNumber: '018004851609', invoiceFile: '', date: '2026-08-10' },
  { id: 4, supplier: 'Reseller', invoiceNumber: '1714037662', invoiceFile: '', date: '2026-08-10' },
  { id: 5, supplier: 'Wolff-Koch', invoiceNumber: '3378936501', invoiceFile: '', date: '2026-08-10' },
  { id: 6, supplier: 'Wolff-Koch', invoiceNumber: '89787075997797', invoiceFile: '', date: '2026-08-10' },
];

export const InventorySupplierInvoicesView: React.FC = () => {
  const [stockLocation, setStockLocation] = useState<string>('all');
  const [supplierFilter, setSupplierFilter] = useState<string>('all');
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
              Supplier invoices
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

          <Typography variant="body2" sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}>
            Supplier
          </Typography>
          <FormControl size="small" sx={{ minWidth: 100 }}>
            <Select
              value={supplierFilter}
              onChange={(e) => setSupplierFilter(e.target.value)}
              sx={{ fontSize: '0.8125rem', height: 32 }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="wolff-koch">Wolff-Koch</MenuItem>
              <MenuItem value="veum">Veum, Ondricka and Okuneva</MenuItem>
              <MenuItem value="reseller">Reseller</MenuItem>
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
            Add invoice
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
        <Table sx={{ minWidth: 900 }} size="small" aria-label="inventory supplier invoices table">
          <TableHead sx={{ bgcolor: 'action.hover' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.8125rem', fontStyle: 'italic', width: 60 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <span>ID</span>
                  <SortIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.8125rem' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <span>Supplier</span>
                  <SortIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.8125rem', whiteSpace: 'nowrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <span>Supplier invoice number</span>
                  <SortIcon sx={{ fontSize: 16, color: 'text.disabled', ml: 0.5 }} />
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.8125rem', whiteSpace: 'nowrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <span>Invoice file</span>
                  <SortIcon sx={{ fontSize: 16, color: 'text.disabled', ml: 0.5 }} />
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.8125rem' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <span>Date</span>
                  <SortIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
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
            {invoicesData.map((item) => (
              <TableRow
                key={item.id}
                hover
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell sx={{ fontSize: '0.8125rem' }}>
                  {item.id}
                </TableCell>
                <TableCell>
                  <Link
                    component="button"
                    underline="hover"
                    sx={{ fontSize: '0.8125rem', color: 'primary.main', cursor: 'pointer', fontWeight: 500, whiteSpace: 'nowrap' }}
                  >
                    {item.supplier}
                  </Link>
                </TableCell>
                <TableCell sx={{ fontSize: '0.8125rem' }}>
                  {item.invoiceNumber}
                </TableCell>
                <TableCell sx={{ fontSize: '0.8125rem', color: 'text.secondary' }}>
                  {item.invoiceFile || ''}
                </TableCell>
                <TableCell sx={{ fontSize: '0.8125rem', whiteSpace: 'nowrap' }}>
                  {item.date}
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 0.3 }}>
                    <Tooltip title="View">
                      <IconButton size="small" sx={{ color: 'primary.main' }}>
                        <ExportIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton size="small" sx={{ color: 'primary.main' }}>
                        <EditIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Print barcodes">
                      <IconButton size="small" sx={{ color: 'primary.main' }}>
                        <BarcodeIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Invoice details">
                      <IconButton size="small" sx={{ color: 'primary.main' }}>
                        <InvoiceDetailIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Stock items">
                      <IconButton size="small" sx={{ color: 'primary.main' }}>
                        <StockItemsIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small" sx={{ color: 'primary.main' }}>
                        <DeleteIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Tooltip>
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
