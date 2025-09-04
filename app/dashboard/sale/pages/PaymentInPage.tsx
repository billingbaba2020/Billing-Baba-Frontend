"use client";

import React, { useState } from 'react';
import { 
    ArrowUpRight, 
    Plus, 
    Search,
    MoreVertical,
    Edit,
    Printer,
    Trash2 as Trash
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import FilterBar from '../component/FilterBar';

// --- Mock Data ---
const emptyTransactions: any[] = [];
const mockTransactions = [
    {
        date: "04/09/2025",
        receiptNo: 1,
        partyName: "adarsh",
        mode: "Cash",
        amount: 888.00,
    }
];

// --- Sub-components for clarity ---
const EmptyStateIllustration = () => (
    <div className="w-32 h-32 bg-blue-100/70 rounded-full flex items-center justify-center mb-6">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2V8H20" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 13H8" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 17H8" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 9H8" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </div>
);

// --- Main Page Component ---
export default function PaymentInPage() {
    const [transactions, setTransactions] = useState(emptyTransactions);
    const hasTransactions = transactions.length > 0;

    const totalAmount = hasTransactions ? transactions.reduce((sum, t) => sum + t.amount, 0) : 0;

    const handleFilterChange = (filters: any) => {
        console.log("Payment-In Filters applied:", filters);
    };

    return (
        <div className="space-y-6">
            <Card className="shadow-sm">
                <CardContent className="p-0 divide-y">
                    <div className="p-4 border-b">
                        <FilterBar onFilterChange={handleFilterChange} />
                    </div>
                    <div className="p-4">
                        <div className="inline-block bg-purple-50 p-4 rounded-lg border border-purple-200 w-full max-w-sm">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm text-gray-600">Total Amount</p>
                                    <p className="text-2xl font-bold text-gray-800 mt-1">₹ {totalAmount.toFixed(2)}</p>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center gap-1 text-sm font-semibold text-gray-500">
                                        0% <ArrowUpRight className="h-4 w-4" />
                                    </div>
                                    <p className="text-xs text-gray-500">vs last month</p>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-purple-200 flex items-center text-sm">
                                <span className="text-gray-600">Received: <span className="font-semibold text-gray-800">₹ {totalAmount.toFixed(2)}</span></span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {hasTransactions ? (
                // --- DATA STATE: Transactions Table ---
                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between p-4">
                        <CardTitle className="text-lg">Transactions</CardTitle>
                        <Button variant="ghost" size="icon"><Search className="h-5 w-5 text-gray-500" /></Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Receipt No</TableHead>
                                    <TableHead>Party Name</TableHead>
                                    <TableHead>Mode</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transactions.map((t) => (
                                    <TableRow key={t.receiptNo}>
                                        <TableCell>{t.date}</TableCell>
                                        <TableCell>{t.receiptNo}</TableCell>
                                        <TableCell className="font-medium">{t.partyName}</TableCell>
                                        <TableCell>{t.mode}</TableCell>
                                        <TableCell>₹ {t.amount.toFixed(2)}</TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon"><MoreVertical className="h-5 w-5" /></Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem><Printer className="mr-2 h-4 w-4" /><span>Print</span></DropdownMenuItem>
                                                    <DropdownMenuItem><Edit className="mr-2 h-4 w-4" /><span>Edit</span></DropdownMenuItem>
                                                    <DropdownMenuItem className="text-red-500 hover:!text-red-500 focus:!text-red-500 focus:!bg-red-50"><Trash className="mr-2 h-4 w-4" /><span>Delete</span></DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            ) : (
                // --- EMPTY STATE: No Transactions ---
                <Card className="shadow-sm">
                    <CardContent className="p-16 flex flex-col items-center justify-center text-center">
                        <EmptyStateIllustration />
                        <h3 className="text-lg font-semibold text-gray-800">No Transactions to show</h3>
                        <p className="text-sm text-gray-500 mt-1">You haven't added any transactions yet.</p>
                        <Button onClick={() => setTransactions(mockTransactions)} className="bg-[var(--accent-red)] text-white font-bold rounded-full shadow-sm hover:bg-red-600 mt-6">
                            <Plus size={18} className="mr-2" /> Add Payment-In
                        </Button>
                    </CardContent>
                </Card>
            )}
             {/* --- Helper Button to Toggle State (for demonstration) --- */}
             <div className="text-center mt-4">
                <Button variant="link" onClick={() => setTransactions(hasTransactions ? emptyTransactions : mockTransactions)}>
                    {hasTransactions ? "Switch to Empty State" : "Switch to Data State"}
                </Button>
            </div>
        </div>
    );
}