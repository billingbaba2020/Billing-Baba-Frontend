"use client";

import * as React from "react";
import { useState, useMemo, useEffect } from "react";
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
// xlsx ko dynamically import karenge taaki SSR bundling issues na aaye

// Table Header ke liye ek reusable component
const TableHeaderCell = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`flex items-center gap-2 p-3 text-xs font-bold text-gray-500 uppercase ${className}`}
  >
    <span>{children}</span>
    <Filter className="w-3 h-3 text-gray-400 cursor-pointer" />
  </div>
);

// HSN data ke liye TypeScript type
type HSNData = {
  id: number;
  hsn: string;
  totalValue: number;
  taxableValue: number;
  igst: number;
  cgst: number;
  sgst: number;
  cess: number;
};

// Sample data
const sampleData: HSNData[] = [
  {
    id: 1,
    hsn: "851712",
    totalValue: 250000,
    taxableValue: 211864.41,
    igst: 38135.59,
    cgst: 0,
    sgst: 0,
    cess: 0,
  },
  {
    id: 2,
    hsn: "480256",
    totalValue: 25000,
    taxableValue: 22321.43,
    igst: 0,
    cgst: 1339.29,
    sgst: 1339.29,
    cess: 0,
  },
  {
    id: 3,
    hsn: "847160",
    totalValue: 75000,
    taxableValue: 63559.32,
    igst: 11440.68,
    cgst: 0,
    sgst: 0,
    cess: 0,
  },
  {
    id: 4,
    hsn: "392690",
    totalValue: 15000,
    taxableValue: 12711.86,
    igst: 0,
    cgst: 1144.07,
    sgst: 1144.07,
    cess: 0,
  },
];

export default function SaleSummaryByHSNPage() {
  const [fromDate, setFromDate] = useState<Date | undefined>(
    new Date("2025-09-01")
  );
  const [toDate, setToDate] = useState<Date | undefined>(
    new Date("2025-09-30")
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<HSNData[]>(sampleData);

  // Search filter ka logic
  useEffect(() => {
    const results = sampleData.filter((item) =>
      item.hsn.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(results);
  }, [searchTerm]);

  // Footer ke totals ko dynamically calculate karna
  const { totalValue, totalItems } = useMemo(() => {
    const totalValue = filteredData.reduce(
      (sum, item) => sum + item.totalValue,
      0
    );
    return { totalValue, totalItems: filteredData.length };
  }, [filteredData]);

  // Excel export function
  const handleExportExcel = async () => {
    const xlsx: any = await import("xlsx");
    const { utils } = xlsx;
    const worksheet = utils.json_to_sheet(filteredData);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "HSN_Summary");
    xlsx.writeFile(workbook, "SaleSummaryByHSN.xlsx");
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <main className="flex-1 p-4 flex flex-col">
        <header className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <Select defaultValue="this-month">
              <SelectTrigger className="w-48 h-10 font-semibold text-lg bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="this-month">This Month</SelectItem>
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
            <Select defaultValue="all-firms">
              <SelectTrigger className="w-[180px] h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-firms">ALL FIRM</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-9 h-9 bg-white"
              onClick={handleExportExcel}
            >
              <FileSpreadsheet className="w-4 h-4 text-green-600" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-9 h-9 bg-white"
              onClick={() => window.print()}
            >
              <Printer className="w-4 h-4" />
            </Button>
          </div>
        </header>

        <div className="border rounded-lg h-full w-full flex flex-col bg-white">
          <div className="p-4 border-b relative">
            <Search className="absolute left-7 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder=""
              className="pl-10 max-w-sm"
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchTerm(e.target.value)
              }
            />
          </div>

          <div className="grid grid-cols-[auto_1.5fr_1.5fr_1.5fr_1fr_1fr_1fr_1fr] border-b bg-gray-50 items-center">
            <TableHeaderCell className="w-16">#</TableHeaderCell>
            <TableHeaderCell>HSN</TableHeaderCell>
            <TableHeaderCell>Total Value</TableHeaderCell>
            <TableHeaderCell>Taxable Value</TableHeaderCell>
            <TableHeaderCell>IGST Amount</TableHeaderCell>
            <TableHeaderCell>CGST Amount</TableHeaderCell>
            <TableHeaderCell>SGST Amount</TableHeaderCell>
            <TableHeaderCell>Add. Cess</TableHeaderCell>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[auto_1.5fr_1.5fr_1.5fr_1fr_1fr_1fr_1fr] border-b text-sm items-center hover:bg-slate-50"
                >
                  <div className="p-3 text-center text-gray-500 w-16">
                    {index + 1}
                  </div>
                  <div className="p-3 font-medium text-gray-800 border-r">
                    {item.hsn}
                  </div>
                  <div className="p-3 text-gray-600 border-r">
                    ₹{item.totalValue.toFixed(2)}
                  </div>
                  <div className="p-3 text-gray-600 border-r">
                    ₹{item.taxableValue.toFixed(2)}
                  </div>
                  <div className="p-3 text-gray-600 border-r">
                    ₹{item.igst.toFixed(2)}
                  </div>
                  <div className="p-3 text-gray-600 border-r">
                    ₹{item.cgst.toFixed(2)}
                  </div>
                  <div className="p-3 text-gray-600 border-r">
                    ₹{item.sgst.toFixed(2)}
                  </div>
                  <div className="p-3 text-gray-600">
                    ₹{item.cess.toFixed(2)}
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
                  No data is available for Sale Summary by HSN.
                </p>
                <p className="text-sm text-gray-400">
                  Please try again after making relevant changes.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="flex justify-between p-4 border-t bg-white font-semibold text-sm">
        <div className="text-gray-700">
          Total Value:{" "}
          <span className="text-teal-600">₹{totalValue.toFixed(2)}</span>
        </div>
        <div className="text-gray-700">
          Total Items: <span className="text-gray-900">{totalItems}</span>
        </div>
      </footer>
    </div>
  );
}
