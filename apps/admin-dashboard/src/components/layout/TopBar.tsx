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
  NotificationsOutlined as BellIcon,
  KeyboardArrowDown as ChevronDownIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
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
        backdropFilter: 'blur(8px)',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(11, 19, 43, 0.85)' : 'rgba(244, 247, 252, 0.85)'),
        borderBottom: '1px solid',
        borderColor: 'divider',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ minHeight: 72, justifyContent: 'space-between', px: { xs: 2, sm: 3 } }}>
        {/* Left Side: Brand Logo + Minimalist Toggle Button Aligned Rata Kiri with Body Content */}
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
                width: 40,
                height: 40,
                minWidth: 40,
                borderRadius: 1.5,
                background: 'linear-gradient(135deg, #0066ff 0%, #00c6ff 100%)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: '1rem',
                boxShadow: '0 4px 14px rgba(0, 102, 255, 0.4)',
              }}
            >
              E
            </Box>
            {!isSidebarCollapsed && (
              <Box sx={{ overflow: 'hidden' }}>
                <Typography variant="h6" sx={{ fontSize: '1.125rem', fontWeight: 800, lineHeight: 1.2 }}>
                  EIMAS <Typography component="span" variant="caption" sx={{ color: 'primary.main', fontWeight: 800 }}>ELECTRIC</Typography>
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  ISP Enterprise Suite
                </Typography>
              </Box>
            )}
          </Box>

          {/* Minimalist Toggle Sidebar Icon Button inside Header, aligned rata kiri with Body Content */}
          <Tooltip title="Minimize / Expand Sidebar">
            <IconButton
              aria-label="Toggle Sidebar"
              onClick={toggleSidebar}
              sx={{ color: 'text.primary', p: 1 }}
            >
              <MenuOpenIcon
                sx={{
                  fontSize: 22,
                  transform: isSidebarCollapsed ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s ease-in-out',
                }}
              />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Right Side: Header Content Matching Exact Screenshot */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
          {/* Deployment guide Button */}
          <Button
            variant="contained"
            disableElevation
            sx={{
              bgcolor: '#2f80ed',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '0.875rem',
              px: 2,
              py: 0.8,
              borderRadius: 1,
              textTransform: 'none',
              '&:hover': {
                bgcolor: '#1d6cd3',
              },
            }}
          >
            Deployment guide
          </Button>

          {/* Plus (+) Quick Add Icon Button */}
          <Tooltip title="Quick Add">
            <IconButton aria-label="Quick Add" onClick={() => setQuickAddOpen(true)} sx={{ color: 'text.primary', p: 1 }}>
              <AddIcon sx={{ fontSize: 24 }} />
            </IconButton>
          </Tooltip>

          {/* Search Icon Button */}
          <Tooltip title="Search">
            <IconButton aria-label="Search" sx={{ color: 'text.primary', p: 1 }}>
              <SearchIcon sx={{ fontSize: 22 }} />
            </IconButton>
          </Tooltip>

          {/* Help Circle (?) Icon Button */}
          <Tooltip title="Help & Support">
            <IconButton aria-label="Help & Support" sx={{ color: 'text.primary', p: 1 }}>
              <HelpIcon sx={{ fontSize: 22 }} />
            </IconButton>
          </Tooltip>

          {/* Book (i) Icon Button */}
          <Tooltip title="Documentation">
            <IconButton aria-label="Documentation" sx={{ color: 'text.primary', p: 1 }}>
              <BookIcon sx={{ fontSize: 22 }} />
            </IconButton>
          </Tooltip>

          {/* Bell Icon Button with Badge 6 */}
          <Tooltip title="Notifications">
            <IconButton aria-label="Notifications" sx={{ color: 'text.primary', p: 1 }}>
              <Badge
                badgeContent={6}
                sx={{
                  '& .MuiBadge-badge': {
                    bgcolor: '#2f80ed',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.7rem',
                    minWidth: 18,
                    height: 18,
                  },
                }}
              >
                <BellIcon sx={{ fontSize: 24 }} />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Dark Mode Toggle */}
          <Tooltip title="Toggle Theme">
            <IconButton aria-label="Toggle Theme" onClick={toggleDarkMode} sx={{ color: 'text.primary', p: 1 }}>
              {isDarkMode ? <LightModeIcon sx={{ fontSize: 20, color: 'warning.main' }} /> : <DarkModeIcon sx={{ fontSize: 20 }} />}
            </IconButton>
          </Tooltip>

          {/* Main Admin User Avatar with Dropdown Arrow */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.2,
              ml: 1,
              cursor: 'pointer',
              p: 0.5,
              borderRadius: 1,
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <Avatar
              sx={{
                width: 34,
                height: 34,
                bgcolor: '#c2185b',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.85rem',
              }}
            >
              MA
            </Avatar>
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
              Main Admin
            </Typography>
            <ChevronDownIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
