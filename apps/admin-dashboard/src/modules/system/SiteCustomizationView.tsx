import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Tabs,
  Tab,
  Link,
} from '@mui/material';
import {
  Tune as ConfigIcon,
} from '@mui/icons-material';
import { useAppStore } from '../../lib/store';

const initialCodes: Record<string, Record<string, string>> = {
  admin: {
    header: '<!-- Custom Administration Header HTML -->\n<div class="admin-banner">\n  <span>Internal ISP Portal - Authorized Personnel Only</span>\n</div>',
    footer: '<!-- Custom Administration Footer HTML -->\n<div class="admin-footer">\n  <span>© 2026 ISP Network Operations Center</span>\n</div>',
    css: '/* Custom Administration CSS */\n:root {\n  --primary-accent: #1976d2;\n}\n\n.sidebar-brand {\n  font-weight: 800;\n  letter-spacing: -0.5px;\n}',
    js: '// Custom Administration JavaScript\nconsole.log("Admin portal custom scripts loaded.");',
  },
  customer: {
    header: '<!-- Custom Customer Portal Header HTML -->\n<header class="custom-portal-header">\n  <div class="welcome-text">Welcome to Selfcare Portal</div>\n</header>',
    footer: '<!-- Custom Customer Portal Footer HTML -->\n<footer class="custom-portal-footer">\n  <p>24/7 Support Hotline: 1500-888 | WhatsApp: +62 811-2345-6789</p>\n</footer>',
    css: '/* Custom Customer Portal CSS */\nbody {\n  font-family: "Inter", sans-serif;\n}\n\n.btn-pay-now {\n  background: linear-gradient(135deg, #00bfa5 0%, #00897b 100%);\n  border-radius: 8px;\n  box-shadow: 0 4px 12px rgba(0, 191, 165, 0.25);\n}',
    js: '// Custom Customer Portal JavaScript\ndocument.addEventListener("DOMContentLoaded", () => {\n  console.log("Customer portal custom scripts initialized.");\n});',
  },
};

export const SiteCustomizationView: React.FC = () => {
  const { setActiveModule } = useAppStore();
  const [portalTab, setPortalTab] = useState<'admin' | 'customer'>('customer');
  const [elementTab, setElementTab] = useState<'header' | 'footer' | 'css' | 'js'>('js');
  const [codes, setCodes] = useState(initialCodes);

  const currentCode = codes[portalTab][elementTab] || '';
  const lines = currentCode.split('\n');

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setCodes((prev) => ({
      ...prev,
      [portalTab]: {
        ...prev[portalTab],
        [elementTab]: val,
      },
    }));
  };

  const handleRevert = () => {
    setCodes((prev) => ({
      ...prev,
      [portalTab]: {
        ...prev[portalTab],
        [elementTab]: initialCodes[portalTab][elementTab],
      },
    }));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 1.5, overflow: 'hidden', boxSizing: 'border-box' }}>
      {/* Breadcrumb & Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexShrink: 0 }}>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 1,
            bgcolor: '#455a64',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ConfigIcon fontSize="small" />
        </Box>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Link
              component="button"
              underline="hover"
              onClick={() => setActiveModule('config')}
              sx={{ color: '#1e88e5', fontWeight: 600, fontSize: '0.75rem', cursor: 'pointer' }}
            >
              Config
            </Link>
            <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.75rem' }}>
              /
            </Typography>
            <Link
              component="button"
              underline="hover"
              onClick={() => setActiveModule('config')}
              sx={{ color: '#1e88e5', fontWeight: 600, fontSize: '0.75rem', cursor: 'pointer' }}
            >
              Main
            </Link>
            <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.75rem' }}>
              /
            </Typography>
          </Box>
          <Typography variant="h2" sx={{ fontWeight: 800, fontSize: '1.5rem', lineHeight: 1.2 }}>
            Site customization
          </Typography>
        </Box>
      </Box>

      {/* Main Container Paper */}
      <Paper sx={{ p: 2.5, borderRadius: 2, display: 'flex', flexDirection: 'column', gap: 1.5, flexGrow: 1, minHeight: 0, overflow: 'hidden' }}>
        {/* Level 1 Tabs: Portal Selection */}
        <Box sx={{ display: 'flex', gap: 1, flexShrink: 0 }}>
          <Button
            size="small"
            onClick={() => setPortalTab('admin')}
            sx={{
              textTransform: 'none',
              fontWeight: portalTab === 'admin' ? 700 : 500,
              fontSize: '0.8125rem',
              color: portalTab === 'admin' ? 'text.primary' : 'text.secondary',
              bgcolor: portalTab === 'admin' ? 'action.selected' : 'transparent',
              borderRadius: 1,
              px: 1.5,
              py: 0.4,
              '&:hover': {
                bgcolor: portalTab === 'admin' ? 'action.selected' : 'action.hover',
              },
            }}
          >
            Administration portal
          </Button>
          <Button
            size="small"
            onClick={() => setPortalTab('customer')}
            sx={{
              textTransform: 'none',
              fontWeight: portalTab === 'customer' ? 700 : 500,
              fontSize: '0.8125rem',
              color: portalTab === 'customer' ? 'text.primary' : 'text.secondary',
              bgcolor: portalTab === 'customer' ? 'action.selected' : 'transparent',
              borderRadius: 1,
              px: 1.5,
              py: 0.4,
              '&:hover': {
                bgcolor: portalTab === 'customer' ? 'action.selected' : 'action.hover',
              },
            }}
          >
            Customer portal
          </Button>
        </Box>

        {/* Level 2 Tabs: Element Selection */}
        <Box sx={{ display: 'flex', gap: 1, flexShrink: 0 }}>
          {[
            { id: 'header', label: 'Header' },
            { id: 'footer', label: 'Footer' },
            { id: 'css', label: 'Custom CSS' },
            { id: 'js', label: 'Custom JavaScript' },
          ].map((tab) => {
            const isSelected = elementTab === tab.id;
            return (
              <Button
                key={tab.id}
                size="small"
                onClick={() => setElementTab(tab.id as any)}
                sx={{
                  textTransform: 'none',
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: '0.8125rem',
                  color: isSelected ? 'text.primary' : 'text.secondary',
                  bgcolor: isSelected ? 'action.selected' : 'transparent',
                  borderRadius: 1,
                  px: 1.5,
                  py: 0.4,
                  '&:hover': {
                    bgcolor: isSelected ? 'action.selected' : 'action.hover',
                  },
                }}
              >
                {tab.label}
              </Button>
            );
          })}
        </Box>

        {/* Code Editor Box with Line Numbers */}
        <Box
          sx={{
            display: 'flex',
            border: 1,
            borderColor: 'divider',
            borderRadius: 1,
            bgcolor: 'background.paper',
            flexGrow: 1,
            minHeight: 0,
            overflow: 'hidden',
            fontFamily: 'monospace',
            fontSize: '0.875rem',
          }}
        >
          {/* Gutter / Line Numbers */}
          <Box
            sx={{
              bgcolor: 'action.hover',
              borderRight: 1,
              borderColor: 'divider',
              px: 1.5,
              py: 1.5,
              userSelect: 'none',
              textAlign: 'right',
              color: 'text.disabled',
              fontSize: '0.8125rem',
              lineHeight: '21px',
              minWidth: 40,
              overflowY: 'hidden',
            }}
          >
            {lines.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </Box>

          {/* Text Area */}
          <Box sx={{ flexGrow: 1, p: 0, position: 'relative', height: '100%', minHeight: 0 }}>
            <textarea
              value={currentCode}
              onChange={handleCodeChange}
              spellCheck={false}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                outline: 'none',
                resize: 'none',
                padding: '12px 16px',
                fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                fontSize: '0.875rem',
                lineHeight: '21px',
                backgroundColor: 'transparent',
                color: 'inherit',
                boxSizing: 'border-box',
              }}
            />
          </Box>
        </Box>

        {/* Footer info & action buttons */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2,
            flexShrink: 0,
            pt: 0.5,
          }}
        >
          <Box>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8125rem' }}>
              Please preview any changes in a new tab and revert if any issues are observed.
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8125rem' }}>
              Do not close this page unless you've ensured that all changes are functioning as expected.
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Button
              variant="text"
              size="small"
              onClick={handleRevert}
              sx={{ textTransform: 'none', color: 'text.secondary', fontSize: '0.8125rem' }}
            >
              Revert all changes
            </Button>
            <Button
              variant="outlined"
              size="small"
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.8125rem',
                height: 32,
                px: 2,
              }}
            >
              Preview in new tab
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.8125rem',
                height: 32,
                px: 2.5,
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
