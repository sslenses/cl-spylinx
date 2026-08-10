import React, { useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { getMuiTheme } from './theme/muiTheme';
import { useAppStore } from './lib/store';
import { AdminLayout } from './components/layout/AdminLayout';
import { OverviewView } from './modules/dashboard/OverviewView';
import { CustomersView } from './modules/crm/CustomersView';
import { TicketsView } from './modules/crm/TicketsView';
import { FinanceView } from './modules/crm/FinanceView';
import { NetworkingView } from './modules/oss/NetworkingView';
import { NetworkingMapsView } from './modules/oss/NetworkingMapsView';
import { SchedulingView } from './modules/company/SchedulingView';
import { InventoryView } from './modules/company/InventoryView';
import { InventoryItemsView } from './modules/company/InventoryItemsView';
import { InventoryProductsView } from './modules/company/InventoryProductsView';
import { InventorySuppliersView } from './modules/company/InventorySuppliersView';
import { InventoryVendorsView } from './modules/company/InventoryVendorsView';
import { InventorySupplierInvoicesView } from './modules/company/InventorySupplierInvoicesView';
import { TariffPlansView } from './modules/company/TariffPlansView';
import { AdministrationView } from './modules/system/AdministrationView';
import { ConfigView } from './modules/system/ConfigView';
import { SiteCustomizationView } from './modules/system/SiteCustomizationView';
import { CompanyInformationView } from './modules/system/CompanyInformationView';
import { QuickAddModal } from './components/modals/QuickAddModal';

const ModuleSwitcher: React.FC = () => {
  const { activeModule } = useAppStore();

  switch (activeModule) {
    case 'dashboard':
      return <OverviewView />;
    case 'customers':
      return <CustomersView />;
    case 'tickets':
      return <TicketsView />;
    case 'finance':
      return <FinanceView />;
    case 'networking':
      return <NetworkingView />;
    case 'networking-maps':
      return <NetworkingMapsView />;
    case 'scheduling':
      return <SchedulingView />;
    case 'inventory':
      return <InventoryView />;
    case 'inventory-items':
      return <InventoryItemsView />;
    case 'inventory-products':
      return <InventoryProductsView />;
    case 'inventory-suppliers':
      return <InventorySuppliersView />;
    case 'inventory-vendors':
      return <InventoryVendorsView />;
    case 'inventory-supplier-invoices':
      return <InventorySupplierInvoicesView />;
    case 'tariff-plans':
      return <TariffPlansView />;
    case 'administration':
      return <AdministrationView />;
    case 'config':
      return <ConfigView />;
    case 'company-information':
      return <CompanyInformationView />;
    case 'site-customization':
      return <SiteCustomizationView />;
    default:
      return <OverviewView />;
  }
};

export default function App() {
  const { isDarkMode } = useAppStore();
  const theme = useMemo(() => getMuiTheme(isDarkMode ? 'dark' : 'light'), [isDarkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AdminLayout>
          <Routes>
            <Route path="*" element={<ModuleSwitcher />} />
          </Routes>
          <QuickAddModal />
        </AdminLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

