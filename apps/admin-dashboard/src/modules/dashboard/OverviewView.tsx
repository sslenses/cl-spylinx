import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Paper,
  Link,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  IconButton,
  Tooltip,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  PersonAdd as PersonAddIcon,
  ConfirmationNumber as TicketIcon,
  PowerOff as DeviceDownIcon,
  Edit as EditIcon,
  Handshake as LeadIcon,
  AssignmentTurnedIn as TaskIcon,
  Send as MessageIcon,
  Router as RouterIcon,
  DeveloperBoard as HardwareIcon,
  PriceChange as TariffIcon,
  Settings as ConfigIcon,
  Tune as ModuleIcon,
  ExpandMore as ExpandMoreIcon,
  CalendarToday as CalendarIcon,
  Computer as SystemStatusIcon,
  Group as CustomersIcon,
  Language as NetworkingIcon,
  MonetizationOn as FinanceIcon,
  Diamond as LeadsIcon,
  MenuOpen as MenuOpenIcon,
} from '@mui/icons-material';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Legend,
} from 'recharts';
import { useAppStore } from '../../lib/store';

const customerTelemetryData = [
  { date: '2026-07-10', active: 4, blocked: 1 },
  { date: '2026-07-15', active: 4, blocked: 1 },
  { date: '2026-07-20', active: 5, blocked: 1 },
  { date: '2026-07-25', active: 5, blocked: 2 },
  { date: '2026-07-30', active: 5, blocked: 2 },
  { date: '2026-08-05', active: 5, blocked: 2 },
  { date: '2026-08-10', active: 5, blocked: 2 },
];

export const OverviewView: React.FC = () => {
  const { customers, routers, tickets, setActiveModule, setQuickAddOpen, isSidebarCollapsed, toggleSidebar } = useAppStore();
  const [telemetryExpanded, setTelemetryExpanded] = useState<boolean>(true);
  const [systemExpanded, setSystemExpanded] = useState<boolean>(true);
  const [customersExpanded, setCustomersExpanded] = useState<boolean>(true);
  const [networkingExpanded, setNetworkingExpanded] = useState<boolean>(true);
  const [leadsExpanded, setLeadsExpanded] = useState<boolean>(true);
  const [financeExpanded, setFinanceExpanded] = useState<boolean>(true);
  const [ticketsExpanded, setTicketsExpanded] = useState<boolean>(true);

  const activeCustomersCount = customers.filter((c) => c.status === 'ACTIVE').length;
  const blockedCustomersCount = customers.filter((c) => c.status === 'ISOLATED').length;
  const openTicketsCount = tickets.filter((t) => t.status !== 'CLOSED').length;
  const downRoutersCount = routers.filter((r) => r.status === 'OFFLINE').length;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Top Page Header Title */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 1,
            bgcolor: 'primary.main',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <DashboardIcon fontSize="small" />
        </Box>
        <Typography variant="h2" sx={{ fontWeight: 700, fontSize: '1.5rem' }}>
          Dashboard
        </Typography>
      </Box>

      {/* Top 4 Telemetry Metric Cards Grid */}
      <Grid container spacing={2.5}>
        {/* Card 1: Online customers */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ p: 2.5, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <PeopleIcon sx={{ color: 'success.main', fontSize: 22 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Online customers
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
              <Typography
                component="span"
                variant="body2"
                onClick={() => setActiveModule('customers')}
                sx={{ fontWeight: 600, color: 'primary.main', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
              >
                View
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'success.main' }}>
                {activeCustomersCount}
              </Typography>
            </Box>
          </Card>
        </Grid>

        {/* Card 2: New customers */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ p: 2.5, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <PersonAddIcon sx={{ color: 'primary.main', fontSize: 22 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                New customers
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
              <Typography
                component="span"
                variant="body2"
                onClick={() => setActiveModule('customers')}
                sx={{ fontWeight: 600, color: 'primary.main', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
              >
                View
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 800, color: 'primary.main' }}>
                {customers.length}
              </Typography>
            </Box>
          </Card>
        </Grid>

        {/* Card 3: New & open tickets */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ p: 2.5, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <TicketIcon sx={{ color: 'warning.main', fontSize: 22 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                New & open tickets
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
              <Typography
                component="span"
                variant="body2"
                onClick={() => setActiveModule('tickets')}
                sx={{ fontWeight: 600, color: 'primary.main', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
              >
                View
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 800, color: 'warning.main' }}>
                {openTicketsCount}
              </Typography>
            </Box>
          </Card>
        </Grid>

        {/* Card 4: Devices down */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ p: 2.5, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <DeviceDownIcon sx={{ color: 'error.main', fontSize: 22 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Devices down
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
              <Typography
                component="span"
                variant="body2"
                onClick={() => setActiveModule('networking')}
                sx={{ fontWeight: 600, color: 'primary.main', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
              >
                View
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 800, color: 'error.main' }}>
                {downRoutersCount}
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Splynx Demo Banner Notice */}
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(255, 171, 0, 0.12)' : '#fff8e1'),
          border: '1px solid',
          borderColor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(255, 171, 0, 0.3)' : '#ffe082'),
          borderRadius: 1,
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1, color: 'warning.dark' }}>
          Welcome to EIMAS ISP Framework demo
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.primary', mb: 0.5 }}>
          Some features are disabled in demo version: for example password changing for administrators...
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.primary', mb: 0.5 }}>
          To try EIMAS on own server, please get trial license{' '}
          <Link href="#" underline="hover" sx={{ fontWeight: 700, color: 'primary.main' }}>
            here
          </Link>
        </Typography>
        <Typography variant="caption" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
          All demo data in this server are restored every 24 hours
        </Typography>
      </Paper>

      {/* Shortcuts Card */}
      <Card sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            Shortcuts
          </Typography>
          <Tooltip title="Edit Shortcuts">
            <IconButton size="small">
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Button
            size="small"
            startIcon={<PersonAddIcon fontSize="small" sx={{ color: 'secondary.main' }} />}
            onClick={() => setQuickAddOpen(true)}
            sx={{ color: 'primary.main', fontWeight: 600, px: 1.5 }}
          >
            Add customer
          </Button>

          <Button
            size="small"
            startIcon={<LeadIcon fontSize="small" sx={{ color: 'secondary.main' }} />}
            onClick={() => setActiveModule('customers')}
            sx={{ color: 'primary.main', fontWeight: 600, px: 1.5 }}
          >
            Add lead
          </Button>

          <Button
            size="small"
            startIcon={<TicketIcon fontSize="small" sx={{ color: 'secondary.main' }} />}
            onClick={() => setQuickAddOpen(true)}
            sx={{ color: 'primary.main', fontWeight: 600, px: 1.5 }}
          >
            Add ticket
          </Button>

          <Button
            size="small"
            startIcon={<TaskIcon fontSize="small" sx={{ color: 'success.main' }} />}
            onClick={() => setActiveModule('scheduling')}
            sx={{ color: 'primary.main', fontWeight: 600, px: 1.5 }}
          >
            Add task
          </Button>

          <Button
            size="small"
            startIcon={<MessageIcon fontSize="small" sx={{ color: 'secondary.main' }} />}
            onClick={() => setActiveModule('customers')}
            sx={{ color: 'primary.main', fontWeight: 600, px: 1.5 }}
          >
            Send message
          </Button>

          <Button
            size="small"
            startIcon={<RouterIcon fontSize="small" sx={{ color: 'success.main' }} />}
            onClick={() => setActiveModule('networking')}
            sx={{ color: 'primary.main', fontWeight: 600, px: 1.5 }}
          >
            Add router
          </Button>

          <Button
            size="small"
            startIcon={<HardwareIcon fontSize="small" sx={{ color: 'info.main' }} />}
            onClick={() => setActiveModule('inventory')}
            sx={{ color: 'primary.main', fontWeight: 600, px: 1.5 }}
          >
            Add hardware
          </Button>

          <Button
            size="small"
            startIcon={<TariffIcon fontSize="small" sx={{ color: 'success.main' }} />}
            onClick={() => setActiveModule('tariff-plans')}
            sx={{ color: 'primary.main', fontWeight: 600, px: 1.5 }}
          >
            Add internet tariff plan
          </Button>

          <Button
            size="small"
            startIcon={<ConfigIcon fontSize="small" sx={{ color: 'text.secondary' }} />}
            onClick={() => setActiveModule('config')}
            sx={{ color: 'primary.main', fontWeight: 600, px: 1.5 }}
          >
            Configure the system
          </Button>

          <Button
            size="small"
            startIcon={<ModuleIcon fontSize="small" sx={{ color: 'text.secondary' }} />}
            onClick={() => setActiveModule('config')}
            sx={{ color: 'primary.main', fontWeight: 600, px: 1.5 }}
          >
            Configure modules
          </Button>
        </Box>
      </Card>

      {/* Connected customers (active + blocked) Chart Card Accordion */}
      <Accordion
        expanded={telemetryExpanded}
        onChange={() => setTelemetryExpanded(!telemetryExpanded)}
        sx={{
          borderRadius: '8px !important',
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: 'none',
          '&:before': { display: 'none' },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            px: 3,
            py: 1,
            '& .MuiAccordionSummary-content': {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              mr: 2,
            },
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            Connected customers (active + blocked)
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }} onClick={(e) => e.stopPropagation()}>
            <Typography
              component="span"
              variant="body2"
              onClick={() => setActiveModule('customers')}
              sx={{ fontWeight: 600, color: 'primary.main', cursor: 'pointer', display: { xs: 'none', sm: 'inline-flex' }, '&:hover': { textDecoration: 'underline' } }}
            >
              Go to detailed customer chart
            </Typography>

            <Chip
              icon={<CalendarIcon fontSize="small" />}
              label="2026-07-10 - 2026-08-10"
              size="small"
              variant="outlined"
              sx={{ fontWeight: 600, px: 0.5, height: 32, borderRadius: 1 }}
            />
          </Box>
        </AccordionSummary>

        <AccordionDetails sx={{ pt: 1, pb: 3, px: 3 }}>
          <Box sx={{ width: '100%', height: 320, mt: 1 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={customerTelemetryData}>
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} domain={[0, 10]} />
                <RechartsTooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="active"
                  name="Active Customers"
                  stroke="#0066ff"
                  fill="#0066ff"
                  fillOpacity={0.12}
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="blocked"
                  name="Blocked Customers"
                  stroke="#ff1744"
                  fill="#ff1744"
                  fillOpacity={0.12}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Main Dashboard Two-Column Grid (Left & Right Independent Column Stacks) */}
      <Grid container spacing={3} sx={{ alignItems: 'flex-start' }}>
        {/* Left Column Stack: System status -> Networking -> Leads */}
        <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Card 1: System status */}
          <Accordion
            expanded={systemExpanded}
            onChange={() => setSystemExpanded(!systemExpanded)}
            sx={{
              borderRadius: '8px !important',
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: 'none',
              '&:before': { display: 'none' },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 3, py: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <SystemStatusIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  System status
                </Typography>
              </Box>
            </AccordionSummary>

            <AccordionDetails sx={{ p: 0 }}>
              <Table size="small">
                <TableBody>
                  <TableRow sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}>
                    <TableCell sx={{ fontWeight: 600, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      CPU cores
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      4
                    </TableCell>
                  </TableRow>

                  <TableRow sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}>
                    <TableCell sx={{ fontWeight: 600, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      Load average (1,5,15 min)
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      0, 0.05, 0.03
                    </TableCell>
                  </TableRow>

                  <TableRow sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}>
                    <TableCell sx={{ fontWeight: 600, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      CPU usage
                    </TableCell>
                    <TableCell align="right" sx={{ py: 1.2, borderBottom: '1px solid', borderColor: 'divider', width: '55%' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ flexGrow: 1, bgcolor: 'action.hover', borderRadius: 1, height: 16 }}>
                          <Box sx={{ width: '0.25%', bgcolor: 'warning.main', height: '100%', borderRadius: 1 }} />
                        </Box>
                        <Typography variant="body2" sx={{ fontWeight: 700, minWidth: 50 }}>
                          0.25 %
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>

                  <TableRow sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}>
                    <TableCell sx={{ fontWeight: 600, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      Memory: 7.76 GB (Free 38.63 %)
                    </TableCell>
                    <TableCell align="right" sx={{ py: 1.2, borderBottom: '1px solid', borderColor: 'divider', width: '55%' }}>
                      <Box sx={{ display: 'flex', height: 20, borderRadius: 1, overflow: 'hidden', fontSize: '0.7rem', fontWeight: 800 }}>
                        <Box sx={{ width: '61.37%', bgcolor: 'warning.main', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          Used
                        </Box>
                        <Box sx={{ width: '38.63%', bgcolor: 'success.main', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          Free
                        </Box>
                      </Box>
                    </TableCell>
                  </TableRow>

                  <TableRow sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}>
                    <TableCell sx={{ fontWeight: 600, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      I/O wait
                    </TableCell>
                    <TableCell align="right" sx={{ py: 1.2, borderBottom: '1px solid', borderColor: 'divider', width: '55%' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ flexGrow: 1, bgcolor: 'action.hover', borderRadius: 1, height: 16 }} />
                        <Typography variant="body2" sx={{ fontWeight: 700, minWidth: 50 }}>
                          0.00 %
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>

                  <TableRow sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}>
                    <TableCell sx={{ fontWeight: 600, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      Swap: 3.73 GB (Free 78.53 %)
                    </TableCell>
                    <TableCell align="right" sx={{ py: 1.2, borderBottom: '1px solid', borderColor: 'divider', width: '55%' }}>
                      <Box sx={{ display: 'flex', height: 20, borderRadius: 1, overflow: 'hidden', fontSize: '0.7rem', fontWeight: 800 }}>
                        <Box sx={{ width: '21.47%', bgcolor: 'warning.main', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          Used
                        </Box>
                        <Box sx={{ width: '78.53%', bgcolor: 'success.main', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          Free
                        </Box>
                      </Box>
                    </TableCell>
                  </TableRow>

                  <TableRow sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}>
                    <TableCell sx={{ fontWeight: 600, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      Disk: 19.52 GB (Free 17.97 %)
                    </TableCell>
                    <TableCell align="right" sx={{ py: 1.2, borderBottom: '1px solid', borderColor: 'divider', width: '55%' }}>
                      <Box sx={{ display: 'flex', height: 20, borderRadius: 1, overflow: 'hidden', fontSize: '0.7rem', fontWeight: 800 }}>
                        <Box sx={{ width: '82.03%', bgcolor: 'warning.main', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          Used
                        </Box>
                        <Box sx={{ width: '17.97%', bgcolor: 'success.main', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          Free
                        </Box>
                      </Box>
                    </TableCell>
                  </TableRow>

                  <TableRow sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}>
                    <TableCell sx={{ fontWeight: 600, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      Last DB backup
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      about 8 hours ago (161.26 KB)
                    </TableCell>
                  </TableRow>

                  <TableRow sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}>
                    <TableCell sx={{ fontWeight: 600, py: 1.2 }}>
                      Last remote backup
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, color: 'error.main', py: 1.2 }}>
                      Never
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </AccordionDetails>
          </Accordion>

          {/* Card 2: Networking */}
          <Accordion
            expanded={networkingExpanded}
            onChange={() => setNetworkingExpanded(!networkingExpanded)}
            sx={{
              borderRadius: '8px !important',
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: 'none',
              '&:before': { display: 'none' },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 3, py: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <NetworkingIcon sx={{ color: 'success.main', fontSize: 20 }} />
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  Networking
                </Typography>
              </Box>
            </AccordionSummary>

            <AccordionDetails sx={{ p: 0 }}>
              <Table size="small">
                <TableBody>
                  <TableRow sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}>
                    <TableCell sx={{ fontWeight: 600, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      Routers
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      2
                    </TableCell>
                  </TableRow>

                  <TableRow sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}>
                    <TableCell sx={{ fontWeight: 600, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      Monitoring devices
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      3
                    </TableCell>
                  </TableRow>

                  <TableRow sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}>
                    <TableCell sx={{ fontWeight: 600, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      Devices down (SNMP)
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, color: 'error.main', py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      2
                    </TableCell>
                  </TableRow>

                  <TableRow sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}>
                    <TableCell sx={{ fontWeight: 600, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      Devices down (Ping)
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, color: 'error.main', py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      1
                    </TableCell>
                  </TableRow>

                  <TableRow sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}>
                    <TableCell sx={{ fontWeight: 600, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      IPv4 networks
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      2
                    </TableCell>
                  </TableRow>

                  <TableRow sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}>
                    <TableCell sx={{ fontWeight: 600, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      Total private addresses
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      508
                    </TableCell>
                  </TableRow>

                  <TableRow sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}>
                    <TableCell sx={{ fontWeight: 600, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      Private addresses used
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      3
                    </TableCell>
                  </TableRow>

                  <TableRow sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}>
                    <TableCell sx={{ fontWeight: 600, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      Total public addresses
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      0
                    </TableCell>
                  </TableRow>

                  <TableRow sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}>
                    <TableCell sx={{ fontWeight: 600, py: 1.2 }}>
                      Public addresses used
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, py: 1.2 }}>
                      0
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </AccordionDetails>
          </Accordion>

          {/* Card 3: Leads */}
          <Accordion
            expanded={leadsExpanded}
            onChange={() => setLeadsExpanded(!leadsExpanded)}
            sx={{
              borderRadius: '8px !important',
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: 'none',
              '&:before': { display: 'none' },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 3, py: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <LeadsIcon sx={{ color: 'secondary.main', fontSize: 20 }} />
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  Leads
                </Typography>
              </Box>
            </AccordionSummary>

            <AccordionDetails sx={{ p: 0 }}>
              <Table size="small">
                <TableBody>
                  <TableRow sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}>
                    <TableCell sx={{ fontWeight: 600, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      Tasks for today
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      0
                    </TableCell>
                  </TableRow>

                  <TableRow sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}>
                    <TableCell sx={{ fontWeight: 600, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      New leads
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      0
                    </TableCell>
                  </TableRow>

                  <TableRow sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}>
                    <TableCell sx={{ fontWeight: 600, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      Active leads
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      2
                    </TableCell>
                  </TableRow>

                  <TableRow sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}>
                    <TableCell sx={{ fontWeight: 600, py: 1.2 }}>
                      Deals
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, py: 1.2 }}>
                      0
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </AccordionDetails>
          </Accordion>
        </Grid>

        {/* Right Column Stack: Customers -> Finance -> Tickets */}
        <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Card 1: Customers */}
          <Accordion
            expanded={customersExpanded}
            onChange={() => setCustomersExpanded(!customersExpanded)}
            sx={{
              borderRadius: '8px !important',
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: 'none',
              '&:before': { display: 'none' },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 3, py: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <CustomersIcon sx={{ color: 'secondary.main', fontSize: 20 }} />
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  Customers
                </Typography>
              </Box>
            </AccordionSummary>

            <AccordionDetails sx={{ p: 0 }}>
              <Table size="small">
                <TableBody>
                  <TableRow sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}>
                    <TableCell sx={{ fontWeight: 600, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      Total
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      25
                    </TableCell>
                  </TableRow>

                  <TableRow sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}>
                    <TableCell sx={{ fontWeight: 600, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      New
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      10
                    </TableCell>
                  </TableRow>

                  <TableRow sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}>
                    <TableCell sx={{ fontWeight: 600, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      Active
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      10
                    </TableCell>
                  </TableRow>

                  <TableRow sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}>
                    <TableCell sx={{ fontWeight: 600, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      Online
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      4
                    </TableCell>
                  </TableRow>

                  <TableRow sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}>
                    <TableCell sx={{ fontWeight: 600, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      Online last 24 hours
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      6
                    </TableCell>
                  </TableRow>

                  <TableRow sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}>
                    <TableCell sx={{ fontWeight: 600, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      Blocked
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      2
                    </TableCell>
                  </TableRow>

                  <TableRow sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}>
                    <TableCell sx={{ fontWeight: 600, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      Inactive
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      3
                    </TableCell>
                  </TableRow>

                  <TableRow sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}>
                    <TableCell sx={{ fontWeight: 600, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      Added last month
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      0
                    </TableCell>
                  </TableRow>

                  <TableRow sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}>
                    <TableCell sx={{ fontWeight: 600, py: 1.2 }}>
                      Added last year
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, py: 1.2 }}>
                      0
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </AccordionDetails>
          </Accordion>

          {/* Card 2: Finance */}
          <Accordion
            expanded={financeExpanded}
            onChange={() => setFinanceExpanded(!financeExpanded)}
            sx={{
              borderRadius: '8px !important',
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: 'none',
              '&:before': { display: 'none' },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 3, py: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <FinanceIcon sx={{ color: 'secondary.main', fontSize: 20 }} />
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  Finance
                </Typography>
              </Box>
            </AccordionSummary>

            <AccordionDetails sx={{ p: 0 }}>
              <Table size="small">
                <TableBody>
                  {/* Current Month Subheader */}
                  <TableRow sx={{ bgcolor: 'action.hover' }}>
                    <TableCell colSpan={2} sx={{ fontWeight: 800, color: 'success.main', py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
                      Current month
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      Payments
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      7 (29900.00 $)
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      Paid invoices
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      6 (29700.00 $)
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      Unpaid invoices
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      4 (4200.00 $)
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      Credit notes
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      0 (0.00 $)
                    </TableCell>
                  </TableRow>

                  {/* Last Month Subheader */}
                  <TableRow sx={{ bgcolor: 'action.hover' }}>
                    <TableCell colSpan={2} sx={{ fontWeight: 800, color: 'warning.main', py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
                      Last month
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      Payments
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      0 (0.00 $)
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      Paid invoices
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      0 (0.00 $)
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      Unpaid invoices
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      0 (0.00 $)
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, py: 1.2 }}>
                      Credit notes
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, py: 1.2 }}>
                      0 (0.00 $)
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </AccordionDetails>
          </Accordion>

          {/* Card 3: Tickets */}
          <Accordion
            expanded={ticketsExpanded}
            onChange={() => setTicketsExpanded(!ticketsExpanded)}
            sx={{
              borderRadius: '8px !important',
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: 'none',
              '&:before': { display: 'none' },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 3, py: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <TicketIcon sx={{ color: 'secondary.main', fontSize: 20 }} />
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  Tickets
                </Typography>
              </Box>
            </AccordionSummary>

            <AccordionDetails sx={{ p: 0 }}>
              <Table size="small">
                <TableBody>
                  <TableRow sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}>
                    <TableCell sx={{ fontWeight: 600, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      New
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      0
                    </TableCell>
                  </TableRow>

                  <TableRow sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}>
                    <TableCell sx={{ fontWeight: 600, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      Work in progress
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      3
                    </TableCell>
                  </TableRow>

                  <TableRow sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}>
                    <TableCell sx={{ fontWeight: 600, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      Resolved
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, py: 1.2, borderBottom: '1px solid', borderColor: 'divider' }}>
                      3
                    </TableCell>
                  </TableRow>

                  <TableRow sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}>
                    <TableCell sx={{ fontWeight: 600, py: 1.2 }}>
                      Waiting on agent
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 800, py: 1.2 }}>
                      0
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>

    </Box>
  );
};
