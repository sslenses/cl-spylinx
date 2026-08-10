import React, { useState } from 'react';
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
  TextField,
  Collapse,
} from '@mui/material';
import {
  Tune as ConfigIcon,
  KeyboardArrowUp as ArrowUpIcon,
  KeyboardArrowDown as ArrowDownIcon,
  WarningAmber as WarningIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { useAppStore } from '../../lib/store';

export const CompanyInformationView: React.FC = () => {
  const { setActiveModule, isDarkMode } = useAppStore();
  const [partner, setPartner] = useState('Default');
  const [loadPartner, setLoadPartner] = useState('Default');
  const [isCompanyInfoOpen, setIsCompanyInfoOpen] = useState(true);

  // Form states matching exact screenshots
  const [formData, setFormData] = useState({
    partnerName: 'Default',
    companyName: 'Demo company s.r.o.',
    billingSystemUrl: '',
    street1: 'Klausova 17',
    street2: 'Stodulky',
    zipCode: '15500',
    city: 'Praha 5',
    country: 'United States of America',
    isoCountry: 'United States of America',
    email: 'demo_company@ispframework.com',
    phone: '',
    companyId: '333 334 335',
    companyTaxNumber: 'CZ333334335',
    defaultSystemTax: '21% (Tax 21%)',
    bankAccount: 'BANK_ACCOUNT',
    bankName: 'BANK_NAME',
    bankAddress: 'BANK_ADDRESS',
    commission: '0.00',
    invoicePdfTemplate: 'Invoice A4 Modern',
    creditNotePdfTemplate: 'Credit Note A4 Classic',
    proformaInvoicePdfTemplate: 'Proforma Invoice A4 Modern',
    quotePdfTemplate: 'Quote A4 PDF modern design',
    paymentReceiptTemplate: 'Payment receipt A4 Modern',
    statementTemplate: 'Report statements example',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pb: 6 }}>
      {/* Header & Partners Selector */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
        {/* Left Side: Badge & Breadcrumb */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 1.5,
              bgcolor: '#475569',
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
            </Box>
            <Typography variant="h2" sx={{ fontWeight: 700, fontSize: '1.5rem', lineHeight: 1.2 }}>
              Company information
            </Typography>
          </Box>
        </Box>

        {/* Right Side: Partners Selector */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, fontSize: '0.8125rem' }}>
            Partners
          </Typography>
          <FormControl size="small">
            <Select
              value={partner}
              onChange={(e) => setPartner(e.target.value)}
              sx={{ minWidth: 140, fontSize: '0.8125rem', height: 32, borderRadius: 1.5 }}
            >
              <MenuItem value="Default" sx={{ fontSize: '0.8125rem' }}>
                Default
              </MenuItem>
              <MenuItem value="Partner 2" sx={{ fontSize: '0.8125rem' }}>
                Branch North
              </MenuItem>
              <MenuItem value="Partner 3" sx={{ fontSize: '0.8125rem' }}>
                Branch South
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Top Action Card: Load information from another partner */}
      <Paper
        sx={{
          p: 2,
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          border: 1,
          borderColor: 'divider',
          boxShadow: 'none',
        }}
      >
        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8125rem', fontWeight: 500 }}>
          Load information from another partner
        </Typography>
        <FormControl size="small">
          <Select
            value={loadPartner}
            onChange={(e) => setLoadPartner(e.target.value)}
            sx={{ minWidth: 320, fontSize: '0.8125rem', height: 34, borderRadius: 1.5 }}
          >
            <MenuItem value="Default" sx={{ fontSize: '0.8125rem' }}>
              Default
            </MenuItem>
            <MenuItem value="Branch North" sx={{ fontSize: '0.8125rem' }}>
              Branch North
            </MenuItem>
            <MenuItem value="Branch South" sx={{ fontSize: '0.8125rem' }}>
              Branch South
            </MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          size="small"
          sx={{
            height: 34,
            px: 2.5,
            fontSize: '0.8125rem',
            fontWeight: 600,
            borderRadius: 1.5,
            textTransform: 'none',
            color: 'text.primary',
            borderColor: 'divider',
            '&:hover': {
              borderColor: 'text.secondary',
              bgcolor: 'action.hover',
            },
          }}
        >
          Load
        </Button>
      </Paper>

      {/* Main Form Collapsible Card */}
      <Paper
        sx={{
          borderRadius: 2,
          border: 1,
          borderColor: 'divider',
          boxShadow: 'none',
          overflow: 'hidden',
        }}
      >
        {/* Accordion / Card Header */}
        <Box
          onClick={() => setIsCompanyInfoOpen(!isCompanyInfoOpen)}
          sx={{
            px: 3,
            py: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            borderBottom: isCompanyInfoOpen ? 1 : 0,
            borderColor: 'divider',
            userSelect: 'none',
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: '0.9375rem', color: 'text.primary' }}>
            Company information
          </Typography>
          <IconButton size="small" sx={{ color: 'text.secondary' }}>
            {isCompanyInfoOpen ? <ArrowUpIcon fontSize="small" /> : <ArrowDownIcon fontSize="small" />}
          </IconButton>
        </Box>

        {/* Collapsible Content */}
        <Collapse in={isCompanyInfoOpen}>
          <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {/* Warning Alert Banner */}
            <Box
              sx={{
                bgcolor: isDarkMode ? 'rgba(245, 158, 11, 0.12)' : '#fff8e1',
                border: '1px solid',
                borderColor: isDarkMode ? 'rgba(245, 158, 11, 0.3)' : '#ffe082',
                borderRadius: 1.5,
                px: 2,
                py: 1.2,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Typography sx={{ fontSize: '0.8125rem', color: isDarkMode ? '#fbbf24' : '#b45309', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                Fields marked with <WarningIcon sx={{ fontSize: 16, color: '#f59e0b' }} /> have non-default values
              </Typography>
            </Box>

            {/* Form Fields List (2-column layout: Label on left, Field on right) */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 840, mx: 'auto', width: '100%', py: 1 }}>
              {/* Partner Name */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Typography
                  variant="body2"
                  sx={{
                    width: 220,
                    minWidth: 220,
                    textAlign: 'right',
                    color: 'text.secondary',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                  }}
                >
                  Partner name
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.8125rem', color: 'text.primary' }}>
                  {formData.partnerName}
                </Typography>
              </Box>

              {/* Company Name */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Typography
                  variant="body2"
                  sx={{
                    width: 220,
                    minWidth: 220,
                    textAlign: 'right',
                    color: 'text.secondary',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                  }}
                >
                  Company name
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={formData.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontSize: '0.8125rem',
                      height: 36,
                      borderRadius: 1.5,
                    },
                  }}
                />
              </Box>

              {/* Billing system URL (Splynx) */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Typography
                  variant="body2"
                  sx={{
                    width: 220,
                    minWidth: 220,
                    textAlign: 'right',
                    color: 'text.secondary',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                  }}
                >
                  Billing system URL (Splynx)
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder=""
                  value={formData.billingSystemUrl}
                  onChange={(e) => handleChange('billingSystemUrl', e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontSize: '0.8125rem',
                      height: 36,
                      borderRadius: 1.5,
                    },
                  }}
                />
              </Box>

              {/* Street 1 */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Typography
                  variant="body2"
                  sx={{
                    width: 220,
                    minWidth: 220,
                    textAlign: 'right',
                    color: 'text.secondary',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                  }}
                >
                  Street
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={formData.street1}
                  onChange={(e) => handleChange('street1', e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontSize: '0.8125rem',
                      height: 36,
                      borderRadius: 1.5,
                    },
                  }}
                />
              </Box>

              {/* Street 2 */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Typography
                  variant="body2"
                  sx={{
                    width: 220,
                    minWidth: 220,
                    textAlign: 'right',
                    color: 'text.secondary',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                  }}
                >
                  Street
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={formData.street2}
                  onChange={(e) => handleChange('street2', e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontSize: '0.8125rem',
                      height: 36,
                      borderRadius: 1.5,
                    },
                  }}
                />
              </Box>

              {/* ZIP Code */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Typography
                  variant="body2"
                  sx={{
                    width: 220,
                    minWidth: 220,
                    textAlign: 'right',
                    color: 'text.secondary',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                  }}
                >
                  ZIP Code
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={formData.zipCode}
                  onChange={(e) => handleChange('zipCode', e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontSize: '0.8125rem',
                      height: 36,
                      borderRadius: 1.5,
                    },
                  }}
                />
              </Box>

              {/* City */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Typography
                  variant="body2"
                  sx={{
                    width: 220,
                    minWidth: 220,
                    textAlign: 'right',
                    color: 'text.secondary',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                  }}
                >
                  City
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={formData.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontSize: '0.8125rem',
                      height: 36,
                      borderRadius: 1.5,
                    },
                  }}
                />
              </Box>

              {/* Country */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Typography
                  variant="body2"
                  sx={{
                    width: 220,
                    minWidth: 220,
                    textAlign: 'right',
                    color: 'text.secondary',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                  }}
                >
                  Country
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={formData.country}
                  onChange={(e) => handleChange('country', e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontSize: '0.8125rem',
                      height: 36,
                      borderRadius: 1.5,
                    },
                  }}
                />
              </Box>

              {/* ISO Country */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                <Typography
                  variant="body2"
                  sx={{
                    width: 220,
                    minWidth: 220,
                    textAlign: 'right',
                    color: 'text.secondary',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    pt: 0.8,
                  }}
                >
                  ISO Country
                </Typography>
                <Box sx={{ flexGrow: 1 }}>
                  <FormControl fullWidth size="small">
                    <Select
                      value={formData.isoCountry}
                      onChange={(e) => handleChange('isoCountry', e.target.value)}
                      sx={{
                        fontSize: '0.8125rem',
                        height: 36,
                        borderRadius: 1.5,
                      }}
                    >
                      <MenuItem value="United States of America" sx={{ fontSize: '0.8125rem' }}>
                        United States of America
                      </MenuItem>
                      <MenuItem value="Czech Republic" sx={{ fontSize: '0.8125rem' }}>
                        Czech Republic
                      </MenuItem>
                      <MenuItem value="Indonesia" sx={{ fontSize: '0.8125rem' }}>
                        Indonesia
                      </MenuItem>
                      <MenuItem value="Germany" sx={{ fontSize: '0.8125rem' }}>
                        Germany
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem', mt: 0.5, display: 'block' }}>
                    The value used for loading holidays and states/provinces in{' '}
                    <Link
                      component="button"
                      onClick={() => setActiveModule('config')}
                      sx={{ color: '#1e88e5', fontSize: '0.75rem', fontWeight: 500, cursor: 'pointer', verticalAlign: 'baseline' }}
                    >
                      Localization
                    </Link>{' '}
                    and maps for locations.
                  </Typography>
                </Box>
              </Box>

              {/* Email */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Typography
                  variant="body2"
                  sx={{
                    width: 220,
                    minWidth: 220,
                    textAlign: 'right',
                    color: 'text.secondary',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                  }}
                >
                  Email
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontSize: '0.8125rem',
                      height: 36,
                      borderRadius: 1.5,
                    },
                  }}
                />
              </Box>

              {/* Phone */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Typography
                  variant="body2"
                  sx={{
                    width: 220,
                    minWidth: 220,
                    textAlign: 'right',
                    color: 'text.secondary',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                  }}
                >
                  Phone
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  placeholder=""
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontSize: '0.8125rem',
                      height: 36,
                      borderRadius: 1.5,
                    },
                  }}
                />
              </Box>

              {/* Company ID */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Typography
                  variant="body2"
                  sx={{
                    width: 220,
                    minWidth: 220,
                    textAlign: 'right',
                    color: 'text.secondary',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                  }}
                >
                  Company ID
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={formData.companyId}
                  onChange={(e) => handleChange('companyId', e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontSize: '0.8125rem',
                      height: 36,
                      borderRadius: 1.5,
                    },
                  }}
                />
              </Box>

              {/* Company TAX number */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Typography
                  variant="body2"
                  sx={{
                    width: 220,
                    minWidth: 220,
                    textAlign: 'right',
                    color: 'text.secondary',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                  }}
                >
                  Company TAX number
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={formData.companyTaxNumber}
                  onChange={(e) => handleChange('companyTaxNumber', e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontSize: '0.8125rem',
                      height: 36,
                      borderRadius: 1.5,
                    },
                  }}
                />
              </Box>

              {/* Default system tax */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                <Typography
                  variant="body2"
                  sx={{
                    width: 220,
                    minWidth: 220,
                    textAlign: 'right',
                    color: 'text.secondary',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    pt: 0.8,
                  }}
                >
                  Default system tax
                </Typography>
                <Box sx={{ flexGrow: 1 }}>
                  <FormControl fullWidth size="small">
                    <Select
                      value={formData.defaultSystemTax}
                      onChange={(e) => handleChange('defaultSystemTax', e.target.value)}
                      sx={{
                        fontSize: '0.8125rem',
                        height: 36,
                        borderRadius: 1.5,
                      }}
                    >
                      <MenuItem value="21% (Tax 21%)" sx={{ fontSize: '0.8125rem' }}>
                        21% (Tax 21%)
                      </MenuItem>
                      <MenuItem value="10% (Tax 10%)" sx={{ fontSize: '0.8125rem' }}>
                        10% (Tax 10%)
                      </MenuItem>
                      <MenuItem value="0% (Tax 0%)" sx={{ fontSize: '0.8125rem' }}>
                        0% (Tax 0%)
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem', mt: 0.5, display: 'block' }}>
                    If a location-based tax is applied, it will take preference and be used by default in the customer's financial documents.
                  </Typography>
                </Box>
              </Box>

              {/* Bank account */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Typography
                  variant="body2"
                  sx={{
                    width: 220,
                    minWidth: 220,
                    textAlign: 'right',
                    color: 'text.secondary',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                  }}
                >
                  Bank account
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={formData.bankAccount}
                  onChange={(e) => handleChange('bankAccount', e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontSize: '0.8125rem',
                      height: 36,
                      borderRadius: 1.5,
                    },
                  }}
                />
              </Box>

              {/* Bank name */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Typography
                  variant="body2"
                  sx={{
                    width: 220,
                    minWidth: 220,
                    textAlign: 'right',
                    color: 'text.secondary',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                  }}
                >
                  Bank name
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={formData.bankName}
                  onChange={(e) => handleChange('bankName', e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontSize: '0.8125rem',
                      height: 36,
                      borderRadius: 1.5,
                    },
                  }}
                />
              </Box>

              {/* Bank address/branch */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Typography
                  variant="body2"
                  sx={{
                    width: 220,
                    minWidth: 220,
                    textAlign: 'right',
                    color: 'text.secondary',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                  }}
                >
                  Bank address/branch
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={formData.bankAddress}
                  onChange={(e) => handleChange('bankAddress', e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontSize: '0.8125rem',
                      height: 36,
                      borderRadius: 1.5,
                    },
                  }}
                />
              </Box>

              {/* Partner's commission (%) */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Typography
                  variant="body2"
                  sx={{
                    width: 220,
                    minWidth: 220,
                    textAlign: 'right',
                    color: 'text.secondary',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                  }}
                >
                  Partner's commission (%)
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  slotProps={{ htmlInput: { step: '0.01' } }}
                  value={formData.commission}
                  onChange={(e) => handleChange('commission', e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontSize: '0.8125rem',
                      height: 36,
                      borderRadius: 1.5,
                    },
                  }}
                />
              </Box>

              {/* Invoice PDF template */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Typography
                  variant="body2"
                  sx={{
                    width: 220,
                    minWidth: 220,
                    textAlign: 'right',
                    color: 'text.secondary',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                  }}
                >
                  Invoice PDF template
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={formData.invoicePdfTemplate}
                    onChange={(e) => handleChange('invoicePdfTemplate', e.target.value)}
                    sx={{
                      fontSize: '0.8125rem',
                      height: 36,
                      borderRadius: 1.5,
                    }}
                  >
                    <MenuItem value="Invoice A4 Modern" sx={{ fontSize: '0.8125rem' }}>
                      Invoice A4 Modern
                    </MenuItem>
                    <MenuItem value="Invoice A4 Standard" sx={{ fontSize: '0.8125rem' }}>
                      Invoice A4 Standard
                    </MenuItem>
                    <MenuItem value="Invoice Thermal 80mm" sx={{ fontSize: '0.8125rem' }}>
                      Invoice Thermal 80mm
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Credit note PDF template */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Typography
                  variant="body2"
                  sx={{
                    width: 220,
                    minWidth: 220,
                    textAlign: 'right',
                    color: 'text.secondary',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                  }}
                >
                  Credit note PDF template
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={formData.creditNotePdfTemplate}
                    onChange={(e) => handleChange('creditNotePdfTemplate', e.target.value)}
                    sx={{
                      fontSize: '0.8125rem',
                      height: 36,
                      borderRadius: 1.5,
                    }}
                  >
                    <MenuItem value="Credit Note A4 Classic" sx={{ fontSize: '0.8125rem' }}>
                      Credit Note A4 Classic
                    </MenuItem>
                    <MenuItem value="Credit Note A4 Standard" sx={{ fontSize: '0.8125rem' }}>
                      Credit Note A4 Standard
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Proforma invoice PDF template */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Typography
                  variant="body2"
                  sx={{
                    width: 220,
                    minWidth: 220,
                    textAlign: 'right',
                    color: 'text.secondary',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                  }}
                >
                  Proforma invoice PDF template
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={formData.proformaInvoicePdfTemplate || 'Proforma Invoice A4 Modern'}
                    onChange={(e) => handleChange('proformaInvoicePdfTemplate', e.target.value)}
                    sx={{
                      fontSize: '0.8125rem',
                      height: 36,
                      borderRadius: 1.5,
                    }}
                  >
                    <MenuItem value="Proforma Invoice A4 Modern" sx={{ fontSize: '0.8125rem' }}>
                      Proforma Invoice A4 Modern
                    </MenuItem>
                    <MenuItem value="Proforma Invoice A4 Standard" sx={{ fontSize: '0.8125rem' }}>
                      Proforma Invoice A4 Standard
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Quote PDF template */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Typography
                  variant="body2"
                  sx={{
                    width: 220,
                    minWidth: 220,
                    textAlign: 'right',
                    color: 'text.secondary',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                  }}
                >
                  Quote PDF template
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={formData.quotePdfTemplate || 'Quote A4 PDF modern design'}
                    onChange={(e) => handleChange('quotePdfTemplate', e.target.value)}
                    sx={{
                      fontSize: '0.8125rem',
                      height: 36,
                      borderRadius: 1.5,
                    }}
                  >
                    <MenuItem value="Quote A4 PDF modern design" sx={{ fontSize: '0.8125rem' }}>
                      Quote A4 PDF modern design
                    </MenuItem>
                    <MenuItem value="Quote A4 Classic" sx={{ fontSize: '0.8125rem' }}>
                      Quote A4 Classic
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Payment receipt template */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Typography
                  variant="body2"
                  sx={{
                    width: 220,
                    minWidth: 220,
                    textAlign: 'right',
                    color: 'text.secondary',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                  }}
                >
                  Payment receipt template
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={formData.paymentReceiptTemplate || 'Payment receipt A4 Modern'}
                    onChange={(e) => handleChange('paymentReceiptTemplate', e.target.value)}
                    sx={{
                      fontSize: '0.8125rem',
                      height: 36,
                      borderRadius: 1.5,
                    }}
                  >
                    <MenuItem value="Payment receipt A4 Modern" sx={{ fontSize: '0.8125rem' }}>
                      Payment receipt A4 Modern
                    </MenuItem>
                    <MenuItem value="Payment receipt Thermal" sx={{ fontSize: '0.8125rem' }}>
                      Payment receipt Thermal
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Statement template */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Typography
                  variant="body2"
                  sx={{
                    width: 220,
                    minWidth: 220,
                    textAlign: 'right',
                    color: 'text.secondary',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                  }}
                >
                  Statement template
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={formData.statementTemplate || 'Report statements example'}
                    onChange={(e) => handleChange('statementTemplate', e.target.value)}
                    sx={{
                      fontSize: '0.8125rem',
                      height: 36,
                      borderRadius: 1.5,
                    }}
                  >
                    <MenuItem value="Report statements example" sx={{ fontSize: '0.8125rem' }}>
                      Report statements example
                    </MenuItem>
                    <MenuItem value="Statement Detailed Summary" sx={{ fontSize: '0.8125rem' }}>
                      Statement Detailed Summary
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Partner logo Upload Field */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Typography
                  variant="body2"
                  sx={{
                    width: 220,
                    minWidth: 220,
                    textAlign: 'right',
                    color: 'text.secondary',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                  }}
                >
                  Partner logo
                </Typography>
                <Box
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    alignItems: 'center',
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 1.5,
                    bgcolor: isDarkMode ? 'rgba(255, 255, 255, 0.03)' : '#f1f5f9',
                    overflow: 'hidden',
                    height: 36,
                  }}
                >
                  <Button
                    component="label"
                    variant="text"
                    size="small"
                    sx={{
                      bgcolor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : '#ffffff',
                      color: 'text.primary',
                      height: '100%',
                      px: 2,
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      textTransform: 'none',
                      borderRadius: 0,
                      borderRight: 1,
                      borderColor: 'divider',
                      '&:hover': {
                        bgcolor: 'action.hover',
                      },
                    }}
                  >
                    Browse
                    <input type="file" hidden accept="image/*" />
                  </Button>
                  <Typography variant="body2" sx={{ px: 2, fontSize: '0.8125rem', color: 'text.primary' }}>
                    demo-logo.png
                  </Typography>
                </Box>
              </Box>

              {/* Partner Logo Preview with Demo Badge & Delete Button */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, pt: 1, pb: 1 }}>
                <Box sx={{ width: 220, minWidth: 220 }} />
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  {/* Logo graphic */}
                  <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    {/* Demo Badge */}
                    <Box
                      sx={{
                        bgcolor: '#00bfa5',
                        color: '#ffffff',
                        px: 1.2,
                        py: 0.2,
                        borderRadius: 1,
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        mb: 0.5,
                        mr: 1,
                      }}
                    >
                      Demo
                    </Box>
                    {/* Brand Graphic */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '50%',
                          border: '2px solid #ef4444',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#ef4444',
                          position: 'relative',
                        }}
                      >
                        <Box sx={{ width: 6, height: 6, bgcolor: '#ef4444', borderRadius: '50%', position: 'absolute', top: 10, left: 12 }} />
                        <Box sx={{ width: 6, height: 6, bgcolor: '#ef4444', borderRadius: '50%', position: 'absolute', bottom: 12, right: 10 }} />
                        <Box sx={{ width: 8, height: 8, bgcolor: '#ef4444', borderRadius: '50%', position: 'absolute', top: 20, right: 14 }} />
                      </Box>
                      <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: 2, color: isDarkMode ? '#f8fafc' : '#1e293b' }}>
                        SPLYNX
                      </Typography>
                    </Box>
                  </Box>

                  {/* Delete Logo Button */}
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<SaveIcon sx={{ display: 'none' }} />}
                    sx={{
                      bgcolor: '#ef4444',
                      color: '#ffffff',
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '0.8125rem',
                      px: 2,
                      py: 0.6,
                      borderRadius: 1.5,
                      '&:hover': {
                        bgcolor: '#dc2626',
                      },
                    }}
                  >
                    🗑 Delete
                  </Button>
                </Box>
              </Box>

              {/* Save Button Action Row */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{
                    px: 3.5,
                    height: 36,
                    borderRadius: 1.5,
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    textTransform: 'none',
                  }}
                >
                  Save
                </Button>
              </Box>
            </Box>
          </Box>
        </Collapse>
      </Paper>
    </Box>
  );
};
