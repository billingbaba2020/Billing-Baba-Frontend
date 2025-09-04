// src/app/sales/components/SaleInvoices.tsx
"use client";

import { useState } from 'react';
import FilterBar from '../component/FilterBar';
import SummaryCard from '../component/SummaryCard';
import TransactionsTable from '../component/TransactionsTable';
import { Transaction } from '@/lib/types';

// Mock data for demonstration
const mockTransactions: Transaction[] = [
  {
    id: 1, date: '03/09/2025', invoiceNo: 1, partyName: 'adarsh',
    transactionType: 'Sale', paymentType: 'Cash', amount: 1000, balance: 112
  },
  // Add more mock transactions here if you wish
];

const SaleInvoices = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);

  const handleFilterChange = (filters: any) => {
    console.log("Filters applied:", filters);
    // In a real application, you would filter or refetch your data here
  };

  return (
    <div className="space-y-6">
      <FilterBar onFilterChange={handleFilterChange} />
      
      <div className="grid grid-cols-1 md:grid-cols-4">
        <SummaryCard
          title="Total Sales Amount"
          amount={1000}
          received={888}
          balance={112}
        />
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <TransactionsTable transactions={transactions} />
      </div>
    </div>
  );
};

export default SaleInvoices;