"use client";

import { useState } from 'react';
import SalesLayout from './component/SalesLayout';
import SaleInvoicesPage from './pages/SaleInvoicesPage';
import EstimatesPage from './pages/EstimatesPage';
import ProformaInvoicePage from './pages/ProformaInvoicePage';
import PaymentInPage from './pages/PaymentInPage';

// Define the different pages available in the sales section
export type SalePageType = 
  | 'Sale Invoices'
  | 'Estimate/Quotation'
  | 'Proforma Invoice'
  | 'Payment-In'
  | 'Sale Order'
  | 'Delivery Challan'
  | 'Sale Return'
  | 'Purchase Bills';

  const addButtonLabels: Record<SalePageType, string> = {
    'Sale Invoices': 'Add Sale',
    'Estimate/Quotation': 'Add Estimate',
    'Proforma Invoice': 'Add Proforma',
    'Payment-In': 'Add Payment',
    'Sale Order': 'Add Sale Order',
    'Delivery Challan': 'Add Challan',
    'Sale Return': 'Add Sale Return',
    'Purchase Bills': 'Add Purchase'
};


const SalesPage = () => {
  // Start with 'Sale Invoices' as the default
  const [activePage, setActivePage] = useState<SalePageType>('Sale Invoices');

  const renderActivePageComponent = () => {
    switch (activePage) {
      case 'Sale Invoices':
        return <SaleInvoicesPage />;
      case 'Estimate/Quotation':
        return <EstimatesPage />;
      // Yahan aap future mein aur pages ke liye case add kar sakte hain
      case 'Proforma Invoice':
        return <ProformaInvoicePage />;
        case 'Payment-In':
        return <PaymentInPage />;
      default:
        // Aisa page jo maujood nahi hai, uske liye ek message dikhayein
        return <div className="text-center p-10">This page has not been created yet.</div>;
    }
  };

  return (
    <SalesLayout activePage={activePage} setActivePage={setActivePage} addButtonLabel={addButtonLabels[activePage]}>
      {renderActivePageComponent()}
    </SalesLayout>
  );
};

export default SalesPage;