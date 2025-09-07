"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import CreateExpensePage from '../component/CreateExpensePage'; // फॉर्म कंपोनेंट
import { Plus } from 'lucide-react';

// --- नया इलस्ट्रेशन कंपोनेंट ---
const ExpenseIllustration = () => (
    <div className="relative mb-8 flex h-32 w-32 items-center justify-center">
        <div className="absolute h-full w-full rounded-full bg-gray-100 blur-xl"></div>
        <svg width="80" height="80" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative text-gray-300">
            <path d="M54 20H10C7.79086 20 6 21.7909 6 24V46C6 48.2091 7.79086 50 10 50H54C56.2091 50 58 48.2091 58 46V24C58 21.7909 56.2091 20 54 20Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 28H18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            {/* यहाँ 'd' एट्रिब्यूट में `.ts` नहीं है */}
            <path d="M42 32H58V42C58 44.2091 56.2091 46 54 46H42V32Z" fill="#E5E7EB"/>
            <circle cx="48" cy="36" r="4" fill="white"/>
            <text x="48" y="37" textAnchor="middle" dominantBaseline="middle" fontSize="6" fontWeight="bold" fill="#4B5563">₹</text>
            {/* --- 1. यहाँ से `.ts` हटाया गया है --- */}
            <path d="M22 14L16 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </div>
);


// --- मुख्य पेज कंपोनेंट ---
export default function ExpensesPage() {
    const [isCreating, setIsCreating] = useState(false);

    if (isCreating) {
        return (
            <div className="w-full bg-slate-50 p-4 sm:p-6 lg:p-8 min-h-screen">
                <CreateExpensePage onCancel={() => setIsCreating(false)} />
            </div>
        );
    }

    return (
        <div className="w-full bg-slate-50 p-4 sm:p-6 lg:p-8 min-h-screen">
            <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="flex min-h-[70vh] flex-col items-center justify-center p-16 text-center">
                    <ExpenseIllustration />
                    <h3 className="text-xl font-semibold text-gray-800">Add your 1st Expense</h3>
                    <p className="max-w-md text-gray-500 mt-2">
                        Record your business expenses & know your real profits.
                    </p>
                    <Button 
                        className="mt-8 rounded-full bg-red-500 text-white font-bold shadow-lg hover:bg-red-600 transition-transform hover:scale-105 px-6 py-3"
                        onClick={() => setIsCreating(true)}
                    >
                        <Plus size={20} className="mr-2" /> Add Expenses
                    </Button>
                </div>
            </div>
        </div>
    );
}