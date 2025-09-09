// app/dashboard/reports/gstr-2/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
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
  ChevronDown,
} from "lucide-react";
import { format } from "date-fns"; 

type Gstr2Data = {
  id: number;
  gstin: string;
  partyName: string;
  billNo: string;
  date: string;
  value: number;
};

const sampleData: Gstr2Data[] = [
  {
    id: 1,
    gstin: "29AABCD1234E1Z1",
    partyName: "Verma Supplies",
    billNo: "BILL-A45",
    date: "14/09/2025",
    value: 495000,
  },
  {
    id: 2,
    gstin: "07AAGCM0123F1Z5",
    partyName: "Gupta & Sons",
    billNo: "BILL-B12",
    date: "11/09/2025",
    value: 120000,
  },
  {
    id: 3,
    gstin: "27AADCB2345A1Z5",
    partyName: "Krishna Traders",
    billNo: "BILL-C89",
    date: "08/09/2025",
    value: 30000,
  },
  {
    id: 4,
    gstin: "36AAFCE1111A1Z0",
    partyName: "Global Enterprises",
    billNo: "BILL-D33",
    date: "05/09/2025",
    value: 85000,
  },
];

const formatCurrency = (val: number) =>
  val.toLocaleString("en-IN", { style: "currency", currency: "INR" });

export default function Gstr2ReportPage() {
  const [data] = useState<Gstr2Data[]>(sampleData);
  const [fromDate, setFromDate] = useState<Date | undefined>(
    new Date(2025, 8, 1)
  );
  const [toDate, setToDate] = useState<Date | undefined>(new Date(2025, 8, 30));

  const handleExportXls = async () => {
    try {
      const XLSX = await import("xlsx") as any;
      const dataToExport = data.map(({ id, ...rest }) => rest); 
      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "GSTR2_Report");
      XLSX.writeFile(workbook, "GSTR2_Report.xlsx");
    } catch (error) {
      console.error("Error exporting to Excel:", error);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        {/* Filters Section */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
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
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleExportXls}
              className="bg-green-100 text-green-700 hover:bg-green-200"
            >
              <span className="text-xs font-bold">xls</span>
            </Button>
            <Button variant="outline" size="icon" onClick={handlePrint}>
              <Printer className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Report Title & Checkbox */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg font-semibold">GSTR2 REPORT</h2>
          <div className="flex items-center space-x-2">
            <Checkbox id="exempted" />
            <Label
              htmlFor="exempted"
              className="text-sm font-medium text-gray-600"
            >
              CONSIDER NON-TAX AS EXEMPTED
            </Label>
          </div>
        </div>

        {/* Table Section */}
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
                <TableHead colSpan={3} className="text-center font-semibold">
                  Bill Details
                </TableHead>
              </TableRow>
              <TableRow>
                <TableHead>
                  <div className="flex items-center">
                    No. <ChevronDown className="h-3 w-3 ml-1" />
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
                    <TableCell className="font-medium">
                      {item.partyName}
                    </TableCell>
                    <TableCell>{item.billNo}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{formatCurrency(item.value)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-64 text-center text-muted-foreground"
                  >
                    No data to display.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
