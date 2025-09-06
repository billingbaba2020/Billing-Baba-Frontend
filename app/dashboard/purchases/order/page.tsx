"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import CreatePurchaseOrderPage from '../component/CreatePurchaseOrderPage'; // फॉर्म कंपोनेंट

// --- इलस्ट्रेशन कंपोनेंट ---
const PurchaseOrderIllustration = () => (
    <div className="relative mb-8 flex h-40 w-40 items-center justify-center">
        <div className="absolute h-full w-full rounded-full bg-blue-100/50 blur-xl"></div>
        <svg 
            width="100" 
            height="100" 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className="relative drop-shadow-md"
        >
            <g transform="translate(10, 0)">
                <path d="M66.4442 12.0001L81.9998 21.0001L72.9998 88.0001L57.4442 79.0001L66.4442 12.0001Z" fill="white" stroke="#E2E8F0" strokeWidth="2"/>
                <path d="M62 30H76" stroke="#4A5568" strokeWidth="2" strokeLinecap="round"/><path d="M62 36H76" stroke="#4A5568" strokeWidth="2" strokeLinecap="round"/><path d="M62 44H73" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round"/><path d="M62 50H70" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round"/><path d="M62 56H73" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round"/><path d="M62 62H70" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round"/><path d="M62 68H73" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round"/>
            </g>
            <g stroke="#2563EB" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 25H20L28 65H75"/><path d="M22 35H72"/><path d="M30 45H70"/><path d="M38 55H68"/>
                <circle cx="35" cy="78" r="5"/><circle cx="68" cy="78" r="5"/>
            </g>
        </svg>
    </div>
);

// --- मुख्य पेज कंपोनेंट ---
export default function PurchaseOrderPage() {
    const [isCreating, setIsCreating] = useState(false);

    if (isCreating) {
        return (
            <div className="w-full bg-slate-50 p-4 sm:p-6 lg:p-8 min-h-screen">
                 <h1 className="text-2xl font-bold text-gray-800 mb-6">Create Purchase Order</h1>
                <CreatePurchaseOrderPage onCancel={() => setIsCreating(false)} />
            </div>
        );
    }

    return (
        <div className="w-full bg-slate-50 p-4 sm:p-6 lg:p-8 min-h-screen">
            {/* हेडर */}
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex">
                    <button className="py-3 px-4 text-sm font-semibold tracking-wide border-b-2 border-sky-500 text-slate-800">ORDERS</button>
                </nav>
            </div>
            
            {/* मुख्य कंटेंट */}
            <div className="mt-[-1px] rounded-b-lg border border-t-0 border-gray-200 bg-white shadow-sm">
                <div className="flex min-h-[70vh] flex-col items-center justify-center p-16 text-center">
                    <PurchaseOrderIllustration />
                    <p className="max-w-md text-gray-500">
                       Make & share purchase orders with your parties & convert them to purchase bill instantly.
                    </p>
                    <Button 
                        className="mt-8 rounded-md bg-gradient-to-b from-amber-400 to-orange-500 px-6 py-3 font-semibold text-slate-900 shadow-md transition-all hover:shadow-lg hover:brightness-105"
                        onClick={() => setIsCreating(true)}
                    >
                        Add Your First Purchase Order
                    </Button>
                </div>
            </div>
        </div>
    );
}