// app/dashboard/reports/profit-and-loss/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Calendar as CalendarIcon,
  Printer,
  FileText,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { format } from "date-fns";

const vyaparData = [
  { label: "Sale (+)", amount: 0.0, color: "green" },
  { label: "Credit Note (-)", amount: 0.0, color: "red", bg: true },
  { label: "Sale FA (+)", amount: 0.0, color: "green" },
  { label: "Purchase (-)", amount: 0.0, color: "red", bg: true },
  { label: "Debit Note (+)", amount: 0.0, color: "green" },
  { label: "Purchase FA (-)", amount: 0.0, color: "red", bg: true },
  { label: "Direct Expenses(-)", isHeader: true },
  { label: "Other Direct Expenses (-)", amount: 0.0, color: "red" },
  { label: "Payment-in Discount (-)", amount: 0.0, color: "red" },
  { label: "Tax Payable", isHeader: true },
  { label: "GST Payable (-)", amount: 0.0, color: "red" },
  { label: "TCS Payable (-)", amount: 0.0, color: "red" },
];

const accountingData = [
  {
    id: "incomes",
    title: "Incomes",
    children: [
      {
        id: "sale-accounts",
        title: "Sale Accounts",
        amount: 0.0,
        color: "green",
        children: [],
      },
      {
        id: "other-incomes-direct",
        title: "Other Incomes (Direct)",
        amount: 0.0,
        color: "green",
        children: [],
      },
      {
        id: "other-incomes-indirect",
        title: "Other Incomes (Indirect)",
        amount: 0.0,
        color: "green",
        children: [],
      },
    ],
  },
  {
    id: "expenses",
    title: "Expenses",
    children: [
      {
        id: "cogs",
        title: "Cost of Goods Sold",
        children: [
          {
            id: "purchase-accounts",
            title: "Purchase Accounts",
            amount: 0.0,
            color: "red",
            children: [
              {
                id: "opening-stock",
                title: "Opening Stock",
                amount: 0.0,
                color: "red",
                isLeaf: true,
              },
              {
                id: "closing-stock",
                title: "Closing Stock",
                amount: 0.0,
                color: "red",
                isLeaf: true,
              },
            ],
          },
        ],
      },
    ],
  },
];

// करेंसी फॉर्मेट करने के लिए हेल्पर
const formatCurrency = (amount: number) => `₹ ${amount.toFixed(2)}`;

export default function ProfitAndLossPage() {
  const [view, setView] = useState<"vyapar" | "accounting">("vyapar");
  const [fromDate, setFromDate] = useState<Date | undefined>(
    new Date(2025, 8, 1)
  );
  const [toDate, setToDate] = useState<Date | undefined>(new Date(2025, 8, 6));

  const renderAccountingNode = (nodes: any[]) => {
    return nodes.map((node) => {
      if (!node.children || node.children.length === 0) {
        return (
          <div
            key={node.id}
            className="flex justify-between items-center py-2 px-4 pl-12"
          >
            <span className="flex items-center">
              {node.isLeaf && <span className="mr-2 text-gray-500">•</span>}
              {node.title}
            </span>
            <span
              className={`font-semibold ${node.color === "red" ? "text-red-500" : "text-green-600"}`}
            >
              {formatCurrency(node.amount)}
            </span>
          </div>
        );
      }
      return (
        <AccordionItem value={node.id} key={node.id} className="border-b-0">
          <AccordionTrigger className="hover:no-underline py-2 px-4">
            <div className="flex justify-between items-center w-full">
              <span className="font-semibold">{node.title}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-0 pl-4">
            {renderAccountingNode(node.children)}
          </AccordionContent>
        </AccordionItem>
      );
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Filter Bar */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-md">
          <span className="text-sm font-medium text-gray-600">From:</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="w-36 justify-start text-left font-normal"
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
          <span className="text-sm font-medium text-gray-600">To:</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="w-36 justify-start text-left font-normal"
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
              <Calendar mode="single" selected={toDate} onSelect={setToDate} />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <FileText className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon">
            <Printer className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Report Card */}
      <Card>
        <CardHeader className="border-b p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">PROFIT AND LOSS REPORT</h2>
              <div className="flex items-center gap-4 mt-2">
                <Label>View :</Label>
                <RadioGroup
                  defaultValue="vyapar"
                  value={view}
                  onValueChange={(value) => setView(value as any)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="vyapar" id="vyapar" />
                    <Label htmlFor="vyapar">Vyapar</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="accounting" id="accounting" />
                    <Label htmlFor="accounting">Accounting</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            {view === "accounting" && (
              <Button variant="link" className="text-blue-600">
                <ChevronDown className="h-4 w-4 mr-1" /> Expand all accounts
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {/* Table Header */}
          <div className="flex justify-between items-center p-4 bg-gray-50 font-semibold text-sm text-gray-600">
            <span>Particulars</span>
            <span>Amount</span>
          </div>

          {/* Conditional View Rendering */}
          {view === "vyapar" ? (
            // --- Vyapar View ---
            <div className="divide-y">
              {vyaparData.map((item, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center p-4 ${item.bg ? "bg-gray-50" : ""}`}
                >
                  <span className={item.isHeader ? "font-bold" : ""}>
                    {item.label}
                  </span>
                  {!item.isHeader && (
                    <span
                      className={`font-semibold ${item.color === "red" ? "text-red-500" : "text-green-600"}`}
                    >
                      {formatCurrency(item.amount as number)}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            // --- Accounting View ---
            <Accordion type="multiple" className="w-full">
              {renderAccountingNode(accountingData)}
            </Accordion>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
