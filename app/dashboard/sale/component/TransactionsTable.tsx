// src/app/sales/components/TransactionsTable.tsx
import { Search, BarChart2, Printer, Download } from 'lucide-react';
import { Transaction } from '@/lib/types';
import TransactionTableRow from './TransactionTableRow';

interface TransactionsTableProps {
  transactions: Transaction[];
}

const TransactionsTable = ({ transactions }: TransactionsTableProps) => {
  const headers = ['DATE', 'INVOICE NO', 'PARTY NAME', 'TRANSACTION', 'PAYMENT TYPE', 'AMOUNT', 'BALANCE', 'ACTIONS'];

  return (
    <div>
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="text-lg font-semibold text-gray-700">Transactions</h3>
        <div className="flex items-center gap-4 text-gray-500">
          <button className="hover:text-gray-800"><Search size={20} /></button>
          <button className="hover:text-gray-800"><BarChart2 size={20} /></button>
          <button className="hover:text-gray-800"><Printer size={20} /></button>
          <button className="hover:text-gray-800"><Download size={20} /></button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-600 uppercase bg-gray-50">
            <tr>
              {headers.map(header => (
                <th key={header} scope="col" className="p-3 font-medium tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions.map(tx => (
              <TransactionTableRow key={tx.id} transaction={tx} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsTable;