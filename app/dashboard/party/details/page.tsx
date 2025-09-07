// app/parties/page.tsx  (Or wherever your page is)

"use client"

import React, { useState } from 'react';
import { ChevronDown, Plus, Settings, MoreVertical } from 'lucide-react';
import { PartiesList } from '@/components/dashboard/party/PartiesList';
import { TransactionDetails } from '@/components/dashboard/party/TransactionDetails';
import { EditPartyModal } from '@/components/dashboard/party/EditPartyModal';
import { ShowOptionsModal } from '@/components/dashboard/party/ShowOptionsModal';

// --- Mock Data ---
const partiesData = [
    { name: 'adarsh', amount: 112.00 },
    { name: 'Rohan Sharma', amount: 0.00 },
    { name: 'Priya Patel', amount: 2500.50 },
    { name: 'Amit Singh', amount: -500.00 },
];

const transactionsData = [
    { id: 1, type: 'Sale', number: 1, date: '03/09/2025', total: 1000.00, balance: 112.00 },
    { id: 2, type: 'Purchase', number: 12, date: '01/09/2025', total: 888.00, balance: 0.00 },
    { id: 3, type: 'Sale', number: 2, date: '28/08/2025', total: 500.00, balance: 888.00 },
];


export default function PartiesPage() {
    const [selectedParty, setSelectedParty] = useState('adarsh');
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isOptionsModalOpen, setOptionsModalOpen] = useState(false);

    return (
        <div className="bg-slate-50 min-h-screen w-full font-sans">
            <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2"><h1 className="text-xl font-bold text-gray-800">Parties</h1><ChevronDown className="h-5 w-5 text-gray-600 cursor-pointer" /></div>
                <div className="flex items-center gap-2 sm:gap-4">
                    <button className="bg-red-500 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600 transition-colors"><Plus className="h-5 w-5" /><span className="hidden sm:inline">Add Party</span></button>
                    <button className="p-2 hover:bg-gray-100 rounded-full"><Settings className="h-5 w-5 text-gray-600" /></button>
                    <button className="p-2 hover:bg-gray-100 rounded-full"><MoreVertical className="h-5 w-5 text-gray-600" /></button>
                </div>
            </header>

            <div className="flex flex-col md:flex-row h-[calc(100vh-65px)]">
                <PartiesList 
                    partiesData={partiesData}
                    selectedParty={selectedParty}
                    onSelectParty={setSelectedParty}
                />
                <TransactionDetails
                    selectedParty={selectedParty}
                    transactionsData={transactionsData}
                    onEditParty={() => setEditModalOpen(true)}
                    onShowOptions={() => setOptionsModalOpen(true)}
                />
            </div>

            <EditPartyModal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)} />
            <ShowOptionsModal isOpen={isOptionsModalOpen} onClose={() => setOptionsModalOpen(false)} />
        </div>
    );
}