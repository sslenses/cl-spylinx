import React from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Badge,
  Tooltip,
  Avatar,
  Typography,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  HelpOutlined as HelpIcon,
  MenuBookOutlined as BookIcon,
  NotificationsNoneOutlined as BellIcon,
  KeyboardArrowDown as ChevronDownIcon,
  DarkModeOutlined as DarkModeIcon,
  LightModeOutlined as LightModeIcon,
  MenuOpen as MenuOpenIcon,
} from '@mui/icons-material';
import { useAppStore } from '../../lib/store';

export const TopBar: React.FC = () => {
  const { isDarkMode, toggleDarkMode, setQuickAddOpen, isSidebarCollapsed, toggleSidebar } = useAppStore();

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={0}
      sx={{
        width: '100%',
        bgcolor: isDarkMode ? '#0d121f' : '#ffffff',
        borderBottom: '1px solid',
        borderColor: 'divider',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ height: 60, minHeight: '60px !important', justifyContent: 'space-between', px: { xs: 2, sm: 2.5 } }}>
        {/* Left Side: Brand Logo + Sidebar Toggle */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Brand Logo Box matching sidebar width */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              width: isSidebarCollapsed ? 76 : 280,
              minWidth: isSidebarCollapsed ? 76 : 280,
              transition: 'all 0.2s ease-in-out',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              pr: 2,
            }}
          >
            <Box
              sx={{
                width: 34,
                height: 34,
                minWidth: 34,
                borderRadius: 1.5,
                background: 'linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.9375rem',
                boxShadow: '0 2px 8px rgba(37, 99, 235, 0.25)',
              }}
            >
              E
            </Box>
            {!isSidebarCollapsed && (
              <Box sx={{ overflow: 'hidden' }}>
                <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.2, color: 'text.primary' }}>
                  EIMAS <Typography component="span" sx={{ color: 'primary.main', fontWeight: 700, fontSize: '0.75rem', letterSpacing: 0.5 }}>ELECTRIC</Typography>
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                  ISP Enterprise Suite
                </Typography>
              </Box>
            )}
          </Box>

          {/* Minimalist Toggle Sidebar Icon Button */}
          <Tooltip title="Toggle Sidebar">
            <IconButton
              aria-label="Toggle Sidebar"
              onClick={toggleSidebar}
              size="small"
              sx={{
                color: 'text.secondary',
                width: 34,
                height: 34,
                borderRadius: 1.5,
                '&:hover': { bgcolor: 'action.hover', color: 'text.primary' },
              }}
            >
              <MenuOpenIcon
                sx={{
                  fontSize: 20,
                  transform: isSidebarCollapsed ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s ease-in-out',
                }}
              />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Right Side: Action Button + Unified Icon Controls + User Profile */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
          {/* Deployment guide Button */}
          <Button
            variant="contained"
            disableElevation
            size="small"
            sx={{
              bgcolor: 'primary.main',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '0.8125rem',
              px: 2,
              height: 32,
              borderRadius: 1.5,
              textTransform: 'none',
              mr: 0.5,
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            }}
          >
            Deployment guide
          </Button>

          {/* Plus (+) Quick Add Icon Button */}
          <Tooltip title="Quick Add">
            <IconButton
              aria-label="Quick Add"
              onClick={() => setQuickAddOpen(true)}
              size="small"
              sx={{
                color: 'text.secondary',
                width: 34,
                height: 34,
                borderRadius: 1.5,
                '&:hover': { bgcolor: 'action.hover', color: 'text.primary' },
              }}
            >
              <AddIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>

          {/* Search Icon Button */}
          <Tooltip title="Search">
            <IconButton
              aria-label="Search"
              size="small"
              sx={{
                color: 'text.secondary',
                width: 34,
                height: 34,
                borderRadius: 1.5,
                '&:hover': { bgcolor: 'action.hover', color: 'text.primary' },
              }}
            >
              <SearchIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>

          {/* Help Circle (?) Icon Button */}
          <Tooltip title="Help & Support">
            <IconButton
              aria-label="Help & Support"
              size="small"
              sx={{
                color: 'text.secondary',
                width: 34,
                height: 34,
                borderRadius: 1.5,
                '&:hover': { bgcolor: 'action.hover', color: 'text.primary' },
              }}
            >
              <HelpIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>

          {/* Book (i) Icon Button */}
          <Tooltip title="Documentation">
            <IconButton
              aria-label="Documentation"
              size="small"
              sx={{
                color: 'text.secondary',
                width: 34,
                height: 34,
                borderRadius: 1.5,
                '&:hover': { bgcolor: 'action.hover', color: 'text.primary' },
              }}
            >
              <BookIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Tooltip>

          {/* Bell Icon Button with Badge */}
          <Tooltip title="Notifications">
            <IconButton
              aria-label="Notifications"
              size="small"
              sx={{
                color: 'text.secondary',
                width: 34,
                height: 34,
                borderRadius: 1.5,
                '&:hover': { bgcolor: 'action.hover', color: 'text.primary' },
              }}
            >
              <Badge
                badgeContent={6}
                sx={{
                  '& .MuiBadge-badge': {
                    bgcolor: 'primary.main',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.65rem',
                    minWidth: 16,
                    height: 16,
                    px: 0.5,
                  },
                }}
              >
                <BellIcon sx={{ fontSize: 20 }} />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Dark Mode Toggle */}
          <Tooltip title="Toggle Theme">
            <IconButton
              aria-label="Toggle Theme"
              onClick={toggleDarkMode}
              size="small"
              sx={{
                color: 'text.secondary',
                width: 34,
                height: 34,
                borderRadius: 1.5,
                '&:hover': { bgcolor: 'action.hover', color: 'text.primary' },
              }}
            >
              {isDarkMode ? <LightModeIcon sx={{ fontSize: 19, color: 'warning.main' }} /> : <DarkModeIcon sx={{ fontSize: 19 }} />}
            </IconButton>
          </Tooltip>

          {/* Main Admin User Avatar with Dropdown Arrow */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              ml: 0.5,
              cursor: 'pointer',
              px: 1,
              py: 0.5,
              borderRadius: 1.5,
              transition: 'background-color 150ms ease',
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <Avatar
              sx={{
                width: 30,
                height: 30,
                bgcolor: '#c2185b',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '0.78125rem',
              }}
            >
              MA
            </Avatar>
            <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.8125rem', color: 'text.primary' }}>
              Main Admin
            </Typography>
            <ChevronDownIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
