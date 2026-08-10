import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  Link,
} from '@mui/material';
import {
  ContactPageOutlined as AdminHeaderIcon,
  Search as SearchIcon,
  // Splynx Icons
  ManageAccountsOutlined as AdministratorsIcon,
  SupervisedUserCircleOutlined as RolesIcon,
  GroupsOutlined as PartnersIcon,
  LanguageOutlined as LocationsIcon,
  KeyOutlined as ApiKeysIcon,
  // Logs Icons
  SettingsSuggestOutlined as OperationsIcon,
  ArrowCircleDownOutlined as InternalLogsIcon,
  LanguageOutlined as PortalLogsIcon,
  DescriptionOutlined as FilesIcon,
  MailOutlineOutlined as EmailLogsIcon,
  ChatBubbleOutlineOutlined as SmsLogsIcon,
  ContactPageOutlined as SessionsIcon,
  PeopleOutlined as ApiLogsIcon,
  AssignmentIndOutlined as CustomerStatusIcon,
  ChangeCircleOutlined as ServiceStatusChangesIcon,
  AccessTimeOutlined as PlannedStatusIcon,
  ReceiptLongOutlined as AccountingIntegrationsIcon,
  // Information Icons
  VerifiedUserOutlined as LicenseIcon,
  DesktopWindowsOutlined as SiteIcon,
  InfoOutlined as DocumentationIcon,
  ForumOutlined as ForumIcon,
  SmartDisplayOutlined as YoutubeIcon,
  VideoCameraBackOutlined as DeploymentVideosIcon,
  OpenInNewOutlined as FacebookIcon,
  PeopleOutlined as ApiDocIcon,
  // Featured Reports Icons
  CalculateOutlined as FinancialReportPerPlanIcon,
  PersonOffOutlined as LostBlockedCustomersIcon,
  NewspaperOutlined as NewServicesIcon,
  ReceiptLongOutlined as AccountStatementsIcon,
  ReceiptOutlined as TaxSummaryIcon,
  // Other Reports Icons
  DescriptionOutlined as PlanUsageIcon,
  GroupsOutlined as CustomerUsageIcon,
  ShowChartOutlined as RefillCardStatsIcon,
  AssessmentOutlined as FinancialReportsIcon,
  LoyaltyOutlined as CustomPricingIcon,
  FormatListBulletedOutlined as TransactionCategoriesIcon,
  ConfirmationNumberOutlined as SupportTicketReportsIcon,
  HandshakeOutlined as CustomerContractsReportsIcon,
  LayersOutlined as InventoryReportsIcon,
  TrendingUpOutlined as CustomerStatusChartIcon,
  AccountBalanceWalletOutlined as AccountStatusPreviewIcon,
  TimelineOutlined as MrrNetChangeIcon,
  RequestQuoteOutlined as InvoiceReportIcon,
} from '@mui/icons-material';

interface AdminItem {
  name: string;
  icon: React.ElementType;
}

interface AdminCategory {
  id: string;
  name: string;
  color: string;
  items: AdminItem[];
}

const adminCategories: AdminCategory[] = [
  {
    id: 'splynx',
    name: 'Splynx',
    color: '#7E57C2',
    items: [
      { name: 'Administrators', icon: AdministratorsIcon },
      { name: 'Roles', icon: RolesIcon },
      { name: 'Partners', icon: PartnersIcon },
      { name: 'Locations', icon: LocationsIcon },
      { name: 'API keys', icon: ApiKeysIcon },
    ],
  },
  {
    id: 'logs',
    name: 'Logs',
    color: '#00BFA5',
    items: [
      { name: 'Operations', icon: OperationsIcon },
      { name: 'Internal', icon: InternalLogsIcon },
      { name: 'Portal', icon: PortalLogsIcon },
      { name: 'Files', icon: FilesIcon },
      { name: 'Email', icon: EmailLogsIcon },
      { name: 'SMS', icon: SmsLogsIcon },
      { name: 'Sessions', icon: SessionsIcon },
      { name: 'API', icon: ApiLogsIcon },
      { name: 'Customer status & service ...', icon: CustomerStatusIcon },
      { name: 'Service status changes', icon: ServiceStatusChangesIcon },
      { name: 'Planned customer status & ...', icon: PlannedStatusIcon },
      { name: 'Accounting integrations', icon: AccountingIntegrationsIcon },
    ],
  },
  {
    id: 'information',
    name: 'Information',
    color: '#FFA000',
    items: [
      { name: 'License', icon: LicenseIcon },
      { name: 'Site', icon: SiteIcon },
      { name: 'Documentation', icon: DocumentationIcon },
      { name: 'Forum', icon: ForumIcon },
      { name: 'YouTube channel', icon: YoutubeIcon },
      { name: 'Deployment videos', icon: DeploymentVideosIcon },
      { name: 'Facebook', icon: FacebookIcon },
      { name: 'API documentation', icon: ApiDocIcon },
    ],
  },
  {
    id: 'featured-reports',
    name: 'Featured reports',
    color: '#E53935',
    items: [
      { name: 'Financial report per plan', icon: FinancialReportPerPlanIcon },
      { name: 'Lost / blocked customers', icon: LostBlockedCustomersIcon },
      { name: 'New services', icon: NewServicesIcon },
      { name: 'Account statements', icon: AccountStatementsIcon },
      { name: 'Tax summary', icon: TaxSummaryIcon },
    ],
  },
  {
    id: 'other-reports',
    name: 'Other reports',
    color: '#2196F3',
    items: [
      { name: 'Plan usage', icon: PlanUsageIcon },
      { name: 'Customer usage', icon: CustomerUsageIcon },
      { name: 'Refill card statistics', icon: RefillCardStatsIcon },
      { name: 'Financial reports', icon: FinancialReportsIcon },
      { name: 'Custom pricing & discounts', icon: CustomPricingIcon },
      { name: 'Transaction categories', icon: TransactionCategoriesIcon },
      { name: 'Support ticket reports', icon: SupportTicketReportsIcon },
      { name: 'Customer contracts reports', icon: CustomerContractsReportsIcon },
      { name: 'Inventory reports', icon: InventoryReportsIcon },
      { name: 'Customer status chart', icon: CustomerStatusChartIcon },
      { name: 'Account status preview', icon: AccountStatusPreviewIcon },
      { name: 'MRR net change report', icon: MrrNetChangeIcon },
      { name: 'Invoice report', icon: InvoiceReportIcon },
    ],
  },
];

export const AdministrationView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {/* Header Row */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
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
            <AdminHeaderIcon fontSize="small" />
          </Box>
          <Typography variant="h2" sx={{ fontWeight: 800, fontSize: '1.5rem', lineHeight: 1.2 }}>
            Administration
          </Typography>
        </Box>

        <TextField
          size="small"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon sx={{ fontSize: 18, color: 'text.disabled' }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{ width: 260, '& .MuiInputBase-root': { height: 32, fontSize: '0.8125rem' } }}
        />
      </Box>

      {/* Category Content Cards */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {adminCategories.map((category) => {
          const visibleItems = category.items.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          );

          if (visibleItems.length === 0) return null;

          return (
            <Paper
              key={category.id}
              sx={{
                p: 2.5,
                borderRadius: 2,
                borderLeft: 4,
                borderLeftColor: category.color,
                boxShadow: 1,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  fontSize: '1rem',
                  mb: 2,
                  color: 'text.primary',
                }}
              >
                {category.name}
              </Typography>

              {/* Items 5-column grid */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                    lg: 'repeat(5, 1fr)',
                  },
                  rowGap: 2,
                  columnGap: 2,
                }}
              >
                {visibleItems.map((item) => {
                  const ItemIcon = item.icon;
                  return (
                    <Box
                      key={item.name}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.2,
                        cursor: 'pointer',
                        '&:hover .admin-link': {
                          textDecoration: 'underline',
                          color: 'primary.main',
                        },
                      }}
                    >
                      <ItemIcon sx={{ fontSize: 18, color: category.color, flexShrink: 0 }} />
                      <Link
                        className="admin-link"
                        underline="none"
                        sx={{
                          fontSize: '0.8125rem',
                          color: '#1e88e5',
                          fontWeight: 500,
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {item.name}
                      </Link>
                    </Box>
                  );
                })}
              </Box>
            </Paper>
          );
        })}
      </Box>
    </Box>
  );
};
