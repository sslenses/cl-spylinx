import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Link,
  FormControl,
  Select,
  MenuItem,
  Button,
  IconButton,
  Divider,
  Chip,
  OutlinedInput,
  SelectChangeEvent,
  Tooltip,
} from '@mui/material';
import {
  Language as NetworkingIcon,
  Refresh as RefreshIcon,
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
  WifiTethering as NetworkSitesIcon,
  Router as RouterIcon,
  Memory as HardwareIcon,
  Hub as AccessDeviceIcon,
  Diamond as LeadIcon,
  Person as PersonIcon,
  SettingsInputAntenna as ServiceIcon,
} from '@mui/icons-material';
import L from 'leaflet';
import { useAppStore } from '../../lib/store';

// Map markers mock data
const mapLocations = [
  { id: '1', name: 'Core Router Mikrotik CCR1036', type: 'router', lat: 40.7128, lng: -74.006, status: 'online', ip: '192.168.1.1' },
  { id: '2', name: 'Tower Site North-1', type: 'site', lat: 40.73061, lng: -73.935242, status: 'active', ip: '10.0.1.1' },
  { id: '3', name: 'OLT Huawei MA5608T', type: 'hardware', lat: 40.758896, lng: -73.98513, status: 'online', ip: '192.168.10.5' },
  { id: '4', name: 'John Doe (Fiber 100Mbps)', type: 'customer', lat: 40.748817, lng: -73.985428, status: 'online', ip: '100.64.0.12' },
  { id: '5', name: 'Acme Corp Office', type: 'customer', lat: 40.7282, lng: -73.9942, status: 'online24', ip: '100.64.0.15' },
  { id: '6', name: 'Metropolis Hotel (Active)', type: 'customer', lat: 40.7614, lng: -73.9776, status: 'active', ip: '100.64.0.22' },
  { id: '7', name: 'New Prospect Residential', type: 'lead', lat: 40.735, lng: -74.002, status: 'new', ip: 'Pending' },
  { id: '8', name: 'Late Payer Cafe (Blocked)', type: 'customer', lat: 40.719, lng: -73.991, status: 'blocked', ip: '100.64.0.88' },
  { id: '9', name: 'Old Warehouse Unit', type: 'customer', lat: 40.742, lng: -74.015, status: 'inactive', ip: 'Inactive' },
];

export const NetworkingMapsView: React.FC = () => {
  const { setActiveModule, isDarkMode } = useAppStore();
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const [selectedShow, setSelectedShow] = useState<string[]>(['Hardware', 'Routers', 'Network sites', 'Customer']);
  const [selectedPartner, setSelectedPartner] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const handleShowChange = (event: SelectChangeEvent<typeof selectedShow>) => {
    const {
      target: { value },
    } = event;
    setSelectedShow(typeof value === 'string' ? value.split(',') : value);
  };

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [40.735, -73.99],
        zoom: 13,
        zoomControl: false,
      });

      L.control.zoom({ position: 'topleft' }).addTo(map);

      // OpenStreetMap Tiles (or Carto for dark mode)
      const tileUrl = isDarkMode
        ? 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
        : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

      L.tileLayer(tileUrl, {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      markersLayerRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Markers when filter changes
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    mapLocations.forEach((item) => {
      let shouldShow = false;
      if (item.type === 'router' && selectedShow.includes('Routers')) shouldShow = true;
      if (item.type === 'hardware' && selectedShow.includes('Hardware')) shouldShow = true;
      if (item.type === 'site' && selectedShow.includes('Network sites')) shouldShow = true;
      if (item.type === 'lead' && selectedShow.includes('Lead')) shouldShow = true;
      if (item.type === 'customer' && selectedShow.includes('Customer')) shouldShow = true;

      if (!shouldShow) return;

      // Custom marker icon colors
      let markerColor = '#2563eb';
      let iconEmoji = '📍';

      if (item.type === 'router') {
        markerColor = '#0284c7';
        iconEmoji = '🖧';
      } else if (item.type === 'site') {
        markerColor = '#7c3aed';
        iconEmoji = '📡';
      } else if (item.type === 'hardware') {
        markerColor = '#475569';
        iconEmoji = '💻';
      } else if (item.type === 'lead') {
        markerColor = '#d97706';
        iconEmoji = '💠';
      } else if (item.type === 'customer') {
        if (item.status === 'online') {
          markerColor = '#10b981';
          iconEmoji = '🟢';
        } else if (item.status === 'online24') {
          markerColor = '#f59e0b';
          iconEmoji = '🟠';
        } else if (item.status === 'active') {
          markerColor = '#2563eb';
          iconEmoji = '🔵';
        } else if (item.status === 'blocked') {
          markerColor = '#ef4444';
          iconEmoji = '🔴';
        } else {
          markerColor = '#94a3b8';
          iconEmoji = '⚫';
        }
      }

      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="
            background-color: ${markerColor};
            width: 28px;
            height: 28px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            font-size: 13px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            border: 2px solid #ffffff;
            cursor: pointer;
          ">
            <span>${iconEmoji}</span>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        popupAnchor: [0, -14],
      });

      const popupContent = `
        <div style="font-family: Inter, sans-serif; padding: 4px;">
          <div style="font-weight: 700; font-size: 13px; margin-bottom: 4px; color: #0f172a;">${item.name}</div>
          <div style="font-size: 11px; color: #64748b; margin-bottom: 2px;">Type: <strong>${item.type.toUpperCase()}</strong></div>
          <div style="font-size: 11px; color: #64748b; margin-bottom: 4px;">IP: <code style="background: #f1f5f9; padding: 1px 4px; border-radius: 3px;">${item.ip}</code></div>
          <div style="display: inline-block; padding: 2px 6px; border-radius: 3px; font-size: 10px; font-weight: 600; text-transform: uppercase; background-color: ${markerColor}20; color: ${markerColor};">
            ${item.status}
          </div>
        </div>
      `;

      const marker = L.marker([item.lat, item.lng], { icon: customIcon });
      marker.bindPopup(popupContent);
      markersLayerRef.current?.addLayer(marker);
    });
  }, [selectedShow, isDarkMode]);

  const handleRefresh = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([40.735, -73.99], 13);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 1.5, overflow: 'hidden', boxSizing: 'border-box' }}>
      {/* Breadcrumb & Header Title */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexShrink: 0 }}>
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
          <NetworkingIcon fontSize="small" />
        </Box>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Link
              component="button"
              underline="hover"
              onClick={() => setActiveModule('networking')}
              sx={{ color: '#1e88e5', fontWeight: 600, fontSize: '0.75rem', cursor: 'pointer' }}
            >
              Networking
            </Link>
            <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.75rem' }}>
              /
            </Typography>
          </Box>
          <Typography variant="h2" sx={{ fontWeight: 700, fontSize: '1.5rem', lineHeight: 1.2 }}>
            Maps
          </Typography>
        </Box>
      </Box>

      {/* Main Map Viewport Container Paper */}
      <Paper
        sx={{
          flexGrow: 1,
          minHeight: 0,
          borderRadius: 2,
          display: 'flex',
          overflow: 'hidden',
          border: 1,
          borderColor: 'divider',
          position: 'relative',
        }}
      >
        {/* Leaflet Map Canvas */}
        <Box
          ref={mapContainerRef}
          sx={{
            flexGrow: 1,
            height: '100%',
            minHeight: 0,
            width: '100%',
            bgcolor: 'background.default',
            zIndex: 1,
            '& .leaflet-control-zoom': {
              border: 'none !important',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15) !important',
              borderRadius: '8px !important',
              overflow: 'hidden !important',
              marginTop: '14px !important',
              marginLeft: '14px !important',
              backgroundColor: '#ffffff !important',
            },
            '& .leaflet-control-zoom-in, & .leaflet-control-zoom-out': {
              backgroundColor: '#ffffff !important',
              color: '#475569 !important',
              border: 'none !important',
              borderBottom: '1px solid #f1f5f9 !important',
              width: '34px !important',
              height: '34px !important',
              lineHeight: '34px !important',
              fontSize: '18px !important',
              fontWeight: '500 !important',
              display: 'flex !important',
              alignItems: 'center !important',
              justifyContent: 'center !important',
              textDecoration: 'none !important',
              transition: 'all 150ms ease-in-out !important',
              '&:hover': {
                backgroundColor: '#f8fafc !important',
                color: '#0f172a !important',
              },
            },
            '& .leaflet-control-zoom-out': {
              borderBottom: 'none !important',
            },
          }}
        />

        {/* Sidebar Toggle Button on Map Edge */}
        <IconButton
          size="small"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          sx={{
            position: 'absolute',
            top: 14,
            right: isSidebarOpen ? 294 : 14,
            zIndex: 1000,
            bgcolor: '#ffffff',
            color: '#475569',
            border: 'none',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            borderRadius: '8px',
            width: 34,
            height: 34,
            transition: 'right 0.2s ease-in-out, background-color 150ms ease',
            '&:hover': {
              bgcolor: '#f8fafc',
              color: '#0f172a',
            },
          }}
        >
          {isSidebarOpen ? <ChevronRightIcon sx={{ fontSize: 20 }} /> : <ChevronLeftIcon sx={{ fontSize: 20 }} />}
        </IconButton>

        {/* Right Side Filter & Legend Sidebar */}
        {isSidebarOpen && (
          <Box
            sx={{
              width: 280,
              flexShrink: 0,
              height: '100%',
              overflowY: 'auto',
              p: 2.5,
              borderLeft: 1,
              borderColor: 'divider',
              bgcolor: 'background.paper',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              zIndex: 999,
            }}
          >
            {/* Top Right Refresh Icon */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Tooltip title="Reset View">
                <IconButton
                  size="small"
                  onClick={handleRefresh}
                  sx={{
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 1,
                    p: 0.6,
                    color: 'text.secondary',
                  }}
                >
                  <RefreshIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Tooltip>
            </Box>

            {/* Filter Form Controls */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {/* Show Dropdown */}
              <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, mb: 0.5, display: 'block' }}>
                  Show
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    multiple
                    value={selectedShow}
                    onChange={handleShowChange}
                    input={<OutlinedInput size="small" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, maxHeight: 48, overflow: 'hidden' }}>
                        {selected.map((val) => (
                          <Chip key={val} label={val} size="small" sx={{ height: 20, fontSize: '0.7rem' }} />
                        ))}
                      </Box>
                    )}
                    sx={{ fontSize: '0.8125rem' }}
                  >
                    {['Hardware', 'Routers', 'Network sites', 'Access device', 'Lead', 'Customer'].map((name) => (
                      <MenuItem key={name} value={name} sx={{ fontSize: '0.8125rem' }}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {/* Partner Dropdown */}
              <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, mb: 0.5, display: 'block' }}>
                  Partner
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={selectedPartner}
                    onChange={(e) => setSelectedPartner(e.target.value)}
                    sx={{ fontSize: '0.8125rem' }}
                  >
                    <MenuItem value="all" sx={{ fontSize: '0.8125rem' }}>
                      All
                    </MenuItem>
                    <MenuItem value="main" sx={{ fontSize: '0.8125rem' }}>
                      Main Partner
                    </MenuItem>
                    <MenuItem value="branch_a" sx={{ fontSize: '0.8125rem' }}>
                      North Hub Branch
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Location Dropdown */}
              <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, mb: 0.5, display: 'block' }}>
                  Location
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    sx={{ fontSize: '0.8125rem' }}
                  >
                    <MenuItem value="all" sx={{ fontSize: '0.8125rem' }}>
                      All
                    </MenuItem>
                    <MenuItem value="loc_1" sx={{ fontSize: '0.8125rem' }}>
                      Downtown Sector
                    </MenuItem>
                    <MenuItem value="loc_2" sx={{ fontSize: '0.8125rem' }}>
                      Industrial Area
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Apply Button */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 0.5 }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.8125rem',
                    px: 3,
                    py: 0.6,
                    borderRadius: 1,
                  }}
                >
                  Apply
                </Button>
              </Box>
            </Box>

            <Divider sx={{ my: 0.5 }} />

            {/* General Infrastructure Legend */}
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '0.8125rem', mb: 1, color: 'text.primary' }}>
                Legend
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}>
                {[
                  { icon: <ServiceIcon sx={{ fontSize: 16, color: 'text.secondary' }} />, label: 'Service' },
                  { icon: <NetworkSitesIcon sx={{ fontSize: 16, color: '#7c3aed' }} />, label: 'Network sites' },
                  { icon: <RouterIcon sx={{ fontSize: 16, color: '#0284c7' }} />, label: 'Router' },
                  { icon: <HardwareIcon sx={{ fontSize: 16, color: '#475569' }} />, label: 'Hardware' },
                  { icon: <AccessDeviceIcon sx={{ fontSize: 16, color: '#00bfa5' }} />, label: 'Access device' },
                  { icon: <LeadIcon sx={{ fontSize: 16, color: '#d97706' }} />, label: 'Lead' },
                ].map((item, idx) => (
                  <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {item.icon}
                    <Typography variant="body2" sx={{ fontSize: '0.78125rem', color: 'text.secondary' }}>
                      - {item.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Customer Status Legend */}
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '0.8125rem', mb: 1, color: 'text.primary' }}>
                Customer
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}>
                {[
                  { color: '#10b981', label: 'Online' },
                  { color: '#f59e0b', label: 'Online last 24 hours' },
                  { color: '#2563eb', label: 'Active' },
                  { color: '#00e5ff', label: 'New' },
                  { color: '#ef4444', label: 'Blocked' },
                  { color: '#94a3b8', label: 'Inactive' },
                ].map((item, idx) => (
                  <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonIcon sx={{ fontSize: 16, color: item.color }} />
                    <Typography variant="body2" sx={{ fontSize: '0.78125rem', color: 'text.secondary' }}>
                      - {item.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
};
