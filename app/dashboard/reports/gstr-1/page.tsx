// app/dashboard/reports/gstr-1/page.tsx
"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calendar as CalendarIcon,
  Printer,
  FileSpreadsheet,
  FileJson,
  ChevronDown,
} from "lucide-react";
import { format } from "date-fns";
import * as XLSX from "xlsx"; 
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Gstr1Data = {
  id: number;
  type: "sale" | "sale-return";
  gstin: string;
  partyName: string;
  invoiceNo: string;
  date: string;
  value: number;
};

const sampleData: Gstr1Data[] = [
  {
    id: 1,
    type: "sale",
    gstin: "27AADCB2345A1Z5",
    partyName: "Krishna Traders",
    invoiceNo: "INV-001",
    date: "15/09/2025",
    value: 265000,
  },
  {
    id: 2,
    type: "sale",
    gstin: "29AABCD1234E1Z1",
    partyName: "Verma Supplies",
    invoiceNo: "INV-002",
    date: "12/09/2025",
    value: 25000,
  },
  {
    id: 3,
    type: "sale",
    gstin: "07AAGCM0123F1Z5",
    partyName: "Gupta & Sons",
    invoiceNo: "INV-003",
    date: "10/09/2025",
    value: 75000,
  },
  {
    id: 4,
    type: "sale-return",
    gstin: "27AADCB2345A1Z5",
    partyName: "Krishna Traders",
    invoiceNo: "SR-001",
    date: "18/09/2025",
    value: 15000,
  },
];

const formatCurrency = (val: number) =>
  val.toLocaleString("en-IN", { style: "currency", currency: "INR" });

export default function Gstr1ReportPage() {
  const [activeTab, setActiveTab] = useState<"sale" | "sale-return">("sale");
  const [fromDate, setFromDate] = useState<Date | undefined>(
    new Date(2025, 8, 1)
  );
  const [toDate, setToDate] = useState<Date | undefined>(new Date(2025, 8, 30));

  const filteredData = useMemo(() => {
    return sampleData.filter((item) => item.type === activeTab);
  }, [activeTab]);

  // ✅ Export Function Fix
  const handleExport = (formatType: "json" | "xls") => {
    const dataToExport = filteredData.map(({ type, id, ...rest }) => rest);

    if (formatType === "json") {
      const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(dataToExport, null, 2)
      )}`;
      const link = document.createElement("a");
      link.href = jsonString;
      link.download = `GSTR1_${activeTab}_report.json`;
      link.click();
    } else if (formatType === "xls") {
      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
      XLSX.writeFile(workbook, `GSTR1_${activeTab}_report.xlsx`);
    }
  };

  // ✅ Print Function Fix
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        {/* Filters Section */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 border rounded-lg bg-gray-50/50">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-48 justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {fromDate
                      ? `From Month/Year ${format(fromDate, "MM/yyyy")}`
                      : ""}
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
            </div>
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-48 justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {toDate ? `To Month/Year ${format(toDate, "MM/yyyy")}` : ""}
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
            <div className="flex items-center space-x-2">
              <Checkbox id="exempted" />
              <Label
                htmlFor="exempted"
                className="text-sm font-medium text-gray-600"
              >
                Consider non-tax as exempted
              </Label>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleExport("json")}
            >
              <FileJson className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleExport("xls")}
            >
              <FileSpreadsheet className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={handlePrint}>
              <Printer className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "sale" | "sale-return")}
        >
          <TabsList className="grid w-full grid-cols-2 sm:w-96">
            <TabsTrigger value="sale">Sale</TabsTrigger>
            <TabsTrigger value="sale-return">Sale Return</TabsTrigger>
          </TabsList>
          <TabsContent value="sale" className="mt-4">
            {renderTable(filteredData)}
          </TabsContent>
          <TabsContent value="sale-return" className="mt-4">
            {renderTable(filteredData)}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

// --- टेबल को रेंडर करने के लिए फंक्शन ---
const renderTable = (data: Gstr1Data[]) => (
  <div className="border rounded-md">
    <Table>
      <TableHeader className="bg-gray-100">
        <TableRow>
          <TableHead rowSpan={2} className="align-middle">
            GSTIN/UIN
          </TableHead>
          <TableHead rowSpan={2} className="align-middle">
            Party Name
          </TableHead>
          <TableHead colSpan={3} className="text-center">
            Invoice Details
          </TableHead>
        </TableRow>
        <TableRow>
          <TableHead>
            <div className="flex items-center">
              Invoice No. <ChevronDown className="h-3 w-3 ml-1" />
            </div>
          </TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length > 0 ? (
          data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.gstin}</TableCell>
              <TableCell className="font-medium">{item.partyName}</TableCell>
              <TableCell>{item.invoiceNo}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>{formatCurrency(item.value)}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={5}
              className="h-48 text-center text-muted-foreground"
            >
              No data to display.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </div>
);
