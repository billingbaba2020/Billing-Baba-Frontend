"use client";

import { useState } from 'react';
// 1. Framer Motion से motion और AnimatePresence इम्पोर्ट करें
import { motion, AnimatePresence } from 'framer-motion'; 

import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Transaction } from '@/lib/types';
import TransactionTableRow from './TransactionTableRow';
import { Search, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { OptionsModal, ModalOption } from '@/components/dashboard/OptionsModal';

interface TransactionsTableProps {
  transactions: Transaction[];
  showToolbar?: boolean;
}

const modalOptionsConfig: ModalOption[] = [
  { id: 'date', label: 'Date', checked: true },
  { id: 'itemDetails', label: 'Item Details', checked: false },
  { id: 'invoiceNo', label: 'Invoice No.', checked: true },
  { id: 'description', label: 'Description', checked: false },
  { id: 'partyName', label: 'Party Name', checked: true },
  { id: 'paymentStatus', label: 'Payment Status', checked: false },
  { id: 'total', label: 'Total', checked: true },
  { id: 'orderNumber', label: 'Order Number', checked: false },
  { id: 'paymentType', label: 'Payment Type', checked: true },
  { id: 'partyPhoneNo', label: "Party's Phone No.", checked: false },
  { id: 'receivedPaid', label: 'Received/Paid', checked: true },
  { id: 'balanceDue', label: 'Balance Due', checked: true },
];

const XlsIcon = () => (
  <div className="bg-green-600 text-white text-[10px] font-bold rounded-sm px-1.5 py-0.5 leading-none">
    xls
  </div>
);

const TransactionsTable = ({ transactions, showToolbar = false }: TransactionsTableProps) => {
  const [isPrintModalOpen, setPrintModalOpen] = useState(false);
  const [isExcelModalOpen, setExcelModalOpen] = useState(false);
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handlePrintSubmit = (selectedOptions: string[]) => {
    console.log("Selected Print Options:", selectedOptions);
  };

  const handleExcelSubmit = (selectedOptions: string[]) => {
    console.log("Selected Excel Options:", selectedOptions);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {showToolbar && (
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Transactions</h2>
            <div className="flex items-center gap-2">

              {/* 2. AnimatePresence से रैप करें ताकि कंपोनेंट के हटने पर भी एनिमेशन चले */}
              <AnimatePresence mode="wait">
                {isSearchVisible ? (
                  // 3. motion.div का उपयोग करके सर्च इनपुट को एनिमेट करें
                  <motion.div
                    key="search-input"
                    initial={{ opacity: 0, x: 50 }} // प्रारंभिक अवस्था (दाईं ओर और अदृश्य)
                    animate={{ opacity: 1, x: 0 }} // अंतिम अवस्था (जगह पर और दृश्यमान)
                    exit={{ opacity: 0, x: 50 }}    // हटने की अवस्था
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="relative flex items-center"
                  >
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search Date"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="h-10 w-56 rounded-full border-2 border-blue-400 pl-10 pr-4 focus-visible:ring-blue-400 focus-visible:ring-offset-0"
                      autoFocus
                      onBlur={() => setSearchVisible(false)}
                    />
                  </motion.div>
                ) : (
                  // 4. motion.div का उपयोग करके सर्च बटन को एनिमेट करें
                  <motion.div
                    key="search-button"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button variant="ghost" size="icon" onClick={() => setSearchVisible(true)}>
                      <Search className="h-5 w-5 text-gray-600" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <Button variant="ghost" size="icon" onClick={() => setExcelModalOpen(true)}>
                <XlsIcon />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setPrintModalOpen(true)}>
                <Printer className="h-5 w-5 text-gray-600" />
              </Button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Invoice no</TableHead>
                <TableHead>Party Name</TableHead>
                <TableHead>Transaction</TableHead>
                <TableHead>Payment Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Balance</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TransactionTableRow key={transaction.id} transaction={transaction} />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <OptionsModal
        isOpen={isPrintModalOpen}
        onClose={() => setPrintModalOpen(false)}
        title="Select Print Options"
        options={modalOptionsConfig}
        buttonText="Get Print"
        onSubmit={handlePrintSubmit}
      />

      <OptionsModal
        isOpen={isExcelModalOpen}
        onClose={() => setExcelModalOpen(false)}
        title="Select Excel Options"
        options={modalOptionsConfig}
        buttonText="Get Excel"
        onSubmit={handleExcelSubmit}
      />
    </>
  );
};

export default TransactionsTable;