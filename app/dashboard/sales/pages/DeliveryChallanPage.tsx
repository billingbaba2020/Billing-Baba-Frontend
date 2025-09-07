"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import CreateDeliveryChallanPage from '../component/CreateDeliveryChallanPage'; 


const DeliveryChallanIllustration = () => (
    <div className="relative mb-8 flex h-40 w-40 items-center justify-center">
        <div className="absolute h-full w-full rounded-full bg-sky-100/60 blur-xl"></div>
        <svg width="120" height="120" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative drop-shadow-sm">
            
            <path d="M105 95H120V80C120 77.2386 117.761 75 115 75H105V95Z" fill="#FBBF24"/>
            <path d="M105 95H45V65H95C100.523 65 105 69.4772 105 75V95Z" fill="#A7F3D0"/>
            <circle cx="55" cy="95" r="10" fill="white" stroke="#4A5568" strokeWidth="3"/>
            <circle cx="100" cy="95" r="10" fill="white" stroke="#4A5568" strokeWidth="3"/>
            
            <g transform="translate(-10, -20) rotate(-15 50 50)">
                <path d="M40 20H80C82.7614 20 85 22.2386 85 25V75C85 77.7614 82.7614 80 80 80H40C37.2386 80 35 77.7614 35 75V25C35 22.2386 37.2386 20 40 20Z" fill="white" stroke="#E2E8F0" strokeWidth="2"/>
                <text x="50%" y="35" dominantBaseline="middle" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#4A5568">BILL</text>
                <path d="M45 45H75M45 52H75M45 59H65" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round"/>
                <rect x="52" y="62" width="26" height="12" rx="2" fill="#FECACA" stroke="#F87171" strokeWidth="1.5"/>
                <text x="50%" y="74" dominantBaseline="middle" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#B91C1C">PAID</text>
            </g>
            
            <path d="M45 55L30 65C25 70 30 80 35 75L50 65L45 55Z" fill="#FFEDD5"/>
            <path d="M50 65L35 75L40 80C45 85 55 75 50 70L55 60" stroke="#FDBA74" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </div>
);


const TabButton = ({ children, isActive, onClick }: { children: React.ReactNode; isActive: boolean; onClick: () => void; }) => {
  return (<button onClick={onClick} className={cn("py-3 px-4 text-sm font-semibold tracking-wide", isActive ? "border-b-2 border-sky-500 text-slate-800" : "text-gray-400 hover:text-gray-600")}>{children}</button>);
};


export default function DeliveryChallanPage() {
    const [isCreatingChallan, setIsCreatingChallan] = useState(false);

    if (isCreatingChallan) {
        return (
            <div className="w-full bg-slate-50 p-4 sm:p-6 lg:p-8 min-h-screen">
                 <h1 className="text-2xl font-bold text-gray-800 mb-6">Create Delivery Challan</h1>
                <CreateDeliveryChallanPage onCancel={() => setIsCreatingChallan(false)} />
            </div>
        );
    }

    return (
        <div className="w-full bg-slate-50 p-4 sm:p-6 lg:p-8 min-h-screen">
            {/* टैब नेविगेशन */}
            {/* <div className="border-b border-gray-200">
                <nav className="-mb-px flex">
                    <TabButton isActive={true} onClick={() => {}}>DELIVERY CHALLAN</TabButton>
                </nav>
            </div> */}

            {/* मुख्य कंटेंट */}
            <div className="mt-[-1px] rounded-b-lg border border-t-0 border-gray-200 bg-white shadow-sm">
                <div className="flex min-h-[60vh] flex-col items-center justify-center p-16 text-center">
                    <DeliveryChallanIllustration />
                    <p className="max-w-md text-gray-500">
                        Make & share delivery challan with your customers & convert it to sale whenever you want.
                    </p>
                    <Button 
                        className="mt-8 rounded-lg bg-[var(--accent-orange)] hover:bg-[var(--primary-red)] px-6 py-3 font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-105"
                        onClick={() => setIsCreatingChallan(true)}
                    >
                        Add Your First Delivery Challan
                    </Button>
                </div>
            </div>
        </div>
    );
}