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
  TableSortLabel,
} from '@mui/material';
import {
  Layers as InventoryIcon,
  Refresh as RefreshIcon,
  Search as SearchIcon,
  MoreHoriz as MoreIcon,
  Add as AddIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  OpenInNew as ExportIcon,
  KeyboardDoubleArrowLeft as FirstPageIcon,
  KeyboardDoubleArrowRight as LastPageIcon,
  UnfoldMore as SortIcon,
} from '@mui/icons-material';

// Products data matching the screenshot
const productsData = [
  { name: 'accusantium', vendor: 'Mayer, Runte and Glover', category: '---', sellPrice: 948.00, rentPrice: 256.00, inStock: 0, internalUsage: 0, rent: 0, sold: 0, returned: 0, assigned: 0, damaged: 0, inTransit: 0, inTask: 0 },
  { name: 'ad', vendor: 'Nitzsche-Botsford', category: '---', sellPrice: 920.00, rentPrice: 289.00, inStock: 0, internalUsage: 0, rent: 0, sold: 0, returned: 0, assigned: 0, damaged: 0, inTransit: 0, inTask: 0 },
  { name: 'allquam', vendor: 'Mayer, Runte and Glover', category: '---', sellPrice: 549.00, rentPrice: 198.00, inStock: 0, internalUsage: 0, rent: 0, sold: 0, returned: 0, assigned: 0, damaged: 0, inTransit: 0, inTask: 0 },
  { name: 'aliquid', vendor: 'Block, Kling and Johns', category: '---', sellPrice: 374.00, rentPrice: 70.00, inStock: 0, internalUsage: 0, rent: 0, sold: 0, returned: 0, assigned: 0, damaged: 0, inTransit: 0, inTask: 0 },
  { name: 'aliquid', vendor: 'Kulas, Lakin and Ritchie', category: '---', sellPrice: 333.00, rentPrice: 34.00, inStock: 0, internalUsage: 0, rent: 0, sold: 0, returned: 0, assigned: 0, damaged: 0, inTransit: 0, inTask: 0 },
  { name: 'amet', vendor: 'Zboncak-VonRueden', category: '---', sellPrice: 148.00, rentPrice: 18.00, inStock: 0, internalUsage: 0, rent: 0, sold: 0, returned: 0, assigned: 0, damaged: 0, inTransit: 0, inTask: 0 },
  { name: 'architecto', vendor: 'Reichert-Borer', category: '---', sellPrice: 289.00, rentPrice: 137.00, inStock: 0, internalUsage: 0, rent: 0, sold: 0, returned: 0, assigned: 0, damaged: 0, inTransit: 0, inTask: 0 },
  { name: 'asperlores', vendor: 'Zboncak-VonRueden', category: '---', sellPrice: 239.00, rentPrice: 44.00, inStock: 0, internalUsage: 0, rent: 0, sold: 0, returned: 0, assigned: 0, damaged: 0, inTransit: 0, inTask: 0 },
  { name: 'assumenda', vendor: 'Mayer, Runte and Glover', category: '---', sellPrice: 865.00, rentPrice: 39.00, inStock: 0, internalUsage: 0, rent: 0, sold: 0, returned: 0, assigned: 0, damaged: 0, inTransit: 0, inTask: 0 },
  { name: 'aut', vendor: 'Effertz, Larkin and Morar', category: '---', sellPrice: 398.00, rentPrice: 102.00, inStock: 0, internalUsage: 0, rent: 0, sold: 0, returned: 0, assigned: 0, damaged: 0, inTransit: 0, inTask: 0 },
  { name: 'aut', vendor: 'Block, Kling and Johns', category: '---', sellPrice: 490.00, rentPrice: 239.00, inStock: 0, internalUsage: 0, rent: 0, sold: 0, returned: 0, assigned: 0, damaged: 0, inTransit: 0, inTask: 0 },
];

export const InventoryProductsView: React.FC = () => {
  const [stockLocation, setStockLocation] = useState<string>('all');
  const [vendorFilter, setVendorFilter] = useState<string>('all');
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
              Inventory /
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 800, fontSize: '1.5rem', lineHeight: 1.2 }}>
              Products
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
            Vendor
          </Typography>
          <FormControl size="small" sx={{ minWidth: 100 }}>
            <Select
              value={vendorFilter}
              onChange={(e) => setVendorFilter(e.target.value)}
              sx={{ fontSize: '0.8125rem', height: 32 }}
            >
              <MenuItem value="all">All</MenuItem>
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
            Add product
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
        <Table sx={{ minWidth: 1200 }} size="small" aria-label="inventory products table">
          <TableHead sx={{ bgcolor: 'action.hover' }}>
            <TableRow>
              {[
                'Name',
                'Vendor',
                'Category',
                'Sell price',
                'Rent price',
                'Photo',
                'In stock',
                'Internal usage',
                'Rent',
                'Sold',
                'Returned',
                'Assigned',
                'Damaged',
                'In transit',
                'In task',
                'Actions',
              ].map((col) => (
                <TableCell key={col} sx={{ fontWeight: 700, fontSize: '0.8125rem', whiteSpace: 'nowrap' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', gap: 0.5 }}>
                    <span>{col}</span>
                    <SortIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {productsData.map((item, idx) => (
              <TableRow key={`${item.name}-${idx}`} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <Link
                    component="button"
                    underline="hover"
                    sx={{ fontSize: '0.8125rem', color: 'primary.main', cursor: 'pointer', fontWeight: 500, whiteSpace: 'nowrap' }}
                  >
                    {item.name}
                  </Link>
                </TableCell>
                <TableCell sx={{ fontSize: '0.8125rem', whiteSpace: 'nowrap' }}>
                  {item.vendor}
                </TableCell>
                <TableCell sx={{ fontSize: '0.8125rem', color: 'text.secondary' }}>
                  {item.category}
                </TableCell>
                <TableCell sx={{ fontSize: '0.8125rem', whiteSpace: 'nowrap' }}>
                  {item.sellPrice.toFixed(2)} $
                </TableCell>
                <TableCell sx={{ fontSize: '0.8125rem', whiteSpace: 'nowrap' }}>
                  {item.rentPrice.toFixed(2)} $
                </TableCell>
                <TableCell />
                <TableCell sx={{ fontSize: '0.8125rem', color: '#4CAF50', fontWeight: 600 }}>
                  {item.inStock}
                </TableCell>
                <TableCell sx={{ fontSize: '0.8125rem', color: '#4CAF50', fontWeight: 600 }}>
                  {item.internalUsage}
                </TableCell>
                <TableCell sx={{ fontSize: '0.8125rem', color: '#4CAF50', fontWeight: 600 }}>
                  {item.rent}
                </TableCell>
                <TableCell sx={{ fontSize: '0.8125rem', color: '#4CAF50', fontWeight: 600 }}>
                  {item.sold}
                </TableCell>
                <TableCell sx={{ fontSize: '0.8125rem', color: '#4CAF50', fontWeight: 600 }}>
                  {item.returned}
                </TableCell>
                <TableCell sx={{ fontSize: '0.8125rem', color: '#4CAF50', fontWeight: 600 }}>
                  {item.assigned}
                </TableCell>
                <TableCell sx={{ fontSize: '0.8125rem', color: '#4CAF50', fontWeight: 600 }}>
                  {item.damaged}
                </TableCell>
                <TableCell sx={{ fontSize: '0.8125rem', color: '#4CAF50', fontWeight: 600 }}>
                  {item.inTransit}
                </TableCell>
                <TableCell sx={{ fontSize: '0.8125rem', color: '#4CAF50', fontWeight: 600 }}>
                  {item.inTask}
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 0.3 }}>
                    <IconButton size="small" sx={{ color: 'primary.main' }}>
                      <ViewIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                    <IconButton size="small" sx={{ color: 'warning.main' }}>
                      <EditIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                    <IconButton size="small" sx={{ color: 'error.main' }}>
                      <DeleteIcon sx={{ fontSize: 16 }} />
                    </IconButton>
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
          Showing 1 to 11 of 95 entries
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
          <Button
            size="small"
            variant="outlined"
            sx={{
              minWidth: 28,
              height: 28,
              fontSize: '0.75rem',
              fontWeight: 500,
              p: 0,
            }}
          >
            2
          </Button>
          <IconButton size="small" sx={{ border: 1, borderColor: 'divider', borderRadius: 1 }}>
            <LastPageIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};
