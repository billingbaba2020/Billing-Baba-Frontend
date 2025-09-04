"use client";

import React, { useState } from 'react';
import { 
    ChevronDown, 
    ArrowUpRight, 
    Plus, 
    Search, 
    MoreVertical, 
    Printer, 
    Eye, 
    File as FilePdf, // Renamed to avoid conflict with File type
    Copy, 
    Edit, 
    Trash2 as Trash // Renamed to use the correct icon
} from 'lucide-react';

// Shadcn UI Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// FilterBar component ko import karein
import FilterBar from '../component/FilterBar';

// --- Mock Data ---
const emptyTransactions: any[] = [];
const mockTransactions = [
    {
        date: "04/09/2025",
        referenceNo: 1,
        partyName: "adarsh",
        amount: 165.00,
        balance: 165.00,
        status: "Open",
    }
];

// --- Sub-components for clarity ---
const EmptyStateIllustration = () => (
    <div className="w-32 h-32 bg-blue-100/70 rounded-full flex items-center justify-center mb-6">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 2V8H20" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 13H8" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 17H8" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 9H8" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </div>
);

// --- Main Page Component ---
export default function EstimatesPage() {
    const [transactions, setTransactions] = useState(mockTransactions); // Data ke saath start karein
    const hasTransactions = transactions.length > 0;

    const totalQuotations = hasTransactions ? transactions.reduce((sum, t) => sum + t.amount, 0) : 0;
    const openAmount = hasTransactions ? transactions.filter(t => t.status === 'Open').reduce((sum, t) => sum + t.amount, 0) : 0;
    const convertedAmount = totalQuotations - openAmount;

    const handleFilterChange = (filters: any) => {
        console.log("Filters changed in EstimatesPage:", filters);
        // In a real app, you would use these filters to refetch or filter your 'transactions' state
    };

    return (
        <div className="space-y-6">
            <Card className="shadow-sm">
                <CardContent className="p-0">
                    
                    {/* **--- FILTER BAR AB YAHAN HAI ---** */}
                    <div className="p-4 border-b">
                    <FilterBar onFilterChange={handleFilterChange} />
                    </div>
                    
                    <div className="p-4">
                        <div className="inline-block bg-purple-50 p-4 rounded-lg border border-purple-200 w-full max-w-sm">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm text-gray-600">Total Quotations</p>
                                    <p className="text-2xl font-bold text-gray-800 mt-1">₹ {totalQuotations.toFixed(2)}</p>
                                </div>
                                <div className="text-right">
                                    <div className={`flex items-center gap-1 text-sm font-semibold ${hasTransactions ? 'text-green-600' : 'text-gray-500'}`}>
                                        {hasTransactions ? '100%' : '0%'} <ArrowUpRight className="h-4 w-4" />
                                    </div>
                                    <p className="text-xs text-gray-500">vs last month</p>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-purple-200 flex items-center text-sm">
                                <span className="text-gray-600">Converted: <span className="font-semibold text-gray-800">₹ {convertedAmount.toFixed(2)}</span></span>
                                <span className="mx-2 text-gray-300">|</span>
                                <span className="text-gray-600">Open: <span className="font-semibold text-gray-800">₹ {openAmount.toFixed(2)}</span></span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {hasTransactions ? (
                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between p-4">
                        <CardTitle className="text-lg">Transactions</CardTitle>
                        <Button variant="ghost" size="icon"><Search className="h-5 w-5 text-gray-500" /></Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead><TableHead>Reference no</TableHead><TableHead>Party Name</TableHead>
                                    <TableHead>Amount</TableHead><TableHead>Balance</TableHead><TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transactions.map((t) => (
                                    <TableRow key={t.referenceNo}>
                                        <TableCell>{t.date}</TableCell><TableCell>{t.referenceNo}</TableCell>
                                        <TableCell className="font-medium">{t.partyName}</TableCell>
                                        <TableCell>₹ {t.amount.toFixed(2)}</TableCell><TableCell>₹ {t.balance.toFixed(2)}</TableCell>
                                        <TableCell><span className="bg-orange-100 text-orange-700 text-xs font-semibold px-2 py-1 rounded-full">{t.status}</span></TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild><Button variant="outline" size="sm">Convert <ChevronDown className="h-4 w-4 ml-2" /></Button></DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end"><DropdownMenuItem>Convert to Sale Invoice</DropdownMenuItem><DropdownMenuItem>Convert to Sale Order</DropdownMenuItem></DropdownMenuContent>
                                                </DropdownMenu>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreVertical className="h-5 w-5" /></Button></DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem><Edit className="mr-2 h-4 w-4" /><span>View/Edit</span></DropdownMenuItem>
                                                        <DropdownMenuItem><Copy className="mr-2 h-4 w-4" /><span>Duplicate</span></DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem><FilePdf className="mr-2 h-4 w-4" /><span>Open PDF</span></DropdownMenuItem>
                                                        <DropdownMenuItem><Eye className="mr-2 h-4 w-4" /><span>Preview</span></DropdownMenuItem>
                                                        <DropdownMenuItem><Printer className="mr-2 h-4 w-4" /><span>Print</span></DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="text-red-500 hover:!text-red-500 focus:!text-red-500 focus:!bg-red-50"><Trash className="mr-2 h-4 w-4" /><span>Delete</span></DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            ) : (
                <Card className="shadow-sm">
                    <CardContent className="p-16 flex flex-col items-center justify-center text-center">
                        <EmptyStateIllustration />
                        <h3 className="text-lg font-semibold text-gray-800">No Transactions to show</h3>
                        <p className="text-sm text-gray-500 mt-1">You haven't added any transactions yet.</p>
                        <Button onClick={() => setTransactions(mockTransactions)} className="bg-[var(--accent-red)] text-white font-bold rounded-full shadow-sm hover:bg-red-600 mt-6">
                            <Plus size={18} className="mr-2" /> Add Estimate
                        </Button>
                    </CardContent>
                </Card>
            )}
            <div className="text-center mt-4">
                <Button variant="link" onClick={() => setTransactions(hasTransactions ? emptyTransactions : mockTransactions)}>
                    {hasTransactions ? "Switch to Empty State" : "Switch to Data State"}
                </Button>
            </div>
        </div>
    );
}