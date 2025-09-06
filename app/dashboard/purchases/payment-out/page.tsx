"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, Plus, Settings, ArrowUpRight } from 'lucide-react';
import CreatePaymentOutModal from '../component/CreatePaymentOutModal'; 
import PaymentOutSettings from '../component/PaymentOutSettings'; 

const PaymentOutIllustration = () => (
    <div className="relative mb-6 flex h-32 w-32 items-center justify-center">
        <div className="absolute h-full w-full rounded-full bg-blue-100/20 blur-xl"></div>
        <svg width="80" height="80" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="28" fill="#EBF8FF"/>
            <rect x="16" y="22" width="32" height="20" rx="3" fill="white" stroke="#90CDF4" strokeWidth="2"/>
            <path d="M20 30H32" stroke="#90CDF4" strokeWidth="2" strokeLinecap="round"/>
            <path d="M38 30H44" stroke="#90CDF4" strokeWidth="2" strokeLinecap="round"/>
            <path d="M20 36H28" stroke="#90CDF4" strokeWidth="2" strokeLinecap="round"/>
            <path d="M34 36H44" stroke="#90CDF4" strokeWidth="2" strokeLinecap="round"/>
        </svg>
    </div>
);
const DatePicker = ({ defaultValue }: { defaultValue: string }) => <Input type="text" defaultValue={defaultValue} className="w-32 bg-white" />;

export default function PaymentOutPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    return (
        <>
            <div className="bg-slate-100 min-h-screen p-4 sm:p-6 space-y-6">
                <header className="flex justify-between items-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="flex items-center gap-2 text-2xl font-bold text-gray-800 p-0 hover:bg-transparent hover:text-gray-800">
                                Payment-Out <ChevronDown className="h-6 w-6 text-gray-500" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent><DropdownMenuRadioGroup value="Payment-Out"><DropdownMenuRadioItem value="Payment-Out">Payment-Out</DropdownMenuRadioItem></DropdownMenuRadioGroup></DropdownMenuContent>
                    </DropdownMenu>
                    <div className="flex items-center gap-3">
                        <Button onClick={() => setIsModalOpen(true)} className="bg-red-500 text-white font-bold rounded-full shadow-sm hover:bg-red-600"><Plus size={18} className="mr-2" />Add Payment-Out</Button>
                        <Button variant="outline" size="icon" onClick={() => setIsSettingsOpen(true)}><Settings className="h-5 w-5 text-gray-600" /></Button>
                    </div>
                </header>
                
                <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
                        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                            <span>Filter by :</span>
                            <Select defaultValue="this-month"><SelectTrigger className="w-36 bg-white"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="this-month">This Month</SelectItem></SelectContent></Select>
                            <DatePicker defaultValue="01/09/2025" />
                            <span>To</span>
                            <DatePicker defaultValue="30/09/2025" />
                            <Select defaultValue="all-firms"><SelectTrigger className="w-36 bg-white"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all-firms">All Firms</SelectItem></SelectContent></Select>
                        </div>
                        <div className="bg-purple-50/50 p-4 rounded-lg border border-purple-200 w-full max-w-xs">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm text-gray-600">Total Amount</p>
                                    <p className="text-2xl font-bold text-gray-800 mt-1">₹ 0</p>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center gap-1 text-sm font-semibold text-green-600">0% <ArrowUpRight className="h-4 w-4" /></div>
                                    <p className="text-xs text-gray-500">vs last month</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">Paid: <span className="font-semibold text-gray-800">₹ 0</span></p>
                        </div>
                    </div>
                    
                    <div className="bg-white p-16 rounded-lg shadow-sm flex flex-col items-center justify-center text-center min-h-[40vh]">
                        <PaymentOutIllustration />
                        <h3 className="text-lg font-semibold text-gray-800">No Transactions to show</h3>
                        <p className="text-sm text-gray-500 mt-1">You haven't added any transactions yet.</p>
                        <Button onClick={() => setIsModalOpen(true)} className="mt-6 rounded-full bg-red-500 text-white font-bold shadow-md hover:bg-red-600"><Plus size={18} className="mr-2" /> Add Payment-Out</Button>
                    </div>
                </div>
            </div>

            <CreatePaymentOutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <PaymentOutSettings isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
        </>
    );
}