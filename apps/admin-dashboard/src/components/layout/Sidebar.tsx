import React, { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Collapse,
  Tooltip,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Handshake as LeadsIcon,
  ConfirmationNumber as TicketIcon,
  AttachMoney as FinanceIcon,
  Email as MessageIcon,
  Language as NetworkingIcon,
  CalendarMonth as CalendarIcon,
  Layers as InventoryIcon,
  Mic as VoiceIcon,
  Block as TariffIcon,
  AdminPanelSettings as AdministrationIcon,
  Tune as ConfigIcon,
  KeyboardArrowDown as ChevronDownIcon,
  KeyboardArrowUp as ChevronUpIcon,
} from '@mui/icons-material';
import { useAppStore } from '../../lib/store';

export const Sidebar: React.FC = () => {
  const { activeModule, setActiveModule, setQuickAddOpen, isSidebarCollapsed } = useAppStore();
  const [customersOpen, setCustomersOpen] = useState<boolean>(true);
  const [vouchersOpen, setVouchersOpen] = useState<boolean>(true);
  const [leadsOpen, setLeadsOpen] = useState<boolean>(true);
  const [financeOpen, setFinanceOpen] = useState<boolean>(true);
  const [paymentStatementsOpen, setPaymentStatementsOpen] = useState<boolean>(true);
  const [refillCardsOpen, setRefillCardsOpen] = useState<boolean>(false);
  const [inventoryOpen, setInventoryOpen] = useState<boolean>(true);
  const [supplyOpen, setSupplyOpen] = useState<boolean>(true);
  const [networkingOpen, setNetworkingOpen] = useState<boolean>(true);
  const [routersOpen, setRoutersOpen] = useState<boolean>(false);
  const [tr069Open, setTr069Open] = useState<boolean>(true);
  const [hardwareOpen, setHardwareOpen] = useState<boolean>(false);
  const [ipv4Open, setIpv4Open] = useState<boolean>(false);
  const [ipv6Open, setIpv6Open] = useState<boolean>(false);

  // Automatically keep parent menus open when an active sub-module is selected
  useEffect(() => {
    if (activeModule.startsWith('inventory')) {
      setInventoryOpen(true);
      if (['inventory-suppliers', 'inventory-vendors', 'inventory-supplier-invoices'].includes(activeModule)) {
        setSupplyOpen(true);
      }
    } else if (activeModule.startsWith('networking')) {
      setNetworkingOpen(true);
    } else if (activeModule === 'customers') {
      setCustomersOpen(true);
    } else if (activeModule === 'finance') {
      setFinanceOpen(true);
    }
  }, [activeModule]);

  const isNavActive = (id: string) => {
    if (activeModule === id) return true;
    if (id === 'networking' && activeModule.startsWith('networking')) return true;
    if (id === 'inventory' && activeModule.startsWith('inventory')) return true;
    if (id === 'config' && (activeModule === 'config' || activeModule === 'site-customization' || activeModule === 'company-information')) return true;
    if (id === 'customers' && activeModule.startsWith('customers')) return true;
    if (id === 'finance' && activeModule.startsWith('finance')) return true;
    return false;
  };

  const drawerWidth = isSidebarCollapsed ? 76 : 280;

  const renderNavItem = (
    id: string,
    label: string,
    IconComponent: React.ElementType,
    hasChevron: boolean = true,
    isOpen?: boolean,
    onToggle?: () => void
  ) => {
    const isActive = isNavActive(id);

    const navContent = (
      <ListItem disablePadding key={id} sx={{ mb: 0.3 }}>
        <ListItemButton
          selected={isActive}
          onClick={() => {
            if (onToggle && !isSidebarCollapsed) {
              onToggle();
            } else {
              setActiveModule(id);
            }
          }}
          sx={{
            borderRadius: 1.5,
            px: isSidebarCollapsed ? 0 : 1.8,
            py: 0.75,
            justifyContent: isSidebarCollapsed ? 'center' : 'flex-start',
            color: isActive ? 'primary.main' : 'text.secondary',
            bgcolor: isActive ? (theme) => theme.palette.mode === 'dark' ? 'rgba(37, 99, 235, 0.15)' : 'rgba(37, 99, 235, 0.08)' : 'transparent',
            position: 'relative',
            '&:hover': {
              bgcolor: isActive ? (theme) => theme.palette.mode === 'dark' ? 'rgba(37, 99, 235, 0.2)' : 'rgba(37, 99, 235, 0.12)' : 'action.hover',
              color: isActive ? 'primary.main' : 'text.primary',
            },
            '&.Mui-selected': {
              bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(37, 99, 235, 0.15)' : 'rgba(37, 99, 235, 0.08)',
              '&:hover': {
                bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(37, 99, 235, 0.2)' : 'rgba(37, 99, 235, 0.12)',
              },
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: isSidebarCollapsed ? 0 : 38,
              justifyContent: 'center',
              color: isActive ? 'primary.main' : 'text.secondary',
            }}
          >
            <IconComponent fontSize="small" />
          </ListItemIcon>

          {!isSidebarCollapsed && (
            <ListItemText
              primary={
                <Typography sx={{ fontSize: '0.875rem', fontWeight: isActive ? 600 : 400, letterSpacing: 0.2 }}>
                  {label}
                </Typography>
              }
            />
          )}

          {!isSidebarCollapsed && hasChevron && (
            isOpen ? (
              <ChevronUpIcon sx={{ fontSize: 18, color: isActive ? 'primary.main' : 'text.secondary', opacity: 0.8 }} />
            ) : (
              <ChevronDownIcon sx={{ fontSize: 18, color: isActive ? 'primary.main' : 'text.secondary', opacity: 0.8 }} />
            )
          )}

          {isActive && (
            <Box
              sx={{
                position: 'absolute',
                right: 0,
                top: 8,
                bottom: 8,
                width: 3.5,
                bgcolor: 'primary.main',
                borderTopLeftRadius: 4,
                borderBottomLeftRadius: 4,
              }}
            />
          )}
        </ListItemButton>
      </ListItem>
    );

    if (isSidebarCollapsed) {
      return (
        <Tooltip key={id} title={label} placement="right" arrow>
          {navContent}
        </Tooltip>
      );
    }

    return navContent;
  };

  const renderSubItem = (
    label: string,
    onClickHandler: () => void,
    hasChevron: boolean = false,
    isSubOpen?: boolean,
    isActive: boolean = false
  ) => {
    if (isSidebarCollapsed) return null;

    return (
      <ListItem disablePadding sx={{ mb: 0.2 }}>
        <ListItemButton
          onClick={onClickHandler}
          sx={{
            borderRadius: 1.5,
            pl: 6.5,
            pr: 2,
            py: 0.5,
            color: isActive ? 'primary.main' : 'text.secondary',
            bgcolor: 'transparent',
            '&:hover': {
              bgcolor: 'action.hover',
              color: isActive ? 'primary.main' : 'text.primary',
            },
          }}
        >
          <ListItemText
            primary={
              <Typography
                sx={{
                  fontSize: '0.8125rem',
                  fontWeight: isActive ? 700 : isSubOpen ? 600 : 400,
                  color: isActive ? 'primary.main' : 'text.secondary',
                  letterSpacing: isActive ? '-0.005em' : 'normal',
                }}
              >
                {label}
              </Typography>
            }
          />
          {hasChevron && (
            isSubOpen ? (
              <ChevronUpIcon sx={{ fontSize: 16, color: isActive ? 'primary.main' : 'text.secondary', opacity: 0.8 }} />
            ) : (
              <ChevronDownIcon sx={{ fontSize: 16, color: isActive ? 'primary.main' : 'text.secondary', opacity: 0.8 }} />
            )
          )}
        </ListItemButton>
      </ListItem>
    );
  };

  const renderNestedSubItem = (label: string, onClickHandler: () => void, isActive: boolean = false) => {
    if (isSidebarCollapsed) return null;

    return (
      <ListItem disablePadding sx={{ mb: 0.2 }}>
        <ListItemButton
          onClick={onClickHandler}
          sx={{
            borderRadius: 1.5,
            pl: 8.5,
            pr: 2,
            py: 0.45,
            color: isActive ? 'primary.main' : 'text.secondary',
            bgcolor: 'transparent',
            '&:hover': {
              bgcolor: 'action.hover',
              color: isActive ? 'primary.main' : 'text.primary',
            },
          }}
        >
          <ListItemText
            primary={
              <Typography
                sx={{
                  fontSize: '0.78125rem',
                  fontWeight: isActive ? 700 : 400,
                  color: isActive ? 'primary.main' : 'text.secondary',
                  letterSpacing: isActive ? '-0.005em' : 'normal',
                }}
              >
                {label}
              </Typography>
            }
          />
        </ListItemButton>
      </ListItem>
    );
  };

  return (
    <Box component="nav" sx={{ width: drawerWidth, flexShrink: 0, transition: 'width 0.2s ease-in-out' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            top: 72,
            height: 'calc(100vh - 72px)',
            boxSizing: 'border-box',
            bgcolor: 'background.default',
            boxShadow: 'none',
            backgroundImage: 'none',
            border: 'none',
            px: isSidebarCollapsed ? 1 : 2.5,
            py: 2.5,
            display: 'flex',
            flexDirection: 'column',
            gap: 2.5,
            transition: 'width 0.2s ease-in-out, padding 0.2s ease-in-out',
            overflowX: 'hidden',
          },
        }}
      >
        {/* Navigation Group Sections with Custom Thin Right-Aligned Scrollbar */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            flexGrow: 1,
            overflowY: 'auto',
            pb: 6,
            mr: isSidebarCollapsed ? 0 : -1.5,
            pr: isSidebarCollapsed ? 0 : 1,
            '&::-webkit-scrollbar': {
              width: '4px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'transparent',
              margin: '20px 0', // Shortens the scrollbar track nicely
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.18)' : 'rgba(15, 23, 42, 0.2)',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.35)' : 'rgba(15, 23, 42, 0.4)',
              },
            },
          }}
        >
          {/* Dashboard Item */}
          <Box>
            <List disablePadding>
              {renderNavItem('dashboard', 'Dashboard', DashboardIcon, false)}
            </List>
          </Box>

          {/* CRM Group */}
          <Box>
            {!isSidebarCollapsed && (
              <Typography
                variant="caption"
                sx={{ px: 2, fontWeight: 800, color: '#8e24aa', letterSpacing: 1, textTransform: 'uppercase' }}
              >
                CRM
              </Typography>
            )}
            <List disablePadding sx={{ mt: isSidebarCollapsed ? 0 : 0.8 }}>
              {/* Customers with Submenu */}
              {renderNavItem(
                'customers',
                'Customers',
                PeopleIcon,
                true,
                customersOpen,
                () => setCustomersOpen(!customersOpen)
              )}

              {!isSidebarCollapsed && (
                <Collapse in={customersOpen} timeout="auto" unmountOnExit>
                  <List disablePadding>
                    {renderSubItem('Add', () => setQuickAddOpen(true))}
                    {renderSubItem('Search', () => setActiveModule('customers'))}
                    {renderSubItem('List', () => setActiveModule('customers'))}

                    {/* Vouchers Nested Submenu */}
                    {renderSubItem('Vouchers', () => setVouchersOpen(!vouchersOpen), true, vouchersOpen)}
                    <Collapse in={vouchersOpen} timeout="auto" unmountOnExit>
                      <List disablePadding>
                        {renderNestedSubItem('Generate', () => setActiveModule('customers'))}
                        {renderNestedSubItem('Prepaid series', () => setActiveModule('customers'))}
                        {renderNestedSubItem('Search', () => setActiveModule('customers'))}
                        {renderNestedSubItem('List', () => setActiveModule('customers'))}
                      </List>
                    </Collapse>

                    {renderSubItem('Maps', () => setActiveModule('customers'))}
                  </List>
                </Collapse>
              )}

              {/* Leads with Submenu */}
              {renderNavItem(
                'leads',
                'Leads',
                LeadsIcon,
                true,
                leadsOpen,
                () => setLeadsOpen(!leadsOpen)
              )}

              {!isSidebarCollapsed && (
                <Collapse in={leadsOpen} timeout="auto" unmountOnExit>
                  <List disablePadding>
                    {renderSubItem('Dashboard', () => setActiveModule('leads'))}
                    {renderSubItem('Add lead', () => setQuickAddOpen(true))}
                    {renderSubItem('List', () => setActiveModule('leads'))}
                    {renderSubItem('Quotes', () => setActiveModule('leads'))}
                    {renderSubItem('Maps', () => setActiveModule('leads'))}
                  </List>
                </Collapse>
              )}

              {renderNavItem('tickets', 'Tickets', TicketIcon)}
              {/* Finance with Submenu */}
              {renderNavItem(
                'finance',
                'Finance',
                FinanceIcon,
                true,
                financeOpen,
                () => setFinanceOpen(!financeOpen)
              )}

              {!isSidebarCollapsed && (
                <Collapse in={financeOpen} timeout="auto" unmountOnExit>
                  <List disablePadding>
                    {renderSubItem('Dashboard', () => setActiveModule('finance'))}
                    {renderSubItem('Transactions', () => setActiveModule('finance'))}
                    {renderSubItem('Invoices', () => setActiveModule('finance'))}
                    {renderSubItem('Credit notes', () => setActiveModule('finance'))}
                    {renderSubItem('Proforma invoices', () => setActiveModule('finance'))}
                    {renderSubItem('Payments', () => setActiveModule('finance'))}
                    {renderSubItem('History & Preview', () => setActiveModule('finance'))}

                    {/* Payment statements Nested Submenu */}
                    {renderSubItem(
                      'Payment statements',
                      () => setPaymentStatementsOpen(!paymentStatementsOpen),
                      true,
                      paymentStatementsOpen
                    )}
                    <Collapse in={paymentStatementsOpen} timeout="auto" unmountOnExit>
                      <List disablePadding>
                        {renderNestedSubItem('Processing', () => setActiveModule('finance'))}
                        {renderNestedSubItem('History', () => setActiveModule('finance'))}
                      </List>
                    </Collapse>

                    {/* Refill cards Nested Submenu */}
                    {renderSubItem(
                      'Refill cards',
                      () => setRefillCardsOpen(!refillCardsOpen),
                      true,
                      refillCardsOpen
                    )}
                    <Collapse in={refillCardsOpen} timeout="auto" unmountOnExit>
                      <List disablePadding>
                        {renderNestedSubItem('Generate', () => setActiveModule('finance'))}
                        {renderNestedSubItem('Series', () => setActiveModule('finance'))}
                      </List>
                    </Collapse>

                    {renderSubItem('Costs', () => setActiveModule('finance'))}
                  </List>
                </Collapse>
              )}
              {renderNavItem('messages', 'Messages', MessageIcon)}
            </List>
          </Box>

          {/* COMPANY Group */}
          <Box>
            {!isSidebarCollapsed && (
              <Typography
                variant="caption"
                sx={{ px: 2, fontWeight: 800, color: '#00bfa5', letterSpacing: 1, textTransform: 'uppercase' }}
              >
                COMPANY
              </Typography>
            )}
            <List disablePadding sx={{ mt: isSidebarCollapsed ? 0 : 0.8 }}>
              {/* Networking with Submenu */}
              {renderNavItem(
                'networking',
                'Networking',
                NetworkingIcon,
                true,
                networkingOpen,
                () => setNetworkingOpen(!networkingOpen)
              )}

              {!isSidebarCollapsed && (
                <Collapse in={networkingOpen} timeout="auto" unmountOnExit>
                  <List disablePadding>
                    {renderSubItem('Network sites', () => setActiveModule('networking'), false, false, activeModule === 'networking')}

                    {/* Routers Nested Submenu */}
                    {renderSubItem(
                      'Routers',
                      () => setRoutersOpen(!routersOpen),
                      true,
                      routersOpen
                    )}
                    <Collapse in={routersOpen} timeout="auto" unmountOnExit>
                      <List disablePadding>
                        {renderNestedSubItem('Add', () => setActiveModule('networking'))}
                        {renderNestedSubItem('List', () => setActiveModule('networking'))}
                      </List>
                    </Collapse>

                    {/* TR-069 (ACS) Nested Submenu */}
                    {renderSubItem(
                      'TR-069 (ACS)',
                      () => setTr069Open(!tr069Open),
                      true,
                      tr069Open
                    )}
                    <Collapse in={tr069Open} timeout="auto" unmountOnExit>
                      <List disablePadding>
                        {renderNestedSubItem('Dashboard', () => setActiveModule('networking'))}
                        {renderNestedSubItem('Devices', () => setActiveModule('networking'))}
                        {renderNestedSubItem('Files', () => setActiveModule('networking'))}
                        {renderNestedSubItem('Upgrade batches', () => setActiveModule('networking'))}
                      </List>
                    </Collapse>

                    {/* Hardware Nested Submenu */}
                    {renderSubItem(
                      'Hardware',
                      () => setHardwareOpen(!hardwareOpen),
                      true,
                      hardwareOpen
                    )}
                    <Collapse in={hardwareOpen} timeout="auto" unmountOnExit>
                      <List disablePadding>
                        {renderNestedSubItem('Add', () => setActiveModule('networking'))}
                        {renderNestedSubItem('List', () => setActiveModule('networking'))}
                        {renderNestedSubItem('Backups', () => setActiveModule('networking'))}
                      </List>
                    </Collapse>

                    {/* IPv4 networks Nested Submenu */}
                    {renderSubItem(
                      'IPv4 networks',
                      () => setIpv4Open(!ipv4Open),
                      true,
                      ipv4Open
                    )}
                    <Collapse in={ipv4Open} timeout="auto" unmountOnExit>
                      <List disablePadding>
                        {renderNestedSubItem('Add', () => setActiveModule('networking'))}
                        {renderNestedSubItem('List', () => setActiveModule('networking'))}
                      </List>
                    </Collapse>

                    {/* IPv6 networks Nested Submenu */}
                    {renderSubItem(
                      'IPv6 networks',
                      () => setIpv6Open(!ipv6Open),
                      true,
                      ipv6Open
                    )}
                    <Collapse in={ipv6Open} timeout="auto" unmountOnExit>
                      <List disablePadding>
                        {renderNestedSubItem('Add', () => setActiveModule('networking'))}
                        {renderNestedSubItem('List', () => setActiveModule('networking'))}
                      </List>
                    </Collapse>

                    {renderSubItem('Maps', () => setActiveModule('networking-maps'), false, false, activeModule === 'networking-maps')}
                  </List>
                </Collapse>
              )}

              {renderNavItem('scheduling', 'Scheduling', CalendarIcon)}
              {/* Inventory with Submenu */}
              {renderNavItem(
                'inventory',
                'Inventory',
                InventoryIcon,
                true,
                inventoryOpen,
                () => setInventoryOpen(!inventoryOpen)
              )}

              {!isSidebarCollapsed && (
                <Collapse in={inventoryOpen} timeout="auto" unmountOnExit>
                  <List disablePadding>
                    {renderSubItem('Dashboard', () => setActiveModule('inventory'), false, false, activeModule === 'inventory')}
                    {renderSubItem('Items', () => setActiveModule('inventory-items'), false, false, activeModule === 'inventory-items')}
                    {renderSubItem('Products', () => setActiveModule('inventory-products'), false, false, activeModule === 'inventory-products')}

                    {/* Supply Nested Submenu */}
                    {renderSubItem(
                      'Supply',
                      () => setSupplyOpen(!supplyOpen),
                      true,
                      supplyOpen,
                      ['inventory-suppliers', 'inventory-vendors', 'inventory-supplier-invoices'].includes(activeModule)
                    )}
                    <Collapse in={supplyOpen} timeout="auto" unmountOnExit>
                      <List disablePadding>
                        {renderNestedSubItem('Suppliers', () => setActiveModule('inventory-suppliers'), activeModule === 'inventory-suppliers')}
                        {renderNestedSubItem('Vendors', () => setActiveModule('inventory-vendors'), activeModule === 'inventory-vendors')}
                        {renderNestedSubItem('Supplier invoices', () => setActiveModule('inventory-supplier-invoices'), activeModule === 'inventory-supplier-invoices')}
                      </List>
                    </Collapse>
                  </List>
                </Collapse>
              )}
              {renderNavItem('voice', 'Voice', VoiceIcon)}
              {renderNavItem('tariff-plans', 'Tariff plans', TariffIcon)}
            </List>
          </Box>

          {/* SYSTEM Group */}
          <Box>
            {!isSidebarCollapsed && (
              <Typography
                variant="caption"
                sx={{ px: 2, fontWeight: 800, color: 'text.disabled', letterSpacing: 1, textTransform: 'uppercase' }}
              >
                SYSTEM
              </Typography>
            )}
            <List disablePadding sx={{ mt: isSidebarCollapsed ? 0 : 0.8 }}>
              {renderNavItem('administration', 'Administration', AdministrationIcon, false)}
              {renderNavItem('config', 'Config', ConfigIcon, false)}
            </List>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};
