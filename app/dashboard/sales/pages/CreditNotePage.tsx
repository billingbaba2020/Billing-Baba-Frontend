"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar as CalendarIcon, FileX2, Filter, Plus, Printer, Search, FileDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import CreateCreditNotePage from './CreateCreditNotePage'; 
import PrintOptionsModal from '../component/PrintOptionsModal';

// --- Placeholder Components & Data ---
const transactionTypes = ["All Transaction", "Sale", "Purchase", "Payment-In", "Payment-Out", "Credit Note", "Debit Note", "Sale Order", "Purchase Order", "Estimate", "Proforma Invoice", "Delivery Challan", "Expense", "Party to Party [Received]", "Party to Party [Paid]", "Manufacture", "Sale FA", "Purchase FA", "Sale[Cancelled]", "Journal Entry"];
const EmptyStateIllustration = () => (
    <div className="text-center text-gray-500 py-16">
        <FileX2 className="mx-auto h-16 w-16 text-gray-300" />
        <p className="mt-4 font-semibold">No data is available for Credit Note.</p>
        <p className="text-sm">Please try again after making relevant changes.</p>
    </div>
);

// --- 1. बेहतर और कार्यात्मक DatePicker कंपोनेंट ---
const DatePicker = ({ initialDate }: { initialDate: Date }) => {
    const [date, setDate] = useState<Date | undefined>(initialDate);
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={"outline"} className={cn("w-32 justify-start text-left font-normal", !date && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "dd/MM/yyyy") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
        </Popover>
    );
};

// --- मुख्य पेज कंपोनेंट ---
export default function CreditNotePage() {
    const [isCreating, setIsCreating] = useState(false);
    const [isPrintModalOpen, setPrintModalOpen] = useState(false);
    const [dateRange, setDateRange] = useState('this-month');

    if (isCreating) {
        return (
            <div className="bg-slate-50 p-4 sm:p-6 lg:p-8 min-h-screen">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Create Credit Note</h1>
                <CreateCreditNotePage onCancel={() => setIsCreating(false)} />
            </div>
        );
    }

    return (
        <>
            <div className="bg-white p-4 sm:p-6 space-y-4 rounded-lg shadow-sm">
                {/* --- हेडर फिल्टर्स --- */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-2">
                        <Select value={dateRange} onValueChange={setDateRange}>
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Select Date Range" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="this-month">This Month</SelectItem>
                                <SelectItem value="last-month">Last Month</SelectItem>
                                <SelectItem value="this-quarter">This Quarter</SelectItem>
                                <SelectItem value="this-year">This Year</SelectItem>
                                <SelectItem value="custom">Custom</SelectItem>
                            </SelectContent>
                        </Select>
                        
                        {/* 2. यह हिस्सा तभी दिखेगा जब "Custom" चुना जाएगा */}
                        {dateRange === 'custom' && (
                            <div className="flex flex-wrap items-center gap-2 animate-in fade-in duration-300">
                                <span className="text-sm text-gray-500">Between</span>
                                <DatePicker initialDate={new Date(2025, 8, 1)} />
                                <span className="text-sm text-gray-500">To</span>
                                <DatePicker initialDate={new Date(2025, 8, 30)} />
                            </div>
                        )}
                        
                        <Select defaultValue="all-firms">
                            <SelectTrigger className="w-36">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all-firms">ALL FIRMS</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" className="text-sm text-gray-600 gap-2">
                            <FileDown className="h-5 w-5 text-green-600" /> Excel Report
                        </Button>
                        <Button variant="ghost" className="text-sm text-gray-600 gap-2" onClick={() => setPrintModalOpen(true)}>
                            <Printer className="h-5 w-5 text-gray-500" /> Print
                        </Button>
                    </div>
                </div>

                <div className="border-t pt-4">
                    <Select defaultValue="Credit Note">
                        <SelectTrigger className="w-full md:w-64"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            {transactionTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            
            {/* ... (बाकी का पेज कोड पहले जैसा ही रहेगा) ... */}
            <div className="mt-4 bg-white p-4 sm:p-6 rounded-lg shadow-sm">
                 <div className="flex items-center justify-between mb-4">
                    <div className="relative w-full max-w-xs">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input placeholder="Search..." className="pl-10" />
                    </div>
                    <Button onClick={() => setIsCreating(true)} className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                        <Plus className="h-5 w-5" /> Add Credit Note
                    </Button>
                </div>

                <div className="overflow-x-auto border rounded-lg">
                    <Table>
                        <TableHeader className="bg-slate-50">
                             <TableRow>
                                <TableHead className="w-12">#</TableHead>
                                <TableHead><div className="flex items-center gap-1">DATE <Filter size={14} /></div></TableHead>
                                <TableHead><div className="flex items-center gap-1">REF NO. <Filter size={14} /></div></TableHead>
                                <TableHead><div className="flex items-center gap-1">PARTY NAME <Filter size={14} /></div></TableHead>
                                <TableHead><div className="flex items-center gap-1">CATEGORY NA... <Filter size={14} /></div></TableHead>
                                <TableHead><div className="flex items-center gap-1">TYPE <Filter size={14} /></div></TableHead>
                                <TableHead><div className="flex items-center gap-1">TOTAL <Filter size={14} /></div></TableHead>
                                <TableHead><div className="flex items-center gap-1">RECEIVED/P... <Filter size={14} /></div></TableHead>
                                <TableHead><div className="flex items-center gap-1">BALANCE <Filter size={14} /></div></TableHead>
                                <TableHead>PRINT / SH...</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow><TableCell colSpan={10}><EmptyStateIllustration /></TableCell></TableRow>
                        </TableBody>
                    </Table>
                </div>
                
                <div className="flex justify-between items-center mt-4 pt-4 border-t text-sm font-semibold">
                    <p>Total Amount: <span className="text-green-600">₹ 0.00</span></p>
                    <p>Balance: <span className="text-red-600">₹ 0.00</span></p>
                </div>
            </div>
            
            <PrintOptionsModal isOpen={isPrintModalOpen} onClose={() => setPrintModalOpen(false)} />
        </>
    );
}