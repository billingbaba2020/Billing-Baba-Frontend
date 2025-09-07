// components/PartiesList.tsx

"use client";

import React from 'react';
import { Search, Filter, ArrowUpDown, ChevronRight, Contact } from 'lucide-react';

interface Party {
    name: string;
    amount: number;
}

interface PartiesListProps {
    partiesData: Party[];
    selectedParty: string;
    onSelectParty: (name: string) => void;
}

export const PartiesList = ({ partiesData, selectedParty, onSelectParty }: PartiesListProps) => {
    return (
        <aside className="w-full md:w-1/3 lg:w-1/4 bg-white border-r border-gray-200 flex flex-col">
            <div className="p-3 border-b border-gray-200">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input type="text" placeholder="Search Party Name" className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[var(--text-link-active)] text-sm"/>
                </div>
            </div>
            <div className="px-4 py-2 flex justify-between items-center bg-gray-50 text-xs font-medium text-gray-500">
                <div className="flex items-center gap-1 cursor-pointer hover:text-gray-800"><span>Party Name</span><ArrowUpDown className="h-3 w-3" /></div>
                <div className="flex items-center gap-1 cursor-pointer hover:text-gray-800"><Filter className="h-4 w-4" /><span>Amount</span></div>
            </div>
            <div className="flex-grow overflow-y-auto">
                {partiesData.map(party => (
                    <div key={party.name} onClick={() => onSelectParty(party.name)} className={`flex justify-between items-center px-4 py-3 cursor-pointer text-sm transition-colors ${selectedParty === party.name ? 'bg-[var(--text-link-active)]/10' : 'hover:bg-gray-50'}`}>
                        <span className={`font-medium ${selectedParty === party.name ? 'text-[var(--text-link-active)]' : 'text-gray-700'}`}>{party.name}</span>
                        <span className={` ${party.amount < 0 ? 'text-red-500' : 'text-gray-600'}`}>{party.amount.toFixed(2)}</span>
                    </div>
                ))}
            </div>
            <div className="p-3 mt-auto border-t border-gray-200">
                <a href="#" className="bg-green-50 text-green-800 p-3 rounded-lg flex items-center justify-between hover:bg-green-100 transition-colors group">
                    <div className="flex items-center gap-3"><Contact className="h-6 w-6 text-green-600" /><div><p className="text-sm">Easily convert your <span className="font-bold">Phone contacts</span> into parties</p></div></div>
                    <ChevronRight className="h-5 w-5 text-green-500 group-hover:translate-x-1 transition-transform" />
                </a>
            </div>
        </aside>
    );
};