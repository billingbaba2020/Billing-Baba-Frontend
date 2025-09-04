"use client";

import { useState } from 'react';
import SalesLayout from './component/SalesLayout';
import SaleInvoicesPage from './pages/SaleInvoicesPage';
import EstimatesPage from './pages/EstimatesPage';

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
      // case 'Proforma Invoice':
      //   return <ProformaInvoicePage />;
      default:
        // Aisa page jo maujood nahi hai, uske liye ek message dikhayein
        return <div className="text-center p-10">This page has not been created yet.</div>;
    }
  };

  return (
    <SalesLayout activePage={activePage} setActivePage={setActivePage}>
      {renderActivePageComponent()}
    </SalesLayout>
  );
};

export default SalesPage;