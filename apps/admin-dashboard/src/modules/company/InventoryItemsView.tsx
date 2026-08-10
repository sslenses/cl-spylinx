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
  Checkbox,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Button,
  TextField,
  InputAdornment,
  Pagination,
  ButtonGroup,
  TableSortLabel,
} from '@mui/material';
import {
  Layers as InventoryIcon,
  Refresh as RefreshIcon,
  Search as SearchIcon,
  MoreHoriz as MoreIcon,
  Add as AddIcon,
  Close as CloseIcon,
  KeyboardArrowDown as ArrowDownIcon,
  KeyboardDoubleArrowLeft as FirstPageIcon,
  KeyboardDoubleArrowRight as LastPageIcon,
  OpenInNew as ExportIcon,
  UnfoldMore as SortIcon,
} from '@mui/icons-material';

// Items data matching the screenshot
const itemsData = [
  { id: 1, product: 'csse', stockLocation: 'Customer premises', supplierInvoiceId: 1, barcode: '', status: 'In stock', mark: 'New' },
  { id: 10, product: 'sunt', stockLocation: 'Customer premises', supplierInvoiceId: 4, barcode: '', status: 'In stock', mark: 'New' },
  { id: 11, product: 'tenetur', stockLocation: 'Pfannerstill LLC', supplierInvoiceId: 5, barcode: '', status: 'In stock', mark: 'New' },
  { id: 12, product: 'delectus', stockLocation: 'Zieme, Kuhic and Ritchie', supplierInvoiceId: 6, barcode: '', status: 'In stock', mark: 'New' },
  { id: 2, product: 'modi', stockLocation: 'Runte, Bins and Konopelski', supplierInvoiceId: 1, barcode: '', status: 'In stock', mark: 'New' },
  { id: 3, product: 'blanditiis', stockLocation: 'Main', supplierInvoiceId: 1, barcode: '', status: 'In stock', mark: 'New' },
  { id: 4, product: 'quia', stockLocation: 'Zieme, Kuhic and Ritchie', supplierInvoiceId: 2, barcode: '', status: 'In stock', mark: 'New' },
  { id: 5, product: 'exercitationem', stockLocation: 'Customer premises', supplierInvoiceId: 3, barcode: '', status: 'In stock', mark: 'New' },
  { id: 6, product: 'odit', stockLocation: 'Runte, Bins and Konopelski', supplierInvoiceId: 3, barcode: '', status: 'In stock', mark: 'New' },
  { id: 7, product: 'repellat', stockLocation: 'Customer premises', supplierInvoiceId: 3, barcode: '', status: 'In stock', mark: 'New' },
  { id: 8, product: 'expedita', stockLocation: 'Pfannerstill LLC', supplierInvoiceId: 3, barcode: '', status: 'In stock', mark: 'New' },
  { id: 9, product: 'dolores', stockLocation: 'Pfannerstill LLC', supplierInvoiceId: 4, barcode: '', status: 'In stock', mark: 'New' },
];

export const InventoryItemsView: React.FC = () => {
  const [stockLocation, setStockLocation] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('any');
  const [productFilter, setProductFilter] = useState<string>('any');
  const [entriesPerPage, setEntriesPerPage] = useState<number>(100);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(itemsData.map((item) => item.id));
    }
    setSelectAll(!selectAll);
  };

  const toggleRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

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
              Inventory /
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 800, fontSize: '1.5rem', lineHeight: 1.2 }}>
              Items
            </Typography>
          </Box>
        </Box>

        {/* Top-right filters */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          {/* Supplier invoice ID filter */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <TextField
              size="small"
              placeholder="Supplier invoice ID"
              sx={{ width: 160, '& .MuiInputBase-root': { height: 32, fontSize: '0.8125rem' } }}
            />
            <IconButton size="small" sx={{ color: 'text.disabled' }}>
              <CloseIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Box>

          {/* Barcode filter */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <TextField
              size="small"
              placeholder="Barcode"
              sx={{ width: 120, '& .MuiInputBase-root': { height: 32, fontSize: '0.8125rem' } }}
            />
            <IconButton size="small" sx={{ color: 'text.disabled' }}>
              <CloseIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Box>

          {/* Status filter */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}>
              Status
            </Typography>
            <FormControl size="small" sx={{ minWidth: 80 }}>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                sx={{ fontSize: '0.8125rem', height: 32 }}
              >
                <MenuItem value="any">Any</MenuItem>
                <MenuItem value="in-stock">In stock</MenuItem>
                <MenuItem value="sold">Sold</MenuItem>
                <MenuItem value="damaged">Damaged</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Product filter */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}>
              Product
            </Typography>
            <FormControl size="small" sx={{ minWidth: 80 }}>
              <Select
                value={productFilter}
                onChange={(e) => setProductFilter(e.target.value)}
                sx={{ fontSize: '0.8125rem', height: 32 }}
              >
                <MenuItem value="any">Any</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Second row: Stock location + Refresh + Add */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%', justifyContent: 'flex-end', mt: 0.5 }}>
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
              startIcon={<AddIcon />}
              endIcon={<ArrowDownIcon />}
              sx={{ textTransform: 'none', fontWeight: 600, height: 32, fontSize: '0.8125rem' }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Table Controls Row */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            endIcon={<ArrowDownIcon />}
            sx={{ textTransform: 'none', fontWeight: 500, height: 30, fontSize: '0.8125rem' }}
          >
            Actions
          </Button>
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
        <Table sx={{ minWidth: 900 }} size="small" aria-label="inventory items table">
          <TableHead sx={{ bgcolor: 'action.hover' }}>
            <TableRow>
              <TableCell padding="checkbox" sx={{ width: 40 }}>
                <Checkbox
                  size="small"
                  checked={selectAll}
                  onChange={toggleSelectAll}
                  sx={{ p: 0.3 }}
                />
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.8125rem', fontStyle: 'italic' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <span>ID</span>
                  <SortIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.8125rem' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <span>Product</span>
                  <SortIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.8125rem', whiteSpace: 'nowrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <span>Stock location</span>
                  <SortIcon sx={{ fontSize: 16, color: 'text.disabled', ml: 0.5 }} />
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.8125rem', fontStyle: 'italic', whiteSpace: 'nowrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <span>Supplier Invoice ID</span>
                  <SortIcon sx={{ fontSize: 16, color: 'text.disabled', ml: 0.5 }} />
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.8125rem' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <span>Barcode</span>
                  <SortIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.8125rem' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <span>Status</span>
                  <SortIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.8125rem' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <span>Mark</span>
                  <SortIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.8125rem' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <span>Photo</span>
                  <SortIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.8125rem' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <span>Notes</span>
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
            {itemsData.map((item) => (
              <TableRow
                key={item.id}
                hover
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    size="small"
                    checked={selectedRows.includes(item.id)}
                    onChange={() => toggleRow(item.id)}
                    sx={{ p: 0.3 }}
                  />
                </TableCell>
                <TableCell sx={{ fontSize: '0.8125rem', color: 'text.secondary' }}>
                  {item.id}
                </TableCell>
                <TableCell>
                  <Link
                    component="button"
                    underline="hover"
                    sx={{ fontSize: '0.8125rem', color: 'primary.main', cursor: 'pointer', fontWeight: 500 }}
                  >
                    {item.product}
                  </Link>
                </TableCell>
                <TableCell sx={{ fontSize: '0.8125rem' }}>
                  {item.stockLocation}
                </TableCell>
                <TableCell sx={{ fontSize: '0.8125rem', color: '#4CAF50', fontWeight: 500 }}>
                  {item.supplierInvoiceId}
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontSize: '0.8125rem', color: 'primary.main', fontStyle: 'italic' }}>
                    Please insert barcode
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={item.status}
                    size="small"
                    sx={{
                      bgcolor: '#2196F3',
                      color: '#ffffff',
                      fontWeight: 600,
                      fontSize: '0.7rem',
                      height: 22,
                      borderRadius: 0.5,
                    }}
                  />
                </TableCell>
                <TableCell sx={{ fontSize: '0.8125rem', color: 'text.secondary' }}>
                  {item.mark}
                </TableCell>
                <TableCell />
                <TableCell />
                <TableCell>
                  <IconButton size="small" sx={{ color: 'primary.main' }}>
                    <MoreIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Pagination Footer */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1.5 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8125rem' }}>
          Showing 1 to 12 of 12 entries
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

      {/* Totals Section */}
      <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Box sx={{ px: 2.5, py: 1.5 }}>
          <Typography variant="body1" sx={{ fontWeight: 700, color: 'primary.main' }}>
            Totals
          </Typography>
        </Box>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: 'action.hover' }}>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.8125rem' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.8125rem' }}>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[
              { status: 'In stock', amount: 12, color: '#2196F3' },
              { status: 'Internal usage', amount: 0, color: '#FF9800' },
              { status: 'Rent', amount: 0, color: '#F44336' },
              { status: 'Sold', amount: 0, color: '#4CAF50' },
              { status: 'Returned', amount: 0, color: '#E91E63' },
              { status: 'Assigned', amount: 0, color: '#00BCD4' },
              { status: 'Damaged', amount: 0, color: '#3F51B5' },
              { status: 'In transit', amount: 0, color: '#E91E63' },
              { status: 'In task', amount: 0, color: '#009688' },
            ].map((row) => (
              <TableRow key={row.status} hover>
                <TableCell>
                  <Chip
                    label={row.status}
                    size="small"
                    sx={{
                      bgcolor: row.color,
                      color: '#ffffff',
                      fontWeight: 600,
                      fontSize: '0.7rem',
                      height: 22,
                      borderRadius: 0.5,
                    }}
                  />
                </TableCell>
                <TableCell sx={{ fontSize: '0.8125rem' }}>
                  {row.amount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};
