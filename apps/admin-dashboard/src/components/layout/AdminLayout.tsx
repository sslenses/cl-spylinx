import React from 'react';
import { Box } from '@mui/material';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { Footer } from './Footer';

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', maxHeight: '100vh', overflow: 'hidden', bgcolor: 'background.default', color: 'text.primary' }}>
      {/* Full Screen Width TopBar Header */}
      <TopBar />

      <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden', minHeight: 0 }}>
        {/* Left Navigation Sidebar */}
        <Sidebar />

        {/* Main Workspace Content Area */}
        <Box component="main" sx={{ p: 2.5, flexGrow: 1, overflowY: 'auto', minWidth: 0, height: '100%', boxSizing: 'border-box' }}>
          {children}
        </Box>
      </Box>

      {/* Full Screen Width Compact Footer */}
      <Footer />
    </Box>
  );
};
