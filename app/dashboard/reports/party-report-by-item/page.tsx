"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown, Printer, FileText, Search, Filter } from "lucide-react";
import React from "react"; // React ko import karna zaroori hai

type PartyReportData = {
  id: number;
  partyName: string;
  category: string;
  itemName: string;
  saleQty: number;
  saleAmount: number;
  purchaseQty: number;
  purchaseAmount: number;
};

// --- Sample Data ---
const sampleData: PartyReportData[] = [
  {
    id: 1,
    partyName: "Krishna Traders",
    category: "Electronics",
    itemName: "Laptop HP",
    saleQty: 5,
    saleAmount: 250000,
    purchaseQty: 0,
    purchaseAmount: 0,
  },
  {
    id: 2,
    partyName: "Verma Supplies",
    category: "Stationery",
    itemName: "A4 Paper Rim",
    saleQty: 50,
    saleAmount: 25000,
    purchaseQty: 100,
    purchaseAmount: 40000,
  },
  {
    id: 3,
    partyName: "Gupta & Sons",
    category: "Hardware",
    itemName: "Drill Machine",
    saleQty: 10,
    saleAmount: 75000,
    purchaseQty: 20,
    purchaseAmount: 120000,
  },
  {
    id: 4,
    partyName: "Krishna Traders",
    category: "Electronics",
    itemName: "Mouse Logitech",
    saleQty: 20,
    saleAmount: 15000,
    purchaseQty: 50,
    purchaseAmount: 30000,
  },
  {
    id: 5,
    partyName: "Sharma Solutions",
    category: "Software",
    itemName: "Antivirus Pro",
    saleQty: 100,
    saleAmount: 50000,
    purchaseQty: 0,
    purchaseAmount: 0,
  },
  {
    id: 6,
    partyName: "Verma Supplies",
    category: "Electronics",
    itemName: "Laptop HP",
    purchaseQty: 10,
    purchaseAmount: 450000,
    saleQty: 0,
    saleAmount: 0,
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
    {" "}
    <path
      d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="#f1f5f9"
    />{" "}
    <path
      d="M14 2V8H20"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />{" "}
    <path
      d="M16 13H8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />{" "}
    <path
      d="M16 17H8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />{" "}
    <path
      d="M10 9H8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />{" "}
    <path
      d="M18 13H16.5"
      stroke="#4a90e2"
      strokeWidth="2"
      strokeLinecap="round"
    />{" "}
  </svg>
);
const formatCurrency = (val: number) => `₹ ${val.toFixed(2)}`;

export default function PartyReportByItemPage() {
  const [filteredData, setFilteredData] =
    useState<PartyReportData[]>(sampleData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState("all");

  const uniqueCategories = useMemo(
    () => ["all", ...Array.from(new Set(sampleData.map((d) => d.category)))],
    []
  );
  const uniqueItems = useMemo(
    () => ["all", ...Array.from(new Set(sampleData.map((d) => d.itemName)))],
    []
  );

  useEffect(() => {
    let data = sampleData;
    if (searchTerm) {
      data = data.filter((d) =>
        d.partyName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedCategory !== "all") {
      data = data.filter((d) => d.category === selectedCategory);
    }
    if (selectedItem !== "all") {
      data = data.filter((d) => d.itemName === selectedItem);
    }
    setFilteredData(data);
  }, [searchTerm, selectedCategory, selectedItem]);

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

  const handleExportExcel = async () => {
    try {
      const XLSX = await import("xlsx") as any;
      const dataToExport = filteredData.map((item) => ({
        "Party Name": item.partyName,
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
            "Total:",
            "",
            totals.saleQty,
            totals.saleAmount,
            totals.purchaseQty,
            totals.purchaseAmount,
          ],
        ],
        { origin: -1 }
      );
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "PartyReportByItem");
      XLSX.writeFile(workbook, "PartyReportByItem.xlsx");
    } catch (error) {
      console.error("Error exporting to Excel:", error);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-xl font-bold p-1">
                    This Month <ChevronDown className="w-5 h-5 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>This Month</DropdownMenuItem>
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
                  className="w-28 h-8 border-none bg-transparent focus-visible:ring-0"
                />
                <span>To</span>
                <Input
                  type="text"
                  defaultValue="30/09/2025"
                  className="w-28 h-8 border-none bg-transparent focus-visible:ring-0"
                />
              </div>
              <Select defaultValue="all-firms">
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-firms">All Firms</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-muted-foreground"
                onClick={handleExportExcel}
              >
                <FileText className="w-5 h-5" /> Excel Report
              </Button>
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-muted-foreground"
                onClick={() => window.print()}
              >
                <Printer className="w-5 h-5" /> Print
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {uniqueCategories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedItem} onValueChange={setSelectedItem}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="All Items" />
              </SelectTrigger>
              <SelectContent>
                {uniqueItems.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item === "all" ? "All Items" : item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <div className="relative mb-4 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

            {/* ===== ERROR 1 YAHAN THEEK KIYA GAYA HAI ===== */}
            <Input
              placeholder="Search Party..."
              className="pl-9"
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchTerm(e.target.value)
              }
            />
          </div>
          <div className="border rounded-md">
            <Table>
              <TableHeader className="bg-gray-50 dark:bg-gray-800">
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      PARTY NAME <Filter className="h-3 w-3 ml-1" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      SALE QUANTITY <Filter className="h-3 w-3 ml-1" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      SALE AMOUNT <Filter className="h-3 w-3 ml-1" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      PURCHASE QUANTI... <Filter className="h-3 w-3 ml-1" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      PURCHASE AMOUNT <Filter className="h-3 w-3 ml-1" />
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">
                        {item.partyName}
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
                    <TableCell colSpan={6} className="h-64">
                      <div className="flex flex-col items-center justify-center text-center">
                        <EmptyStateIcon />
                        <p className="mt-4 font-semibold text-gray-700">
                          No data is available for Party Report by Item.
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Please try again after making relevant changes.
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
              <TableFooter className="bg-gray-50 font-bold">
                <TableRow>
                  <TableCell colSpan={2}>Total:</TableCell>
                  <TableCell>{totals.saleQty}</TableCell>
                  <TableCell>{formatCurrency(totals.saleAmount)}</TableCell>
                  <TableCell>{totals.purchaseQty}</TableCell>
                  <TableCell>{formatCurrency(totals.purchaseAmount)}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
