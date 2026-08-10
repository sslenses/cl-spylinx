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
} from '@mui/material';
import {
  Layers as InventoryIcon,
  Refresh as RefreshIcon,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  Widgets as ItemsIcon,
  Category as ProductsIcon,
  LocalShipping as SuppliersIcon,
  Receipt as InvoicesIcon,
} from '@mui/icons-material';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Cell,
  PieChart,
  Pie,
} from 'recharts';

// Status statistics data
const statusData = [
  { name: 'In stock', value: 12, color: '#2196F3' },
  { name: 'Internal usage', value: 0, color: '#FF9800' },
  { name: 'Rent', value: 0, color: '#F44336' },
  { name: 'Sold', value: 0, color: '#4CAF50' },
  { name: 'Returned', value: 0, color: '#E91E63' },
  { name: 'Assigned', value: 0, color: '#00BCD4' },
  { name: 'Damaged', value: 0, color: '#3F51B5' },
  { name: 'In transit', value: 0, color: '#E91E63' },
  { name: 'In task', value: 0, color: '#009688' },
];

// Summary card data
const summaryCards = [
  { label: 'Items', count: 12, icon: ItemsIcon, color: '#4CAF50' },
  { label: 'Products', count: 95, icon: ProductsIcon, color: '#2196F3' },
  { label: 'Suppliers', count: 6, icon: SuppliersIcon, color: '#FF9800' },
  { label: 'Invoices', count: 6, icon: InvoicesIcon, color: '#F44336' },
];

export const InventoryView: React.FC = () => {
  const [stockLocation, setStockLocation] = useState<string>('all');
  const [chartType, setChartType] = useState<'bar' | 'pie'>('bar');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
              Dashboard
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}>
            Stock location:
          </Typography>
          <FormControl size="small" sx={{ minWidth: 100 }}>
            <Select
              value={stockLocation}
              onChange={(e) => setStockLocation(e.target.value)}
              sx={{ fontSize: '0.8125rem', height: 32 }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="warehouse-1">Warehouse 1</MenuItem>
              <MenuItem value="warehouse-2">Warehouse 2</MenuItem>
            </Select>
          </FormControl>
          <Tooltip title="Refresh">
            <IconButton size="small" sx={{ border: 1, borderColor: 'divider', borderRadius: 1 }}>
              <RefreshIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Summary Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
        {summaryCards.map((card) => (
          <Paper
            key={card.label}
            sx={{
              p: 2,
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 0.5,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <card.icon sx={{ fontSize: 18, color: card.color }} />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {card.label}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Link
                component="button"
                underline="hover"
                sx={{ fontSize: '0.8125rem', color: 'primary.main', fontWeight: 500, cursor: 'pointer' }}
              >
                View
              </Link>
              <Typography sx={{ fontWeight: 800, fontSize: '1.25rem', color: card.color }}>
                {card.count}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>

      {/* Main Content: Status Statistics + Recent Activities */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
        {/* Status Statistics */}
        <Paper sx={{ p: 2.5, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 700 }}>
              Status statistics
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <Tooltip title="Bar Chart">
                <IconButton
                  size="small"
                  onClick={() => setChartType('bar')}
                  sx={{
                    bgcolor: chartType === 'bar' ? 'action.selected' : 'transparent',
                    borderRadius: 1,
                  }}
                >
                  <BarChartIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Pie Chart">
                <IconButton
                  size="small"
                  onClick={() => setChartType('pie')}
                  sx={{
                    bgcolor: chartType === 'pie' ? 'action.selected' : 'transparent',
                    borderRadius: 1,
                  }}
                >
                  <PieChartIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* Chart */}
          <Box sx={{ width: '100%', height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'bar' ? (
                <BarChart data={statusData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(145,158,171,0.16)" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 10 }}
                    tickLine={false}
                    axisLine={{ stroke: 'rgba(145,158,171,0.24)' }}
                    interval={0}
                    angle={0}
                  />
                  <YAxis
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    allowDecimals={false}
                  />
                  <RechartsTooltip
                    contentStyle={{
                      borderRadius: 8,
                      border: 'none',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={40}>
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              ) : (
                <PieChart>
                  <Pie
                    data={statusData.filter((d) => d.value > 0)}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                    paddingAngle={2}
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {statusData
                      .filter((d) => d.value > 0)
                      .map((entry, index) => (
                        <Cell key={`pie-cell-${index}`} fill={entry.color} />
                      ))}
                  </Pie>
                  <RechartsTooltip
                    contentStyle={{
                      borderRadius: 8,
                      border: 'none',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
                      fontSize: 12,
                    }}
                  />
                </PieChart>
              )}
            </ResponsiveContainer>
          </Box>

          {/* Legend */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 700, mb: 1 }}>
              Legend
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1 }}>
              {statusData.map((item) => (
                <Box
                  key={item.name}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: item.color,
                    color: '#ffffff',
                    borderRadius: 1,
                    py: 0.6,
                    px: 1,
                    fontSize: '0.75rem',
                    fontWeight: 600,
                  }}
                >
                  {item.name}
                </Box>
              ))}
            </Box>
          </Box>
        </Paper>

        {/* Recent Activities */}
        <Paper sx={{ p: 2.5, borderRadius: 2, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="body1" sx={{ fontWeight: 700, mb: 2 }}>
            Recent activities
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'text.disabled',
            }}
          >
            <Typography variant="body2">No data to display</Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};
