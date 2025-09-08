// app/dashboard/reports/stock-detail/page.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calendar as CalendarIcon,
  Printer,
  FileSpreadsheet,
} from "lucide-react";
import { format } from "date-fns";
// xlsx ko dynamically import karenge taaki SSR bundling issues na aaye

// --- डेटा की संरचना ---
type StockDetailData = {
  id: number;
  itemName: string;
  category: string;
  beginningQty: number;
  qtyIn: number;
  purchaseAmount: number;
  qtyOut: number;
  saleAmount: number;
};

// --- सैंपल डेटा ---
const sampleData: StockDetailData[] = [
  {
    id: 1,
    itemName: "Laptop HP ProBook",
    category: "Electronics",
    beginningQty: 10,
    qtyIn: 5,
    purchaseAmount: 240000,
    qtyOut: 3,
    saleAmount: 165000,
  },
  {
    id: 2,
    itemName: "A4 Paper Rim",
    category: "Stationery",
    beginningQty: 100,
    qtyIn: 100,
    purchaseAmount: 42000,
    qtyOut: 50,
    saleAmount: 27500,
  },
  {
    id: 3,
    itemName: "Drill Machine Bosch",
    category: "Hardware",
    beginningQty: 5,
    qtyIn: 10,
    purchaseAmount: 68000,
    qtyOut: 7,
    saleAmount: 52500,
  },
  {
    id: 4,
    itemName: "Mouse Logitech MX",
    category: "Electronics",
    beginningQty: 30,
    qtyIn: 50,
    purchaseAmount: 32500,
    qtyOut: 35,
    saleAmount: 28000,
  },
];
const formatCurrency = (val: number) => `₹ ${val.toFixed(2)}`;

export default function StockDetailPage() {
  const [filteredData, setFilteredData] =
    useState<StockDetailData[]>(sampleData);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [fromDate, setFromDate] = useState<Date | undefined>(
    new Date(2025, 8, 1)
  );
  const [toDate, setToDate] = useState<Date | undefined>(new Date(2025, 8, 6));

  // --- फिल्टर ड्रॉपडाउन के लिए यूनिक कैटेगरी ---
  const uniqueCategories = useMemo(
    () => ["all", ...Array.from(new Set(sampleData.map((d) => d.category)))],
    []
  );

  // --- फिल्टर लॉजिक ---
  useEffect(() => {
    const data =
      selectedCategory === "all"
        ? sampleData
        : sampleData.filter((item) => item.category === selectedCategory);
    setFilteredData(data);
  }, [selectedCategory]);

  // --- टेबल के टोटल की गणना ---
  const totals = useMemo(() => {
    const initialTotals = {
      beginningQty: 0,
      qtyIn: 0,
      purchaseAmount: 0,
      qtyOut: 0,
      saleAmount: 0,
      closingQty: 0,
    };
    return filteredData.reduce((acc, item) => {
      acc.beginningQty += item.beginningQty;
      acc.qtyIn += item.qtyIn;
      acc.purchaseAmount += item.purchaseAmount;
      acc.qtyOut += item.qtyOut;
      acc.saleAmount += item.saleAmount;
      acc.closingQty += item.beginningQty + item.qtyIn - item.qtyOut;
      return acc;
    }, initialTotals);
  }, [filteredData]);

  // --- एक्सपोर्ट और प्रिंट फंक्शन ---
  const handleExportExcel = async () => {
    const xlsx: any = await import("xlsx");
    const { utils } = xlsx;
    const dataToExport = filteredData.map((item) => ({
      "Item Name": item.itemName,
      "Beginning Quantity": item.beginningQty,
      "Quantity In": item.qtyIn,
      "Purchase Amount": item.purchaseAmount,
      "Quantity Out": item.qtyOut,
      "Sale Amount": item.saleAmount,
      "Closing Quantity": item.beginningQty + item.qtyIn - item.qtyOut,
    }));
    const worksheet = utils.json_to_sheet(dataToExport);
    utils.sheet_add_aoa(
      worksheet,
      [
        [
          "Total",
          totals.beginningQty,
          totals.qtyIn,
          totals.purchaseAmount,
          totals.qtyOut,
          totals.saleAmount,
          totals.closingQty,
        ],
      ],
      { origin: -1 }
    );
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "StockDetailReport");
    xlsx.writeFile(workbook, "StockDetailReport.xlsx");
  };
  const handlePrint = () => {
    if (typeof window !== "undefined") window.print();
  };

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        {/* Top Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 border rounded-lg bg-gray-50/50">
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-48 justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {fromDate ? `From ${format(fromDate, "dd/MM/yyyy")}` : ""}
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
                  {toDate ? `To ${format(toDate, "dd/MM/yyyy")}` : ""}
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
            <Button variant="outline" size="icon" onClick={handleExportExcel}>
              <FileSpreadsheet className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={handlePrint}>
              <Printer className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Details and Table Section */}
        <div>
          <h2 className="text-lg font-semibold mb-2">DETAILS</h2>
          <div className="flex items-center gap-4 mb-4">
            <Label className="font-semibold text-gray-600">
              Filter by Item Category
            </Label>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {uniqueCategories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="border rounded-md">
            <Table className="text-sm">
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Beginning Quantity</TableHead>
                  <TableHead>Quantity In</TableHead>
                  <TableHead>Purchase Amount</TableHead>
                  <TableHead>Quantity Out</TableHead>
                  <TableHead>Sale Amount</TableHead>
                  <TableHead>Closing Quantity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((item) => {
                    const closingQty =
                      item.beginningQty + item.qtyIn - item.qtyOut;
                    return (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          {item.itemName}
                        </TableCell>
                        <TableCell>{item.beginningQty}</TableCell>
                        <TableCell>{item.qtyIn}</TableCell>
                        <TableCell>
                          {formatCurrency(item.purchaseAmount)}
                        </TableCell>
                        <TableCell>{item.qtyOut}</TableCell>
                        <TableCell>{formatCurrency(item.saleAmount)}</TableCell>
                        <TableCell>{closingQty}</TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="h-48 text-center text-muted-foreground"
                    >
                      No data to display for the selected category.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
              <TableFooter className="bg-gray-100 font-bold">
                <TableRow>
                  <TableCell>Total</TableCell>
                  <TableCell>{totals.beginningQty}</TableCell>
                  <TableCell>{totals.qtyIn}</TableCell>
                  <TableCell>{formatCurrency(totals.purchaseAmount)}</TableCell>
                  <TableCell>{totals.qtyOut}</TableCell>
                  <TableCell>{formatCurrency(totals.saleAmount)}</TableCell>
                  <TableCell>{totals.closingQty}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
