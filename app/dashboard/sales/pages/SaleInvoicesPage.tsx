"use client";

import { useState } from 'react';
import TransactionsTable from '../component/TransactionsTable';
import { Transaction } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight } from 'lucide-react';
import FilterBar from '../component/FilterBar';


const mockTransactions: Transaction[] = [
  {
    id: 1, date: '03/09/2025', invoiceNo: 1, partyName: 'adarsh',
    transactionType: 'Sale', paymentType: 'Cash', amount: 1000, balance: 112
  },
];

const SaleInvoices = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);

  const totalAmount = mockTransactions.reduce((sum, t) => sum + t.amount, 0);
  const totalReceived = 888; 
  const totalBalance = mockTransactions.reduce((sum, t) => sum + t.balance, 0);


  const handleFilterChange = (filters: any) => {
    console.log("Filters applied:", filters);
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
          <CardContent className="p-0 divide-y">
              <div className="p-4 border-b">
                  <FilterBar onFilterChange={handleFilterChange} />
              </div>
              <div className="p-4">
                  <div className="inline-block  p-4 rounded-lg border bg-[var(--accent-orange)]/5 border-purple-200 w-full max-w-sm">
                      <div className="flex justify-between items-start">
                          <div>
                              <p className="text-sm text-gray-600">Total Sales Amount</p>
                              <p className="text-2xl font-bold text-gray-800 mt-1">₹ {totalAmount.toLocaleString('en-IN')}</p>
                          </div>
                          <div className="text-right">
                              <div className="flex items-center gap-1 text-sm font-semibold text-gray-500">
                                  0% <ArrowUpRight className="h-4 w-4" />
                              </div>
                              <p className="text-xs text-gray-500">vs last month</p>
                          </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-purple-200 flex items-center text-sm">
                          <span className="text-gray-600">Received: <span className="font-semibold text-gray-800">₹ {totalReceived.toLocaleString('en-IN')}</span></span>
                          <span className="mx-2 text-gray-300">|</span>
                          <span className="text-gray-600">Balance: <span className="font-semibold text-gray-800">₹ {totalBalance.toLocaleString('en-IN')}</span></span>
                      </div>
                  </div>
              </div>
          </CardContent>
      </Card>
      
      <TransactionsTable transactions={transactions} showToolbar={true} />
    </div>
  );
};

export default SaleInvoices;