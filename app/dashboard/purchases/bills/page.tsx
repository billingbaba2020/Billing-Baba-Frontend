"use client";

import React,{ useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import CreatePurchaseInvoicePage from '../component/CreatePurchaseInvoicePage';

const PurchaseInvoiceIllustration = () => (
    <div className="relative mb-8 flex h-40 w-40 items-center justify-center">
        <svg viewBox="0 0 200 200" className="absolute h-full w-full">
            <path 
                fill="#EBF8FF"
                d="M 50, 150 Q 20, 100 50, 50 Q 100, 0 150, 50 Q 180, 100 150, 150 Q 100, 200 50, 150 z"
            />
        </svg>

        <svg 
            width="100" 
            height="100" 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className="relative drop-shadow-md"
        >
            <g transform="translate(10, 0)">
                <path 
                    d="M66.4442 12.0001L81.9998 21.0001L72.9998 88.0001L57.4442 79.0001L66.4442 12.0001Z" 
                    fill="white" 
                    stroke="#E2E8F0" 
                    strokeWidth="2"
                />
                <path d="M62 30H76" stroke="#4A5568" strokeWidth="2" strokeLinecap="round"/>
                <path d="M62 36H76" stroke="#4A5568" strokeWidth="2" strokeLinecap="round"/>
                <path d="M62 44H73" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M62 50H70" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M62 56H73" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M62 62H70" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M62 68H73" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round"/>
                 <path d="M78 44H78.01" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round"/>
                <path d="M75 50H75.01" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round"/>
                <path d="M78 56H78.01" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round"/>
                <path d="M75 62H75.01" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round"/>
                <path d="M78 68H78.01" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round"/>
            </g>

            <g stroke="#2563EB" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 25H20L28 65H75"/>
                <path d="M22 35H72"/>
                <path d="M30 45H70"/>
                <path d="M38 55H68"/>
                <circle cx="35" cy="78" r="5"/>
                <circle cx="68" cy="78" r="5"/>
            </g>
        </svg>
    </div>
);


export default function PurchaseBills() {
    const [isCreating, setIsCreating] = useState(false);

    if (isCreating) {
        return (
            <div className="w-full bg-slate-50 p-4 sm:p-6 lg:p-8 min-h-screen">
                 <h1 className="text-2xl font-bold text-gray-800 mb-6">Create Purchase Invoice</h1>
                <CreatePurchaseInvoicePage onCancel={() => setIsCreating(false)} />
            </div>
        );
    }

    return (
        <div className="w-full bg-slate-50 p-4 sm:p-6 lg:p-8 min-h-screen">
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="flex min-h-[70vh] flex-col items-center justify-center p-16 text-center">
                    <PurchaseInvoiceIllustration />
                    <p className="max-w-md text-gray-500">
                        Make Purchase invoices & Print or share with your customers directly via WhatsApp or Email.
                    </p>
                    <Button 
                        className="mt-8 rounded-xl bg-gradient-to-b bg-[var(--accent-orange)] hover:bg-[var(--primary-red)] px-6 py-3  text-white shadow-md transition-all hover:shadow-lg hover:brightness-105"
                        onClick={() => setIsCreating(true)}
                    >
                        Add Your First Purchase Invoice
                    </Button>
                </div>
            </div>
        </div>
    );
}