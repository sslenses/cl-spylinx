import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  Chip,
  Link,
} from '@mui/material';
import { useAppStore } from '../../lib/store';
import {
  Tune as ConfigIcon,
  Search as SearchIcon,
  // System Icons
  TableChartOutlined as AdditionalFieldsIcon,
  LocalOfferOutlined as LabelsIcon,
  TranslateOutlined as TranslationsIcon,
  FolderOpenOutlined as FileManagerIcon,
  DashboardCustomizeOutlined as TemplatesIcon,
  EditNoteOutlined as CompanyInfoIcon,
  // Main Icons
  TuneOutlined as PreferencesIcon,
  GpsFixedOutlined as LocalizationIcon,
  ShieldOutlined as HttpsIcon,
  PeopleOutlined as ApiIcon,
  PauseCircleOutlined as StealthModeIcon,
  MapOutlined as MapsIcon,
  DesktopWindowsOutlined as SiteCustomizationIcon,
  GroupOutlined as CustomersIcon,
  OpenWithOutlined as CapIcon,
  MailOutlineOutlined as EmailIcon,
  ChatBubbleOutlineOutlined as SmsIcon,
  LanguageOutlined as PortalIcon,
  PodcastsOutlined as VoiceSettingsIcon,
  ConfirmationNumberOutlined as VouchersIcon,
  SubjectOutlined as LogrotateIcon,
  // Finance Icons
  AutoModeOutlined as AutomationIcon,
  SettingsOutlined as SettingsIcon,
  SyncAltOutlined as PairingIcon,
  NotificationsNoneOutlined as NotificationsIcon,
  SwapHorizontalCircleOutlined as ChangePlanIcon,
  CreditCardOutlined as PaymentMethodsIcon,
  ReceiptLongOutlined as TransactionCategoriesIcon,
  EventNoteOutlined as RemindersIcon,
  GroupAddOutlined as PaymentAccountsIcon,
  FeaturedPlayListOutlined as CostCategoriesIcon,
  VerifiedUserOutlined as FixedCostIcon,
  FormatListNumberedOutlined as AccountingCategoriesIcon,
  AccountBalanceWalletOutlined as AccountingBankAccountsIcon,
  PercentOutlined as AccountingTaxRatesIcon,
  LockOutlined as TaxesIcon,
  // Networking Icons
  DonutSmallOutlined as RadiusIcon,
  CallSplitOutlined as RadiusFailoverIcon,
  RouterOutlined as MikrotikApiIcon,
  GridViewOutlined as Ipv4Icon,
  Grid4x4Outlined as Ipv6Icon,
  ShowChartOutlined as NetFlowIcon,
  SpeedOutlined as FupIcon,
  StorageOutlined as NasTypesIcon,
  FormatListBulletedOutlined as IpNetworkCategoriesIcon,
  DeviceHubOutlined as IpHostCategoriesIcon,
  DevicesOutlined as HardwareIcon,
  LanOutlined as NetworkSitesIcon,
  AutoFixHighOutlined as Tr069Icon,
  PriorityHighOutlined as TrafficClassIcon,
  KeyOutlined as MultiplePskIcon,
  BlockOutlined as DnsBlockingIcon,
  // Helpdesk Icons
  ConfirmationNumberOutlined as TicketsIcon,
  RateReviewOutlined as CannedResponsesIcon,
  StorefrontOutlined as MiscTicketConfigIcon,
  WebAssetOutlined as TicketWidgetIcon,
  InboxOutlined as InboxesIcon,
  AutoAwesomeOutlined as TicketAutomationIcon,
  ChatOutlined as ChatboxIcon,
  MessageOutlined as WhatsAppIcon,
  // Scheduling Icons
  AccountTreeOutlined as WorkflowsIcon,
  GroupsOutlined as TeamsIcon,
  AssignmentTurnedInOutlined as TaskTemplatesIcon,
  FactCheckOutlined as ChecklistTemplatesIcon,
  LayersOutlined as ProjectTypesIcon,
  TableChartOutlined as ProjectCategoriesIcon,
  // Leads Icons
  RequestQuoteOutlined as LeadsFinanceIcon,
  AppRegistrationOutlined as SignupWidgetIcon,
  MailOutlineOutlined as ImapIcon,
  ContactPageOutlined as LeadsFieldsIcon,
  SyncOutlined as LeadConvertSettingsIcon,
  ViewColumnOutlined as LeadsPipelineIcon,
  // Inventory Icons
  Inventory2Outlined as StockLocationsIcon,
  CategoryOutlined as InventoryCategoriesIcon,
  // Integrations Icons
  SettingsSuggestOutlined as MainModulesIcon,
  AddBoxOutlined as AddOnsIcon,
  SystemUpdateAltOutlined as InstallModuleIcon,
  FormatListBulletedOutlined as ModulesListIcon,
  TrackChangesOutlined as HooksIcon,
  // Voice Icons
  AutorenewOutlined as AutoCdrIcon,
  DriveFolderUploadOutlined as ImportDataSourceIcon,
  // Tools Icons
  InputOutlined as ImportIcon,
  ExitToAppOutlined as ExportIcon,
  ForwardToInboxOutlined as ServicesExportIcon,
  BoltOutlined as ActivateServicesIcon,
  VpnKeyOutlined as VpnIcon,
  AccountBalanceWalletOutlined as InvoicesCacheIcon,
  SettingsBackupRestoreOutlined as BackupRestoreIcon,
  LocationOnOutlined as UpdateGpsIcon,
  PersonAddAlt1Outlined as RestoreCustomersIcon,
  ChangeCircleOutlined as MigrateServicesIcon,
  SupervisorAccountOutlined as AdminerIcon,
  CachedOutlined as ReloadSearchEngineIcon,
  UpdateOutlined as TaxUpdateIcon,
} from '@mui/icons-material';

interface ConfigItem {
  name: string;
  icon: React.ElementType;
}

interface ConfigCategory {
  id: string;
  name: string;
  color: string;
  items: ConfigItem[];
}

const configCategories: ConfigCategory[] = [
  {
    id: 'system',
    name: 'System',
    color: '#7E57C2',
    items: [
      { name: 'Additional fields', icon: AdditionalFieldsIcon },
      { name: 'Labels', icon: LabelsIcon },
      { name: 'Custom translations', icon: TranslationsIcon },
      { name: 'File manager', icon: FileManagerIcon },
      { name: 'Templates', icon: TemplatesIcon },
      { name: 'Company information', icon: CompanyInfoIcon },
    ],
  },
  {
    id: 'main',
    name: 'Main',
    color: '#FF9800',
    items: [
      { name: 'Preferences', icon: PreferencesIcon },
      { name: 'Localization', icon: LocalizationIcon },
      { name: 'HTTPS / SSL', icon: HttpsIcon },
      { name: 'API', icon: ApiIcon },
      { name: 'Stealth mode', icon: StealthModeIcon },
      { name: 'Maps', icon: MapsIcon },
      { name: 'Site customization', icon: SiteCustomizationIcon },
      { name: 'Customers', icon: CustomersIcon },
      { name: 'CAP', icon: CapIcon },
      { name: 'Email', icon: EmailIcon },
      { name: 'SMS', icon: SmsIcon },
      { name: 'Portal', icon: PortalIcon },
      { name: 'Voice', icon: VoiceSettingsIcon },
      { name: 'Vouchers', icon: VouchersIcon },
      { name: 'Logrotate', icon: LogrotateIcon },
    ],
  },
  {
    id: 'finance',
    name: 'Finance',
    color: '#2196F3',
    items: [
      { name: 'Automation', icon: AutomationIcon },
      { name: 'Settings', icon: SettingsIcon },
      { name: 'Pairing', icon: PairingIcon },
      { name: 'Notifications', icon: NotificationsIcon },
      { name: 'Change plan', icon: ChangePlanIcon },
      { name: 'Payment methods', icon: PaymentMethodsIcon },
      { name: 'Transaction categories', icon: TransactionCategoriesIcon },
      { name: 'Reminders', icon: RemindersIcon },
      { name: 'Payment accounts', icon: PaymentAccountsIcon },
      { name: 'Cost categories', icon: CostCategoriesIcon },
      { name: 'Fixed Cost', icon: FixedCostIcon },
      { name: 'Accounting categories', icon: AccountingCategoriesIcon },
      { name: 'Accounting bank accounts', icon: AccountingBankAccountsIcon },
      { name: 'Accounting tax rates', icon: AccountingTaxRatesIcon },
      { name: 'Taxes', icon: TaxesIcon },
    ],
  },
  {
    id: 'networking',
    name: 'Networking',
    color: '#E91E63',
    items: [
      { name: 'Radius', icon: RadiusIcon },
      { name: 'Radius failover', icon: RadiusFailoverIcon },
      { name: 'MikroTik API', icon: MikrotikApiIcon },
      { name: 'IPv4', icon: Ipv4Icon },
      { name: 'IPv6', icon: Ipv6Icon },
      { name: 'NetFlow accounting', icon: NetFlowIcon },
      { name: 'FUP', icon: FupIcon },
      { name: 'NAS types', icon: NasTypesIcon },
      { name: 'IP Network categories', icon: IpNetworkCategoriesIcon },
      { name: 'IP Host categories', icon: IpHostCategoriesIcon },
      { name: 'Hardware', icon: HardwareIcon },
      { name: 'Network sites', icon: NetworkSitesIcon },
      { name: 'TR-069 (ACS)', icon: Tr069Icon },
      { name: 'Traffic class', icon: TrafficClassIcon },
      { name: 'Multiple PSK', icon: MultiplePskIcon },
      { name: 'DNS Blocking', icon: DnsBlockingIcon },
    ],
  },
  {
    id: 'helpdesk',
    name: 'Helpdesk',
    color: '#FF9800',
    items: [
      { name: 'Tickets', icon: TicketsIcon },
      { name: 'Ticket notifications', icon: NotificationsIcon },
      { name: 'Canned responses', icon: CannedResponsesIcon },
      { name: 'Miscellaneous ticket configuration', icon: MiscTicketConfigIcon },
      { name: 'Ticket widget', icon: TicketWidgetIcon },
      { name: 'Inboxes', icon: InboxesIcon },
      { name: 'Ticket automation', icon: TicketAutomationIcon },
      { name: 'Chatbox', icon: ChatboxIcon },
      { name: 'WhatsApp', icon: WhatsAppIcon },
    ],
  },
  {
    id: 'scheduling',
    name: 'Scheduling',
    color: '#00BFA5',
    items: [
      { name: 'Workflows', icon: WorkflowsIcon },
      { name: 'Teams', icon: TeamsIcon },
      { name: 'Task templates', icon: TaskTemplatesIcon },
      { name: 'Checklist templates', icon: ChecklistTemplatesIcon },
      { name: 'Project types', icon: ProjectTypesIcon },
      { name: 'Project categories', icon: ProjectCategoriesIcon },
      { name: 'Notifications', icon: NotificationsIcon },
    ],
  },
  {
    id: 'leads',
    name: 'Leads',
    color: '#E53935',
    items: [
      { name: 'Preferences', icon: PreferencesIcon },
      { name: 'Finance', icon: LeadsFinanceIcon },
      { name: 'Signup widget', icon: SignupWidgetIcon },
      { name: 'IMAP', icon: ImapIcon },
      { name: 'Leads fields', icon: LeadsFieldsIcon },
      { name: 'Notifications', icon: NotificationsIcon },
      { name: 'Lead convert settings', icon: LeadConvertSettingsIcon },
      { name: 'Leads pipeline', icon: LeadsPipelineIcon },
    ],
  },
  {
    id: 'inventory',
    name: 'Inventory',
    color: '#7B1FA2',
    items: [
      { name: 'Stock locations', icon: StockLocationsIcon },
      { name: 'Notifications', icon: NotificationsIcon },
      { name: 'Categories', icon: InventoryCategoriesIcon },
      { name: 'Inventory tax', icon: TaxesIcon },
    ],
  },
  {
    id: 'integrations',
    name: 'Integrations',
    color: '#FFA000',
    items: [
      { name: 'Main modules', icon: MainModulesIcon },
      { name: 'Add-ons', icon: AddOnsIcon },
      { name: 'Install module', icon: InstallModuleIcon },
      { name: 'Modules list', icon: ModulesListIcon },
      { name: 'Hooks', icon: HooksIcon },
    ],
  },
  {
    id: 'voice',
    name: 'Voice',
    color: '#00BFA5',
    items: [
      { name: 'Auto CDR processing', icon: AutoCdrIcon },
      { name: 'Import data source', icon: ImportDataSourceIcon },
    ],
  },
  {
    id: 'tools',
    name: 'Tools',
    color: '#5C6BC0',
    items: [
      { name: 'Import', icon: ImportIcon },
      { name: 'Export', icon: ExportIcon },
      { name: 'Services export', icon: ServicesExportIcon },
      { name: 'Activate services', icon: ActivateServicesIcon },
      { name: 'VPN', icon: VpnIcon },
      { name: 'Invoices cache', icon: InvoicesCacheIcon },
      { name: 'Backup and restore', icon: BackupRestoreIcon },
      { name: 'Update GPS', icon: UpdateGpsIcon },
      { name: 'Restore deleted customers', icon: RestoreCustomersIcon },
      { name: 'Migrate services', icon: MigrateServicesIcon },
      { name: 'Adminer', icon: AdminerIcon },
      { name: 'Reload search engine', icon: ReloadSearchEngineIcon },
      { name: 'Tax update', icon: TaxUpdateIcon },
    ],
  },
];

const categoryTabs = [
  { id: 'all', label: 'All', color: '#212121' },
  { id: 'basic', label: 'Basic', color: '#212121' },
  { id: 'system', label: 'System', color: '#7E57C2' },
  { id: 'main', label: 'Main', color: '#FFA000' },
  { id: 'finance', label: 'Finance', color: '#2196F3' },
  { id: 'networking', label: 'Networking', color: '#E91E63' },
  { id: 'helpdesk', label: 'Helpdesk', color: '#FF9800' },
  { id: 'scheduling', label: 'Scheduling', color: '#00BFA5' },
  { id: 'leads', label: 'Leads', color: '#E53935' },
  { id: 'inventory', label: 'Inventory', color: '#7B1FA2' },
  { id: 'integrations', label: 'Integrations', color: '#FFB300' },
  { id: 'voice', label: 'Voice', color: '#00BFA5' },
  { id: 'tools', label: 'Tools', color: '#5C6BC0' },
];

export const ConfigView: React.FC = () => {
  const { setActiveModule } = useAppStore();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredCategories = configCategories.filter((cat) => {
    if (activeTab !== 'all' && activeTab !== 'basic' && cat.id !== activeTab) {
      return false;
    }
    return true;
  });

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
            <ConfigIcon fontSize="small" />
          </Box>
          <Typography variant="h2" sx={{ fontWeight: 800, fontSize: '1.5rem', lineHeight: 1.2 }}>
            Config
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

      {/* Category Filter Chips */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, flexWrap: 'wrap' }}>
        {categoryTabs.map((tab) => {
          const isSelected = activeTab === tab.id;
          return (
            <Box key={tab.id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.3 }}>
              <Chip
                label={tab.label}
                size="small"
                onClick={() => setActiveTab(tab.id)}
                sx={{
                  bgcolor: tab.color,
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  height: 24,
                  borderRadius: 0.75,
                  cursor: 'pointer',
                  opacity: isSelected ? 1 : 0.85,
                  '&:hover': {
                    opacity: 1,
                    boxShadow: 1,
                  },
                }}
              />
              {isSelected && (
                <Box
                  sx={{
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                  }}
                />
              )}
            </Box>
          );
        })}
      </Box>

      {/* Category Content Cards */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {filteredCategories.map((category) => {
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
                        '&:hover .config-link': {
                          textDecoration: 'underline',
                          color: 'primary.main',
                        },
                      }}
                    >
                      <ItemIcon sx={{ fontSize: 18, color: category.color, flexShrink: 0 }} />
                      <Link
                        className="config-link"
                        underline="none"
                        onClick={() => {
                          if (item.name === 'Site customization') {
                            setActiveModule('site-customization');
                          }
                        }}
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
