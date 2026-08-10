import { createTheme, ThemeOptions } from '@mui/material/styles';

// Enterprise Minimalist Design System & Palette
export const getMuiTheme = (mode: 'light' | 'dark') => {
  const isDark = mode === 'dark';

  const themeOptions: ThemeOptions = {
    palette: {
      mode,
      primary: {
        main: isDark ? '#3b82f6' : '#2563eb', // Clean Modern Indigo/Blue
        light: isDark ? '#60a5fa' : '#3b82f6',
        dark: isDark ? '#1d4ed8' : '#1e40af',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#6366f1',
        light: '#818cf8',
        dark: '#4f46e5',
        contrastText: '#ffffff',
      },
      info: {
        main: '#0ea5e9',
        light: '#38bdf8',
        dark: '#0284c7',
        contrastText: '#ffffff',
      },
      success: {
        main: '#10b981',
        light: '#34d399',
        dark: '#059669',
        contrastText: '#ffffff',
      },
      warning: {
        main: '#f59e0b',
        light: '#fbbf24',
        dark: '#d97706',
        contrastText: '#ffffff',
      },
      error: {
        main: '#ef4444',
        light: '#f87171',
        dark: '#dc2626',
        contrastText: '#ffffff',
      },
      background: {
        default: isDark ? '#090d16' : '#f8fafc',
        paper: isDark ? '#111827' : '#ffffff',
      },
      text: {
        primary: isDark ? '#f8fafc' : '#0f172a',
        secondary: isDark ? '#94a3b8' : '#475569',
        disabled: isDark ? '#64748b' : '#94a3b8',
      },
      divider: isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(15, 23, 42, 0.08)',
      action: {
        hover: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(15, 23, 42, 0.03)',
        selected: isDark ? 'rgba(59, 130, 246, 0.12)' : 'rgba(37, 99, 235, 0.08)',
      },
    },
    typography: {
      fontFamily: [
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        'sans-serif',
      ].join(','),
      h1: {
        fontSize: '1.625rem',
        fontWeight: 700,
        lineHeight: 1.25,
        letterSpacing: '-0.025em',
      },
      h2: {
        fontSize: '1.375rem',
        fontWeight: 700,
        lineHeight: 1.3,
        letterSpacing: '-0.02em',
      },
      h3: {
        fontSize: '1.1875rem',
        fontWeight: 600,
        lineHeight: 1.35,
        letterSpacing: '-0.015em',
      },
      h4: {
        fontSize: '1.0625rem',
        fontWeight: 600,
        lineHeight: 1.4,
        letterSpacing: '-0.01em',
      },
      h5: {
        fontSize: '0.9375rem',
        fontWeight: 600,
        lineHeight: 1.45,
      },
      h6: {
        fontSize: '0.875rem',
        fontWeight: 600,
        lineHeight: 1.5,
      },
      subtitle1: {
        fontSize: '0.875rem',
        fontWeight: 500,
        letterSpacing: '-0.005em',
      },
      subtitle2: {
        fontSize: '0.8125rem',
        fontWeight: 500,
        letterSpacing: '-0.005em',
      },
      body1: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
        letterSpacing: '-0.006em',
      },
      body2: {
        fontSize: '0.8125rem',
        lineHeight: 1.5,
        letterSpacing: '-0.005em',
      },
      caption: {
        fontSize: '0.75rem',
        lineHeight: 1.4,
        letterSpacing: '0.01em',
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
        letterSpacing: '0.005em',
      },
    },
    shape: {
      borderRadius: 6,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '*': {
            boxSizing: 'border-box',
          },
          html: {
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
          },
          body: {
            backgroundColor: isDark ? '#090d16' : '#f8fafc',
            color: isDark ? '#f8fafc' : '#0f172a',
            fontFeatureSettings: '"cv02", "cv03", "cv04", "cv11", "tnum"',
          },
          '::-webkit-scrollbar': {
            width: 6,
            height: 6,
          },
          '::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '::-webkit-scrollbar-thumb': {
            background: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)',
            borderRadius: 3,
          },
          '::-webkit-scrollbar-thumb:hover': {
            background: isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.25)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 6,
            fontWeight: 600,
            fontSize: '0.8125rem',
            boxShadow: 'none',
            transition: 'all 150ms ease-in-out',
            '&:hover': {
              boxShadow: 'none',
            },
          },
          contained: {
            '&:hover': {
              backgroundColor: isDark ? '#2563eb' : '#1d4ed8',
            },
          },
          outlined: {
            borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(15, 23, 42, 0.12)',
            '&:hover': {
              borderColor: isDark ? 'rgba(255, 255, 255, 0.24)' : 'rgba(15, 23, 42, 0.24)',
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(15, 23, 42, 0.03)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            backgroundImage: 'none',
            border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(15, 23, 42, 0.08)'}`,
            boxShadow: isDark
              ? '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px -1px rgba(0, 0, 0, 0.3)'
              : '0 1px 3px 0 rgba(15, 23, 42, 0.03), 0 1px 2px -1px rgba(15, 23, 42, 0.03)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            backgroundImage: 'none',
            border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(15, 23, 42, 0.08)'}`,
            boxShadow: isDark
              ? '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px -1px rgba(0, 0, 0, 0.3)'
              : '0 1px 3px 0 rgba(15, 23, 42, 0.03), 0 1px 2px -1px rgba(15, 23, 42, 0.03)',
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(15, 23, 42, 0.06)',
            padding: '8px 12px',
            fontSize: '0.8125rem',
            fontFeatureSettings: '"tnum"',
          },
          head: {
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(15, 23, 42, 0.02)',
            fontWeight: 600,
            fontSize: '0.8125rem',
            color: isDark ? '#cbd5e1' : '#334155',
            letterSpacing: '0.01em',
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            transition: 'background-color 100ms ease',
            '&.MuiTableRow-hover:hover': {
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(15, 23, 42, 0.025)',
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 4,
            fontWeight: 600,
            fontSize: '0.75rem',
            height: 22,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            fontSize: '0.8125rem',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(15, 23, 42, 0.12)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: isDark ? 'rgba(255, 255, 255, 0.22)' : 'rgba(15, 23, 42, 0.24)',
            },
          },
        },
      },
    },
  };

  return createTheme(themeOptions);
};
