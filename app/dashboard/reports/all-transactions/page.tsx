// app/dashboard/reports/all-transactions/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  Printer,
  Search,
  Filter,
  FileText,
  MoreVertical,
} from "lucide-react";

type Transaction = {
  id: string;
  date: string;
  refNo: string;
  partyName: string;
  category: string;
  type: "Sale" | "Purchase" | "Payment In";
  total: number;
  received: number;
  balance: number;
};

const sampleTransactions: Transaction[] = [
  {
    id: "1",
    date: "15/09/2025",
    refNo: "INV-001",
    partyName: "Krishna Traders",
    category: "Electronics",
    type: "Sale",
    total: 15000,
    received: 10000,
    balance: 5000,
  },
  {
    id: "2",
    date: "14/09/2025",
    refNo: "BILL-A45",
    partyName: "Verma Supplies",
    category: "Stationery",
    type: "Purchase",
    total: 3200,
    received: 3200,
    balance: 0,
  },
  {
    id: "3",
    date: "12/09/2025",
    refNo: "REC-05",
    partyName: "Krishna Traders",
    category: "N/A",
    type: "Payment In",
    total: 0,
    received: 5000,
    balance: 0,
  },
  {
    id: "4",
    date: "10/09/2025",
    refNo: "INV-002",
    partyName: "Gupta & Sons",
    category: "Hardware",
    type: "Sale",
    total: 8500,
    received: 8500,
    balance: 0,
  },
];

const EmptyStateIcon = () => (
  <svg
    width="100"
    height="100"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-gray-300"
  >
    <path
      d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="#f1f5f9"
    />
    <path
      d="M14 2V8H20"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 13H8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M16 17H8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M10 9H8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M18 13H16.5"
      stroke="#4a90e2"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export default function AllTransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const loadData = () => setTransactions(sampleTransactions);
  const clearData = () => setTransactions([]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button onClick={loadData}>Load Sample Data</Button>
        <Button variant="outline" onClick={clearData}>
          Show Empty State
        </Button>
      </div>

      {/* Filters Card */}
      <Card>
        <CardHeader className="p-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-xl font-bold p-1">
                    This Month <ChevronDown className="w-5 h-5 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Today</DropdownMenuItem>
                  <DropdownMenuItem>This Week</DropdownMenuItem>
                  <DropdownMenuItem>This Month</DropdownMenuItem>
                  <DropdownMenuItem>This Year</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="flex items-center gap-2 rounded-md border p-1 text-sm bg-gray-100 dark:bg-gray-800">
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-white dark:bg-gray-700"
                >
                  Between
                </Button>
                <Input
                  type="text"
                  defaultValue="01/09/2025"
                  className="w-28 h-8 border-none bg-transparent"
                />
                <span>To</span>
                <Input
                  type="text"
                  defaultValue="30/09/2025"
                  className="w-28 h-8 border-none bg-transparent"
                />
              </div>
              <Select defaultValue="all-firms">
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-firms">ALL FIRMS</SelectItem>
                  <SelectItem value="firm-1">Firm 1</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-muted-foreground"
              >
                <FileText className="w-5 h-5" /> Excel Report
              </Button>
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-muted-foreground"
              >
                <Printer className="w-5 h-5" /> Print
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Table Card */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <Select defaultValue="all">
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Transaction</SelectItem>
                <SelectItem value="sale">Sale</SelectItem>
                <SelectItem value="purchase">Purchase</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-9" />
            </div>
          </div>

          <div className="border rounded-md">
            <Table>
              <TableHeader className="bg-gray-50 dark:bg-gray-800">
                <TableRow>
                  <TableHead className="w-10">#</TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      DATE <Filter className="h-3 w-3 ml-1" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      REF NO. <Filter className="h-3 w-3 ml-1" />
                    </div>
                  </TableHead>
                  <TableHead>PARTY NAME</TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      CATEGORY <Filter className="h-3 w-3 ml-1" />
                    </div>
                  </TableHead>
                  <TableHead>TYPE</TableHead>
                  <TableHead className="text-right">
                    <div className="flex items-center justify-end">
                      TOTAL <Filter className="h-3 w-3 ml-1" />
                    </div>
                  </TableHead>
                  <TableHead className="text-right">
                    <div className="flex items-center justify-end">
                      RECEIVED <Filter className="h-3 w-3 ml-1" />
                    </div>
                  </TableHead>
                  <TableHead className="text-right">
                    <div className="flex items-center justify-end">
                      BALANCE <Filter className="h-3 w-3 ml-1" />
                    </div>
                  </TableHead>
                  <TableHead>PRINT ...</TableHead>
                </TableRow>
              </TableHeader>
              {transactions.length === 0 ? (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={10}>
                      <div className="flex flex-col items-center justify-center text-center py-20">
                        <EmptyStateIcon />
                        <p className="mt-4 font-semibold text-gray-700 dark:text-gray-300">
                          No data is available for All Transaction.
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Please try again after making relevant changes.
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <TableBody>
                  {transactions.map((tx, index) => (
                    <TableRow key={tx.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{tx.date}</TableCell>
                      <TableCell>{tx.refNo}</TableCell>
                      <TableCell className="font-medium">
                        {tx.partyName}
                      </TableCell>
                      <TableCell>{tx.category}</TableCell>
                      <TableCell>{tx.type}</TableCell>
                      <TableCell className="text-right">
                        {tx.total.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        {tx.received.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right font-semibold text-red-600">
                        {tx.balance.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
