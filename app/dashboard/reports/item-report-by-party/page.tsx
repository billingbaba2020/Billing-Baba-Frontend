// app/dashboard/reports/item-report-by-party/page.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

// --- डेटा की संरचना ---
type ItemReportData = {
  id: number;
  itemName: string;
  partyName: string;
  saleQty: number;
  saleAmount: number;
  purchaseQty: number;
  purchaseAmount: number;
};

// --- सैंपल डेटा ---
const sampleData: ItemReportData[] = [
  {
    id: 1,
    itemName: "Laptop HP ProBook",
    partyName: "Krishna Traders",
    saleQty: 5,
    saleAmount: 275000,
    purchaseQty: 0,
    purchaseAmount: 0,
  },
  {
    id: 2,
    itemName: "A4 Paper Rim",
    partyName: "Verma Supplies",
    saleQty: 50,
    saleAmount: 27500,
    purchaseQty: 100,
    purchaseAmount: 42000,
  },
  {
    id: 3,
    itemName: "Drill Machine Bosch",
    partyName: "Gupta & Sons",
    saleQty: 0,
    purchaseAmount: 68000,
    purchaseQty: 10,
    saleAmount: 0,
  },
  {
    id: 4,
    itemName: "Laptop HP ProBook",
    partyName: "Sharma Solutions",
    saleQty: 2,
    saleAmount: 110000,
    purchaseQty: 0,
    purchaseAmount: 0,
  },
  {
    id: 5,
    itemName: "Mouse Logitech MX",
    partyName: "Krishna Traders",
    saleQty: 20,
    saleAmount: 16000,
    purchaseQty: 50,
    purchaseAmount: 32500,
  },
];
const formatCurrency = (val: number) => `₹ ${val.toFixed(2)}`;

export default function ItemReportByPartyPage() {
  const [filteredData, setFilteredData] =
    useState<ItemReportData[]>(sampleData);
  const [partyFilter, setPartyFilter] = useState("");
  const [fromDate, setFromDate] = useState<Date | undefined>(
    new Date(2025, 8, 1)
  );
  const [toDate, setToDate] = useState<Date | undefined>(new Date(2025, 8, 6));

  // --- पार्टी फिल्टर लॉजिक ---
  useEffect(() => {
    const data = partyFilter
      ? sampleData.filter((item) =>
          item.partyName.toLowerCase().includes(partyFilter.toLowerCase())
        )
      : sampleData;
    setFilteredData(data);
  }, [partyFilter]);

  // --- टेबल के टोटल की गणना ---
  const totals = useMemo(() => {
    return filteredData.reduce(
      (acc, item) => {
        acc.saleQty += item.saleQty;
        acc.saleAmount += item.saleAmount;
        acc.purchaseQty += item.purchaseQty;
        acc.purchaseAmount += item.purchaseAmount;
        return acc;
      },
      { saleQty: 0, saleAmount: 0, purchaseQty: 0, purchaseAmount: 0 }
    );
  }, [filteredData]);

  // --- एक्सपोर्ट और प्रिंट फंक्शन ---
  const handleExportExcel = async () => {
    try {
      const XLSX = await import("xlsx") as any;
      const dataToExport = filteredData.map((item) => ({
        "Item Name": item.itemName,
        "Sale Quantity": item.saleQty,
        "Sale Amount": item.saleAmount,
        "Purchase Quantity": item.purchaseQty,
        "Purchase Amount": item.purchaseAmount,
      }));
      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      XLSX.utils.sheet_add_aoa(
        worksheet,
        [
          [
            "Total",
            totals.saleQty,
            totals.saleAmount,
            totals.purchaseQty,
            totals.purchaseAmount,
          ],
        ],
        { origin: -1 }
      );
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "ItemReportByParty");
      XLSX.writeFile(workbook, "ItemReportByParty.xlsx");
    } catch (error) {
      console.error("Error exporting to Excel:", error);
    }
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
            <Label className="font-semibold text-gray-600">FILTERS</Label>
            <Input
              placeholder="Party filter"
              className="max-w-xs"
              value={partyFilter}
              onChange={(e) => setPartyFilter(e.target.value)}
            />
          </div>
          <div className="border rounded-md">
            <Table>
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Sale Quantity</TableHead>
                  <TableHead>Sale Amount</TableHead>
                  <TableHead>Purchase Quantity</TableHead>
                  <TableHead>Purchase Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {item.itemName}
                      </TableCell>
                      <TableCell>{item.saleQty}</TableCell>
                      <TableCell>{formatCurrency(item.saleAmount)}</TableCell>
                      <TableCell>{item.purchaseQty}</TableCell>
                      <TableCell>
                        {formatCurrency(item.purchaseAmount)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No items to display.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
              <TableFooter className="bg-gray-100 font-bold">
                <TableRow>
                  <TableCell>Total</TableCell>
                  <TableCell>{totals.saleQty}</TableCell>
                  <TableCell>{formatCurrency(totals.saleAmount)}</TableCell>
                  <TableCell>{totals.purchaseQty}</TableCell>
                  <TableCell>{formatCurrency(totals.purchaseAmount)}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
