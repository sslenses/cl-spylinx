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
  Visibility as ViewIcon,
  Edit as EditIcon,
  OpenInNew as ExportIcon,
  KeyboardDoubleArrowLeft as FirstPageIcon,
  KeyboardDoubleArrowRight as LastPageIcon,
  UnfoldMore as SortIcon,
} from '@mui/icons-material';

const vendorsData = [
  'Block, Kling and Johns',
  'Dicki, Powlowski and Murphy',
  'Effertz, Larkin and Morar',
  'Kulas, Lakin and Ritchie',
  'Lesch, Pollich and Mueller',
  'Mayer, Runte and Glover',
  'Mikrotik',
  'Muller-Murphy',
  'Nitzsche-Botsford',
  'Reichert-Borer',
  'Zboncak-VonRueden',
];

export const InventoryVendorsView: React.FC = () => {
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
              Vendors
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
            Add vendor
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
        <Table sx={{ minWidth: 650 }} size="small" aria-label="inventory vendors table">
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
                  <span>Actions</span>
                  <SortIcon sx={{ fontSize: 16, color: 'text.disabled', ml: 0.5 }} />
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vendorsData.map((name, idx) => (
              <TableRow
                key={`${name}-${idx}`}
                hover
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  <Link
                    component="button"
                    underline="hover"
                    sx={{ fontSize: '0.8125rem', color: 'primary.main', cursor: 'pointer', fontWeight: 500 }}
                  >
                    {name}
                  </Link>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 0.3 }}>
                    <IconButton size="small" sx={{ color: 'primary.main' }}>
                      <ViewIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                    <IconButton size="small" sx={{ color: 'warning.main' }}>
                      <EditIcon sx={{ fontSize: 16 }} />
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
          Showing 1 to 11 of 11 entries
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
          <IconButton size="small" disabled sx={{ border: 1, borderColor: 'divider', borderRadius: 1 }}>
            <FirstPageIcon sx={{ fontSize: 16 }} />
          </IconButton>
          <Button
            size="small"
            variant="contained"
            sx={{ minWidth: 28, height: 28, fontSize: '0.75rem', fontWeight: 700, p: 0 }}
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
