"use client";

import * as React from "react";
import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Printer,
  Search,
  Filter,
  FileSpreadsheet,
  Calendar as CalendarIcon,
  Share2,
} from "lucide-react";

// Table Header ke liye ek chhota sa reusable component
const TableHeaderCell = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-2 p-2.5 text-xs font-bold text-gray-600 uppercase border-r last:border-r-0">
    <span>{children}</span>
    <Filter className="w-3 h-3 text-gray-400 cursor-pointer" />
  </div>
);

// Transaction data ke liye TypeScript type
type Transaction = {
  id: number;
  date: Date;
  refNo: string;
  name: string;
  category: string;
  type: "Sale" | "Purchase" | "Expense";
  cashIn: number;
  cashOut: number;
};

const openingCashInHand = 15000.0;

// Sample data jo table mein dikhega
const sampleData: Transaction[] = [
  {
    id: 1,
    date: new Date("2025-09-02"),
    refNo: "INV-001",
    name: "Rohan Sharma",
    category: "Product Sale",
    type: "Sale",
    cashIn: 5000,
    cashOut: 0,
  },
  {
    id: 2,
    date: new Date("2025-09-03"),
    refNo: "PUR-102",
    name: "Aditya Verma (Supplier)",
    category: "Stock Purchase",
    type: "Purchase",
    cashIn: 0,
    cashOut: 2500,
  },
  {
    id: 3,
    date: new Date("2025-09-04"),
    refNo: "EXP-004",
    name: "Office Rent",
    category: "Operating Expense",
    type: "Expense",
    cashIn: 0,
    cashOut: 8000,
  },
  {
    id: 4,
    date: new Date("2025-09-05"),
    refNo: "INV-002",
    name: "Kavita Singh",
    category: "Service Sale",
    type: "Sale",
    cashIn: 3200,
    cashOut: 0,
  },
];

export default function CashFlowPage() {
  const [fromDate, setFromDate] = useState<Date | undefined>(
    new Date("2025-09-01")
  );
  const [toDate, setToDate] = useState<Date | undefined>(
    new Date("2025-09-30")
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  // Footer ke totals ko dynamically calculate karna
  const totalCashIn = sampleData.reduce((sum, tx) => sum + tx.cashIn, 0);
  const totalCashOut = sampleData.reduce((sum, tx) => sum + tx.cashOut, 0);
  const closingCashInHand = openingCashInHand + totalCashIn - totalCashOut;

  // Row par click karne ka function
  const handleRowClick = (tx: Transaction) => {
    setSelectedTx(tx);
    setIsModalOpen(true);
  };

  let runningBalance = openingCashInHand;

  return (
    <div className="flex flex-col h-full bg-white">
      {/* 1. Filters and Actions Header */}
      <header className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center gap-4">
          <Select defaultValue="this-month">
            <SelectTrigger className="w-[180px] h-10 font-semibold text-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center p-1 border rounded-md">
            <span className="text-sm text-gray-500 px-2">Between</span>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"ghost"}
                  className="w-[140px] justify-start text-left font-normal p-1 h-auto"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {fromDate ? (
                    format(fromDate, "dd/MM/yyyy")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={fromDate}
                  onSelect={setFromDate}
                />
              </PopoverContent>
            </Popover>
            <span className="text-sm text-gray-500">To</span>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"ghost"}
                  className="w-[140px] justify-start text-left font-normal p-1 h-auto"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {toDate ? (
                    format(toDate, "dd/MM/yyyy")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={toDate}
                  onSelect={setToDate}
                />
              </PopoverContent>
            </Popover>
          </div>
          <Select defaultValue="all-firms">
            <SelectTrigger className="w-[180px] h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-firms">ALL FIRMS</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-6">
          <Button
            variant="ghost"
            className="flex flex-col items-center h-auto p-0 text-xs text-gray-600 gap-1 font-normal"
          >
            <FileSpreadsheet className="w-6 h-6 text-blue-700" />
            <span>Excel Report</span>
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col items-center h-auto p-0 text-xs text-gray-600 gap-1 font-normal"
          >
            <Printer className="w-6 h-6 text-gray-700" />
            <span>Print</span>
          </Button>
        </div>
      </header>

      {/* 2. Main Content Area */}
      <main className="flex-1 p-4 flex flex-col">
        <div className="flex items-center gap-6 mb-4">
          <p className="text-sm">
            Opening Cash-in Hand:{" "}
            <span className="font-semibold text-teal-600">
              ₹{openingCashInHand.toFixed(2)}
            </span>
          </p>
          <div className="flex items-center space-x-2">
            <Checkbox id="show-zero" />
            <Label
              htmlFor="show-zero"
              className="text-sm font-normal text-gray-600"
            >
              Show zero amount transaction
            </Label>
          </div>
        </div>
        <div className="border rounded-lg h-full w-full flex flex-col">
          <div className="p-2 border-b relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input placeholder="" className="pl-10" />
          </div>
          <div className="grid grid-cols-[1.5fr_1fr_2fr_1.5fr_1fr_1fr_1fr_1.5fr_1fr] border-b bg-gray-50">
            <TableHeaderCell>Date</TableHeaderCell>
            <TableHeaderCell>Ref No.</TableHeaderCell>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Category</TableHeaderCell>
            <TableHeaderCell>Type</TableHeaderCell>
            <TableHeaderCell>Cash In</TableHeaderCell>
            <TableHeaderCell>Cash Out</TableHeaderCell>
            <TableHeaderCell>Running Balance</TableHeaderCell>
            <TableHeaderCell>Print / Share</TableHeaderCell>
          </div>
          <div className="flex-1 overflow-y-auto">
            {sampleData.length > 0 ? (
              sampleData.map((tx) => {
                runningBalance = runningBalance + tx.cashIn - tx.cashOut;
                return (
                  <div
                    key={tx.id}
                    onClick={() => handleRowClick(tx)}
                    className="grid grid-cols-[1.5fr_1fr_2fr_1.5fr_1fr_1fr_1fr_1.5fr_1fr] border-b text-sm items-center cursor-pointer hover:bg-slate-50"
                  >
                    <div className="p-2.5 text-gray-700">
                      {format(tx.date, "dd/MM/yyyy")}
                    </div>
                    <div className="p-2.5 text-gray-600">{tx.refNo}</div>
                    <div className="p-2.5 font-medium text-gray-800">
                      {tx.name}
                    </div>
                    <div className="p-2.5 text-gray-600">{tx.category}</div>
                    <div className="p-2.5 text-gray-600">{tx.type}</div>
                    <div className="p-2.5 text-teal-600">
                      {tx.cashIn > 0 ? `₹${tx.cashIn.toFixed(2)}` : "-"}
                    </div>
                    <div className="p-2.5 text-red-500">
                      {tx.cashOut > 0 ? `₹${tx.cashOut.toFixed(2)}` : "-"}
                    </div>
                    <div className="p-2.5 font-semibold text-gray-800">
                      ₹{runningBalance.toFixed(2)}
                    </div>
                    <div className="p-2.5 flex items-center gap-3">
                      <Button variant="ghost" size="icon" className="w-8 h-8">
                        <Printer className="w-4 h-4 text-gray-500" />
                      </Button>
                      <Button variant="ghost" size="icon" className="w-8 h-8">
                        <Share2 className="w-4 h-4 text-gray-500" />
                      </Button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex-1 flex items-center justify-center h-full">
                <p className="text-gray-500">No transactions to show</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 3. Totals Footer */}
      <footer className="grid grid-cols-3 p-4 border-t bg-white font-semibold">
        <div className="text-teal-600">
          Total Cash-in: ₹{totalCashIn.toFixed(2)}
        </div>
        <div className="text-red-500 text-center">
          Total Cash-out: ₹{totalCashOut.toFixed(2)}
        </div>
        <div className="text-teal-600 text-right">
          Closing Cash-in Hand: ₹{closingCashInHand.toFixed(2)}
        </div>
      </footer>

      {/* Transaction Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription>
              Details for transaction Ref No: {selectedTx?.refNo}
            </DialogDescription>
          </DialogHeader>
          {selectedTx && (
            <div className="mt-4 space-y-2 text-sm">
              <p>
                <strong>Name:</strong> {selectedTx.name}
              </p>
              <p>
                <strong>Date:</strong> {format(selectedTx.date, "PPP")}
              </p>
              <p>
                <strong>Category:</strong> {selectedTx.category}
              </p>
              <p>
                <strong>Type:</strong> {selectedTx.type}
              </p>
              <p>
                <strong>Cash In:</strong>{" "}
                <span className="text-teal-600 font-semibold">
                  ₹{selectedTx.cashIn.toFixed(2)}
                </span>
              </p>
              <p>
                <strong>Cash Out:</strong>{" "}
                <span className="text-red-500 font-semibold">
                  ₹{selectedTx.cashOut.toFixed(2)}
                </span>
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
