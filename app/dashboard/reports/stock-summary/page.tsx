// app/dashboard/reports/stock-summary/page.tsx
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar as CalendarIcon, Printer, FileSpreadsheet } from 'lucide-react';
import { format } from 'date-fns';
import * as XLSX from 'xlsx';

// --- डेटा की संरचना ---
type StockItem = {
  id: number;
  name: string;
  category: string;
  salePrice: number;
  purchasePrice: number;
  stockQty: number;
};

// --- सैंपल डेटा ---
const sampleData: StockItem[] = [
  { id: 1, name: 'Laptop HP ProBook', category: 'Electronics', salePrice: 55000, purchasePrice: 48000, stockQty: 12 },
  { id: 2, name: 'A4 Paper Rim', category: 'Stationery', salePrice: 550, purchasePrice: 420, stockQty: 150 },
  { id: 3, name: 'Drill Machine Bosch', category: 'Hardware', salePrice: 7500, purchasePrice: 6800, stockQty: 8 },
  { id: 4, name: 'Mouse Logitech MX', category: 'Electronics', salePrice: 800, purchasePrice: 650, stockQty: 45 },
  { id: 5, name: 'Antivirus Pro (1 Year)', category: 'Software', salePrice: 500, purchasePrice: 250, stockQty: 200 },
  { id: 6, name: 'Office Chair', category: 'Furniture', salePrice: 9000, purchasePrice: 7200, stockQty: 0 }, // Out of stock item
];
const formatCurrency = (val: number) => `₹ ${val.toFixed(2)}`;

export default function StockSummaryPage() {
    const [filteredData, setFilteredData] = useState<StockItem[]>(sampleData);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [dateFilterEnabled, setDateFilterEnabled] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(2025, 8, 6));
    const [showInStockOnly, setShowInStockOnly] = useState(false);

    const uniqueCategories = useMemo(() => ['all', ...Array.from(new Set(sampleData.map(d => d.category)))], []);

    useEffect(() => {
        let data = sampleData;
        if (selectedCategory !== 'all') {
            data = data.filter(item => item.category === selectedCategory);
        }
        if (showInStockOnly) {
            data = data.filter(item => item.stockQty > 0);
        }
        setFilteredData(data);
    }, [selectedCategory, showInStockOnly, dateFilterEnabled, selectedDate]);
    
    const totals = useMemo(() => {
        return filteredData.reduce((acc, item) => {
            acc.stockQty += item.stockQty;
            acc.stockValue += item.stockQty * item.purchasePrice;
            return acc;
        }, { stockQty: 0, stockValue: 0 });
    }, [filteredData]);

    const handleExportExcel = () => {
        const dataToExport = filteredData.map(item => ({
            'Item Name': item.name,
            'Sale Price': item.salePrice,
            'Purchase Price': item.purchasePrice,
            'Stock Qty': item.stockQty,
            'Stock Value': item.stockQty * item.purchasePrice,
        }));
        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        XLSX.utils.sheet_add_aoa(worksheet, [
            ['Total', '', '', totals.stockQty, totals.stockValue]
        ], { origin: -1 });
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "StockSummary");
        XLSX.writeFile(workbook, "StockSummary.xlsx");
    };
    const handlePrint = () => {
        if (typeof window !== 'undefined') window.print();
    };

    return (
        <Card>
            <CardContent className="p-4 space-y-4">
                {/* Filters Section */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 border rounded-lg bg-gray-50/50">
                    <div className="flex flex-wrap items-center gap-4">
                        <Label className="font-semibold text-gray-600">FILTERS</Label>
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
                            <SelectContent>{uniqueCategories.map(cat => <SelectItem key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</SelectItem>)}</SelectContent>
                        </Select>
                        <div className="flex items-center space-x-2"><Checkbox id="date-filter" checked={dateFilterEnabled} onCheckedChange={(checked) => setDateFilterEnabled(Boolean(checked))}/><Label htmlFor="date-filter">Date filter</Label></div>
                         <Popover>
                            <PopoverTrigger asChild><Button variant="outline" disabled={!dateFilterEnabled} className="w-48 justify-start text-left font-normal"><CalendarIcon className="mr-2 h-4 w-4" />{selectedDate ? `Date ${format(selectedDate, "dd/MM/yyyy")}` : "Pick a date"}</Button></PopoverTrigger>
                            <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} /></PopoverContent>
                        </Popover>
                         <div className="flex items-center space-x-2"><Checkbox id="in-stock" checked={showInStockOnly} onCheckedChange={(checked) => setShowInStockOnly(Boolean(checked))}/><Label htmlFor="in-stock">Show items in stock</Label></div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" onClick={handleExportExcel}><FileSpreadsheet className="h-5 w-5"/></Button>
                        <Button variant="outline" size="icon" onClick={handlePrint}><Printer className="h-5 w-5"/></Button>
                    </div>
                </div>
                
                {/* Table Section */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">STOCK SUMMARY</h2>
                    <div className="border rounded-md">
                        <Table>
                            <TableHeader className="bg-gray-100"><TableRow>
                                <TableHead>Item Name</TableHead>
                                <TableHead>Sale Price</TableHead>
                                <TableHead>Purchase Price</TableHead>
                                <TableHead>Stock Qty</TableHead>
                                <TableHead>Stock Value</TableHead>
                            </TableRow></TableHeader>
                            <TableBody>
                                {filteredData.length > 0 ? (
                                    filteredData.map(item => (
                                        <TableRow key={item.id}>
                                            <TableCell className="font-medium">{item.name}</TableCell>
                                            <TableCell>{formatCurrency(item.salePrice)}</TableCell>
                                            <TableCell>{formatCurrency(item.purchasePrice)}</TableCell>
                                            <TableCell>{item.stockQty}</TableCell>
                                            <TableCell>{formatCurrency(item.stockQty * item.purchasePrice)}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow><TableCell colSpan={5} className="h-24 text-center">No items to display based on filters.</TableCell></TableRow>
                                )}
                                <TableRow className="bg-gray-100 font-bold">
                                    <TableCell>Total</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell className="text-red-600">{totals.stockQty}</TableCell>
                                    <TableCell>{formatCurrency(totals.stockValue)}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}