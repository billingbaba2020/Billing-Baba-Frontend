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
import Image from "next/image";
import {
  Printer,
  Search,
  Filter,
  FileSpreadsheet,
  Calendar as CalendarIcon,
} from "lucide-react";

// Table Header ke liye ek reusable component
const TableHeaderCell = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`flex items-center gap-2 p-3 text-xs font-bold text-gray-500 uppercase border-r last:border-r-0 ${className}`}
  >
    <span>{children}</span>
    <Filter className="w-3 h-3 text-gray-400 cursor-pointer" />
  </div>
);

// Data ke liye TypeScript type
type PartyProfitData = {
  id: number;
  partyName: string;
  phoneNo: string;
  totalSaleAmount: number;
  profitOrLoss: number;
};

// Sample data
const sampleData: PartyProfitData[] = [
  {
    id: 1,
    partyName: "Rohan Sharma",
    phoneNo: "9876543210",
    totalSaleAmount: 15500,
    profitOrLoss: 3200,
  },
  {
    id: 2,
    partyName: "Priya Mehta",
    phoneNo: "9123456780",
    totalSaleAmount: 8200,
    profitOrLoss: 950,
  },
  {
    id: 3,
    partyName: "Ankit General Store",
    phoneNo: "9988776655",
    totalSaleAmount: 25000,
    profitOrLoss: -1500,
  }, // Loss example
  {
    id: 4,
    partyName: "Kavita Singh",
    phoneNo: "9876501234",
    totalSaleAmount: 12300,
    profitOrLoss: 2800,
  },
];

export default function PartyWiseProfitLossPage() {
  const [fromDate, setFromDate] = useState<Date | undefined>(
    new Date("2025-09-01")
  );
  const [toDate, setToDate] = useState<Date | undefined>(
    new Date("2025-09-30")
  );

  // Footer ke totals ko dynamically calculate karna
  const totalSaleAmount = sampleData.reduce(
    (sum, item) => sum + item.totalSaleAmount,
    0
  );
  const totalProfit = sampleData.reduce(
    (sum, item) => sum + item.profitOrLoss,
    0
  );

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* 1. Main Content Area */}
      <main className="flex-1 p-4 flex flex-col">
        {/* Filters Header */}
        <header className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <Select defaultValue="this-month">
              <SelectTrigger className="w-48 h-10 font-semibold text-lg bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center p-1 border rounded-md bg-white">
              <span className="text-sm text-gray-500 px-2 bg-gray-200 py-1 rounded-sm font-semibold">
                Between
              </span>
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

        <div className="border rounded-lg h-full w-full flex flex-col bg-white">
          {/* Secondary Filters & Search */}
          <div className="p-4 border-b grid grid-cols-2 gap-4">
            <Select defaultValue="all-parties">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-parties">All Parties</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input placeholder="" className="pl-10" />
            </div>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-[auto_3fr_2fr_2fr_2fr] border-b bg-gray-50">
            <TableHeaderCell className="w-16">#</TableHeaderCell>
            <TableHeaderCell>Party Name</TableHeaderCell>
            <TableHeaderCell>Phone No.</TableHeaderCell>
            <TableHeaderCell>Total Sale Amount</TableHeaderCell>
            <TableHeaderCell>Profit(+) / Loss(-)</TableHeaderCell>
          </div>

          {/* Data Rows / Empty State */}
          <div className="flex-1 overflow-y-auto">
            {sampleData.length > 0 ? (
              sampleData.map((item, index) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[auto_3fr_2fr_2fr_2fr] border-b text-sm items-center"
                >
                  <div className="p-3 text-center text-gray-500 w-16">
                    {index + 1}
                  </div>
                  <div className="p-3 font-medium text-gray-800 border-r">
                    {item.partyName}
                  </div>
                  <div className="p-3 text-gray-600 border-r">
                    {item.phoneNo}
                  </div>
                  <div className="p-3 text-gray-600 border-r">
                    ₹{item.totalSaleAmount.toFixed(2)}
                  </div>
                  <div
                    className={`p-3 font-semibold ${item.profitOrLoss >= 0 ? "text-teal-600" : "text-red-500"}`}
                  >
                    ₹{item.profitOrLoss.toFixed(2)}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center h-full text-center">
                <Image
                  src="https://i.imgur.com/G9fC478.png"
                  width={100}
                  height={100}
                  alt="No Data"
                  className="opacity-60 mb-4"
                />
                <p className="text-gray-500">
                  No data is available for Party Wise Profit & Loss.
                </p>
                <p className="text-sm text-gray-400">
                  Please try again after making relevant changes.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 2. Totals Footer */}
      <footer className="flex justify-between p-4 border-t bg-white font-semibold text-sm">
        <div className="text-gray-700">
          Total Sale Amount:{" "}
          <span className="text-gray-900">₹{totalSaleAmount.toFixed(2)}</span>
        </div>
        <div className="text-gray-700">
          Total Profit(+) / Loss (-):
          <span
            className={`font-semibold ${totalProfit >= 0 ? "text-teal-600" : "text-red-500"}`}
          >
            ₹{totalProfit.toFixed(2)}
          </span>
        </div>
      </footer>
    </div>
  );
}
