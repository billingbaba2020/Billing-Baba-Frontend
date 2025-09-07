"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Printer, Search, Filter, FileSpreadsheet } from "lucide-react";

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

// Party data ke liye TypeScript type
type Party = {
  id: number;
  partyName: string;
  email: string;
  phoneNo: string;
  receivable: number;
  payable: number;
  creditLimit: number;
};

// Sample data
const sampleData: Party[] = [
  {
    id: 1,
    partyName: "Rohan Sharma",
    email: "rohan.s@example.com",
    phoneNo: "9876543210",
    receivable: 15500,
    payable: 0,
    creditLimit: 50000,
  },
  {
    id: 2,
    partyName: "Priya Mehta",
    email: "priya.m@example.com",
    phoneNo: "9123456780",
    receivable: 8200,
    payable: 500,
    creditLimit: 25000,
  },
  {
    id: 3,
    partyName: "Ankit General Store",
    email: "ankit.gs@example.com",
    phoneNo: "9988776655",
    receivable: 0,
    payable: 12500,
    creditLimit: 100000,
  },
  {
    id: 4,
    partyName: "Kavita Singh",
    email: "kavita.s@example.com",
    phoneNo: "9876501234",
    receivable: 12300,
    payable: 0,
    creditLimit: 75000,
  },
];

export default function AllPartiesPage() {
  const [selectedParties, setSelectedParties] = useState<number[]>([]);

  // Footer ke totals ko dynamically calculate karna
  const totalReceivable = sampleData.reduce(
    (sum, item) => sum + item.receivable,
    0
  );
  const totalPayable = sampleData.reduce((sum, item) => sum + item.payable, 0);

  const handleSelectAll = (checked: boolean | "indeterminate") => {
    if (checked === true) {
      setSelectedParties(sampleData.map((p) => p.id));
    } else {
      setSelectedParties([]);
    }
  };

  const handleSelectParty = (partyId: number, checked: boolean) => {
    if (checked) {
      setSelectedParties((prev) => [...prev, partyId]);
    } else {
      setSelectedParties((prev) => prev.filter((id) => id !== partyId));
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* 1. Main Content Area */}
      <main className="flex-1 p-4 flex flex-col">
        <div className="border rounded-lg h-full w-full flex flex-col bg-white">
          {/* Filters Header */}
          <header className="flex justify-between items-center p-4 border-b">
            <div className="flex items-center gap-6">
              <div className="flex items-center space-x-2">
                <Checkbox id="date-filter" />
                <Label
                  htmlFor="date-filter"
                  className="font-semibold text-gray-700"
                >
                  Date Filter
                </Label>
              </div>
              <Select defaultValue="all-parties">
                <SelectTrigger className="w-48 h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-parties">All parties</SelectItem>
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

          {/* Search Bar */}
          <div className="p-4 border-b relative">
            <Search className="absolute left-7 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input placeholder="" className="pl-10" />
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-[auto_3fr_3fr_2fr_2fr_2fr_2fr] border-b bg-gray-50 items-center">
            <div className="flex items-center gap-2 p-3 w-16">
              <Checkbox
                id="select-all"
                checked={selectedParties.length === sampleData.length}
                onCheckedChange={handleSelectAll}
              />
              <span>#</span>
            </div>
            <TableHeaderCell>Party Name</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Phone No.</TableHeaderCell>
            <TableHeaderCell>Receivable Bal.</TableHeaderCell>
            <TableHeaderCell>Payable Bal.</TableHeaderCell>
            <TableHeaderCell>Credit Limit</TableHeaderCell>
          </div>

          {/* Data Rows / Empty State */}
          <div className="flex-1 overflow-y-auto">
            {sampleData.length > 0 ? (
              sampleData.map((party, index) => (
                <div
                  key={party.id}
                  className="grid grid-cols-[auto_3fr_3fr_2fr_2fr_2fr_2fr] border-b text-sm items-center hover:bg-slate-50"
                >
                  <div className="flex items-center gap-2 p-3 w-16 text-gray-500">
                    <Checkbox
                      id={`select-${party.id}`}
                      checked={selectedParties.includes(party.id)}
                      onCheckedChange={(checked) =>
                        handleSelectParty(party.id, !!checked)
                      }
                    />
                    <span>{index + 1}</span>
                  </div>
                  <div className="p-3 font-medium text-gray-800 border-r">
                    {party.partyName}
                  </div>
                  <div className="p-3 text-gray-600 border-r">
                    {party.email}
                  </div>
                  <div className="p-3 text-gray-600 border-r">
                    {party.phoneNo}
                  </div>
                  <div className="p-3 text-teal-600 border-r">
                    ₹{party.receivable.toFixed(2)}
                  </div>
                  <div className="p-3 text-red-500 border-r">
                    ₹{party.payable.toFixed(2)}
                  </div>
                  <div className="p-3 text-gray-600">
                    ₹{party.creditLimit.toFixed(2)}
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
                  No data is available for All Party.
                </p>
                <p className="text-sm text-gray-400">
                  Please try again after making relevant actions.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 2. Totals Footer */}
      <footer className="flex justify-between p-4 border-t bg-white font-semibold text-sm">
        <div className="text-gray-700">
          Total Receivable:{" "}
          <span className="text-teal-600">₹{totalReceivable.toFixed(2)}</span>
        </div>
        <div className="text-gray-700">
          Total Payable:{" "}
          <span className="text-red-500">₹{totalPayable.toFixed(2)}</span>
        </div>
      </footer>
    </div>
  );
}
