// app/dashboard/reports/item-wise-profit-and-loss/page.tsx
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar as CalendarIcon, Printer, FileSpreadsheet } from 'lucide-react';
import { format } from 'date-fns';
import * as XLSX from 'xlsx';

// --- डेटा की संरचना ---
type ItemProfitLossData = {
  id: number;
  itemName: string;
  sale: number;
  saleReturn: number;
  purchase: number;
  purchaseReturn: number;
  openingStock: number;
  closingStock: number;
  taxReceivable: number;
  taxPayable: number;
};

// --- सैंपल डेटा ---
const sampleData: ItemProfitLossData[] = [
  { id: 1, itemName: 'Laptop HP ProBook', sale: 275000, saleReturn: 0, purchase: 240000, purchaseReturn: 0, openingStock: 5, closingStock: 2, taxReceivable: 0, taxPayable: 4500 },
  { id: 2, itemName: 'A4 Paper Rim', sale: 27500, saleReturn: 550, purchase: 21000, purchaseReturn: 420, openingStock: 50, closingStock: 40, taxReceivable: 0, taxPayable: 850 },
  { id: 3, itemName: 'Drill Machine Bosch', sale: 0, saleReturn: 0, purchase: 68000, purchaseReturn: 0, openingStock: 0, closingStock: 10, taxReceivable: 0, taxPayable: 0 },
  { id: 4, itemName: 'Mouse Logitech MX', sale: 16000, saleReturn: 800, purchase: 13000, purchaseReturn: 650, openingStock: 20, closingStock: 15, taxReceivable: 0, taxPayable: 350 },
];
const formatCurrency = (val: number) => `₹ ${val.toFixed(2)}`;

export default function ItemWiseProfitAndLossPage() {
    const [filteredData, setFilteredData] = useState<ItemProfitLossData[]>(sampleData);
    const [fromDate, setFromDate] = useState<Date | undefined>(new Date(2025, 8, 1));
    const [toDate, setToDate] = useState<Date | undefined>(new Date(2025, 8, 6));
    const [itemsHavingSaleOnly, setItemsHavingSaleOnly] = useState(false);

    // --- फिल्टर लॉजिक ---
    useEffect(() => {
        let data = sampleData;
        if (itemsHavingSaleOnly) {
            data = data.filter(item => item.sale > 0);
        }
        setFilteredData(data);
    }, [itemsHavingSaleOnly]);

    // --- नेट प्रॉफिट और टोटल की गणना ---
    const getNetProfit = (item: ItemProfitLossData) => {
        const netSale = item.sale - item.saleReturn;
        const netPurchase = item.purchase - item.purchaseReturn;
        // Note: Stock calculation can be complex. This is a simplified version.
        const stockValueChange = (item.closingStock - item.openingStock) * (item.purchase / (item.closingStock || 1)); // Simplified cost
        return netSale - netPurchase - stockValueChange - item.taxPayable + item.taxReceivable;
    };
    
    const totalAmount = useMemo(() => {
        return filteredData.reduce((sum, item) => sum + getNetProfit(item), 0);
    }, [filteredData]);

    // --- एक्सपोर्ट और प्रिंट फंक्शन ---
    const handleExportExcel = () => {
        const dataToExport = filteredData.map(item => ({
            'Item Name': item.itemName,
            'Sale': item.sale,
            'Cr. Note / Sale Return': item.saleReturn,
            'Purchase': item.purchase,
            'Dr. Note / Purchase Return': item.purchaseReturn,
            'Opening Stock': item.openingStock,
            'Closing Stock': item.closingStock,
            'Tax Receivable': item.taxReceivable,
            'Tax Payable': item.taxPayable,
            'Net Profit/Loss': getNetProfit(item),
        }));
        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        XLSX.utils.sheet_add_aoa(worksheet, [['', '', '', '', '', '', '', '', 'Total Amount:', totalAmount]], { origin: -1 });
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "ItemWiseProfitLoss");
        XLSX.writeFile(workbook, "ItemWiseProfitLoss.xlsx");
    };
    const handlePrint = () => { if (typeof window !== 'undefined') window.print(); };

    return (
        <Card>
            <CardContent className="p-4 space-y-4">
                {/* Top Filters */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 border rounded-lg bg-gray-50/50">
                    <div className="flex flex-wrap items-center gap-4">
                         <Popover>
                            <PopoverTrigger asChild><Button variant="outline" className="w-48 justify-start text-left font-normal"><CalendarIcon className="mr-2 h-4 w-4" />{fromDate ? `From ${format(fromDate, "dd/MM/yyyy")}` : ""}</Button></PopoverTrigger>
                            <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={fromDate} onSelect={setFromDate} /></PopoverContent>
                        </Popover>
                         <Popover>
                            <PopoverTrigger asChild><Button variant="outline" className="w-48 justify-start text-left font-normal"><CalendarIcon className="mr-2 h-4 w-4" />{toDate ? `To ${format(toDate, "dd/MM/yyyy")}` : ""}</Button></PopoverTrigger>
                            <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={toDate} onSelect={setToDate} /></PopoverContent>
                        </Popover>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="items-having-sale" checked={itemsHavingSaleOnly} onCheckedChange={(checked) => setItemsHavingSaleOnly(Boolean(checked))} />
                            <Label htmlFor="items-having-sale">Items Having Sale</Label>
                        </div>
                    </div>
                     <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" onClick={handleExportExcel}><FileSpreadsheet className="h-5 w-5"/></Button>
                        <Button variant="outline" size="icon" onClick={handlePrint}><Printer className="h-5 w-5"/></Button>
                    </div>
                </div>
                
                {/* Details and Table Section */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">DETAILS</h2>
                     <div className="border rounded-md">
                        <Table className="text-xs">
                            <TableHeader className="bg-gray-100"><TableRow>
                                <TableHead>Item Name</TableHead>
                                <TableHead>Sale</TableHead>
                                <TableHead>Cr. Note / Sale Return</TableHead>
                                <TableHead>Purchase</TableHead>
                                <TableHead>Dr. Note / Purchase Return</TableHead>
                                <TableHead>Opening Stock</TableHead>
                                <TableHead>Closing Stock</TableHead>
                                <TableHead>Tax Receivable</TableHead>
                                <TableHead>Tax Payable</TableHead>
                                <TableHead>Net Profit/Loss</TableHead>
                            </TableRow></TableHeader>
                            <TableBody>
                                {filteredData.length > 0 ? (
                                    filteredData.map(item => {
                                        const netProfit = getNetProfit(item);
                                        return (
                                        <TableRow key={item.id}>
                                            <TableCell className="font-medium">{item.itemName}</TableCell>
                                            <TableCell>{formatCurrency(item.sale)}</TableCell>
                                            <TableCell>{formatCurrency(item.saleReturn)}</TableCell>
                                            <TableCell>{formatCurrency(item.purchase)}</TableCell>
                                            <TableCell>{formatCurrency(item.purchaseReturn)}</TableCell>
                                            <TableCell>{item.openingStock}</TableCell>
                                            <TableCell>{item.closingStock}</TableCell>
                                            <TableCell>{formatCurrency(item.taxReceivable)}</TableCell>
                                            <TableCell>{formatCurrency(item.taxPayable)}</TableCell>
                                            <TableCell className={`font-bold ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>{formatCurrency(netProfit)}</TableCell>
                                        </TableRow>
                                    )})
                                ) : (
                                    <TableRow><TableCell colSpan={10} className="h-24 text-center">No items to display.</TableCell></TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="text-right mt-4 font-bold">
                        Total Amount: <span className="text-green-600">{formatCurrency(totalAmount)}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}