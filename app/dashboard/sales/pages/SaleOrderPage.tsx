"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Share2 } from 'lucide-react';

import CreateSaleOrderPage from './CreateSalesOrder';
import ShareStoreModal from '../component/ShareStoreModal';


const SaleOrderIllustration = () => (
    <div className="relative mb-8 flex h-40 w-40 items-center justify-center">
        <div className="absolute h-full w-full rounded-full  blur-xl"></div>
        <svg 
            width="120" 
            height="120" 
            viewBox="0 0 150 150" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className="relative drop-shadow-sm"
        >
            <path d="M32.5 10H107.5C110.261 10 112.5 12.2386 112.5 15V115C112.5 117.761 110.261 120 107.5 120H32.5C29.7386 120 27.5 117.761 27.5 115V15C27.5 12.2386 29.7386 10 32.5 10Z" fill="white" stroke="#E2E8F0" strokeWidth="2"/>
            <rect x="42.5" y="25" width="25" height="4" rx="2" fill="#E2E8F0"/>
            <rect x="42.5" y="42.5" width="50" height="4" rx="2" fill="#CBD5E1"/>
            <rect x="42.5" y="57.5" width="50" height="4" rx="2" fill="#CBD5E1"/>
            <rect x="42.5" y="72.5" width="50" height="4" rx="2" fill="#CBD5E1"/>
            <rect x="42.5" y="87.5" width="35" height="4" rx="2" fill="#CBD5E1"/>
            <circle cx="87.5" cy="30" r="10" fill="#EBF4FF" stroke="#90CDF4" strokeWidth="2"/>
            <path d="M87.5 20V30H97.5" stroke="#90CDF4" strokeWidth="2"/>
            <g transform="rotate(15 105 80)">
                <circle cx="105" cy="80" r="35" fill="#FEF3C7" stroke="#FBBF24" strokeWidth="2.5"/>
                <circle cx="96" cy="70" r="5" fill="#FBBF24"/>
                <circle cx="114" cy="90" r="5" fill="#FBBF24"/>
                <path d="M94.9289 92.0711L115.071 69.9289" stroke="#FBBF24" strokeWidth="5" strokeLinecap="round"/>
                <rect x="92" y="100" width="26" height="3" rx="1.5" fill="#FDBA74"/>
                <rect x="92" y="60" width="26" height="3" rx="1.5" fill="#FDBA74"/>
            </g>
        </svg>
    </div>
);

const OnlineOrderIllustration = () => (
    <div className="relative mb-6 flex h-32 w-32 items-center justify-center">
        <div className="absolute h-full w-full rounded-full bg-red-100/30 blur-xl"></div>
        <svg width="80" height="80" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative drop-shadow-sm">
            <path d="M54 22H10C8.89543 22 8 22.8954 8 24V46C8 47.1046 8.89543 48 10 48H54C55.1046 48 56 47.1046 56 46V24C56 22.8954 55.1046 22 54 22Z" fill="#EBF8FF" stroke="#90CDF4" strokeWidth="2"/>
            <path d="M8 30H56" stroke="#90CDF4" strokeWidth="2" strokeLinecap="round"/>
            <rect x="14" y="36" width="12" height="6" rx="1" fill="#FEF3C7"/>
            <path d="M46 16H18C16.8954 16 16 16.8954 16 18V22H48V18C48 16.8954 47.1046 16 46 16Z" fill="#FFF5E5" stroke="#FDBA74" strokeWidth="2"/>
        </svg>
    </div>
);

const TabButton = ({
  children,
  isActive,
  onClick,
}: {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "py-3 px-4 text-sm font-semibold tracking-wide transition-colors duration-300",
        isActive
          ? "border-b-2 border-sky-500 text-slate-800"
          : "text-gray-400 hover:text-gray-600"
      )}
    >
      {children}
    </button>
  );
};


export default function SaleOrderPage() {
    const [activeTab, setActiveTab] = useState('sale_orders');
    const [isCreatingOrder, setIsCreatingOrder] = useState(false);
    const [isShareModalOpen, setShareModalOpen] = useState(false);

    if (isCreatingOrder) {
        return (
            <div className="w-full bg-slate-50 p-4 sm:p-6 lg:p-8 min-h-screen">
                <CreateSaleOrderPage onCancel={() => setIsCreatingOrder(false)} />
            </div>
        );
    }

    return (
        <>
            <div className="w-full bg-slate-50 p-4 sm:p-6 lg:p-8 min-h-screen">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-6">
                        <TabButton 
                            isActive={activeTab === 'sale_orders'} 
                            onClick={() => setActiveTab('sale_orders')}
                        >
                            SALE ORDERS
                        </TabButton>
                        <TabButton 
                            isActive={activeTab === 'online_orders'} 
                            onClick={() => setActiveTab('online_orders')}
                        >
                            ONLINE ORDERS
                        </TabButton>
                    </nav>
                </div>

                <div className="mt-[-1px] rounded-b-lg border border-t-0 border-gray-200 bg-white shadow-sm">
                    {activeTab === 'sale_orders' && (
                        <div className="flex min-h-[60vh] flex-col items-center justify-center p-16 text-center">
                            <SaleOrderIllustration />
                            <p className="max-w-md text-gray-500">
                                Make & share sale orders & convert them to sale invoice instantly.
                            </p>
                            <Button 
                                className="mt-8 rounded-lg bg-[var(--accent-orange)] hover:bg-[var(--primary-red)] px-6 py-3 font-semibold text-white shadow-md transition-all hover:shadow-lg "
                                onClick={() => setIsCreatingOrder(true)} 
                            >
                                Add Your First Sale Order
                            </Button>
                        </div>
                    )}

                    {activeTab === 'online_orders' && (
                        <div className="flex min-h-[60vh] flex-col items-center justify-center p-16 text-center">
                            <OnlineOrderIllustration />
                            <h3 className="text-lg font-semibold text-gray-800">No Online Orders</h3>
                            <p className="text-sm text-gray-500 mt-1">Share your Online Store to get orders.</p>
                            <Button 
                                className="mt-6 rounded-full bg-red-500 text-white font-bold shadow-md hover:bg-red-600 transition-colors"
                                onClick={() => setShareModalOpen(true)} 
                            >
                                <Share2 size={16} className="mr-2" /> Share Store
                            </Button>
                        </div>
                    )}
                </div>
            </div>
            
            <ShareStoreModal isOpen={isShareModalOpen} onClose={() => setShareModalOpen(false)} />
        </>
    );
}