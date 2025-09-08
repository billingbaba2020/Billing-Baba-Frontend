// components/EditPartyModal.tsx

"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Settings, X, Info, ChevronDown } from 'lucide-react';

interface EditPartyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const EditPartyModal = ({ isOpen, onClose }: EditPartyModalProps) => {
    const [activeTab, setActiveTab] = useState('GST & Address');
    const [creditLimitEnabled, setCreditLimitEnabled] = useState(false);
    
    const [formData, setFormData] = useState({
        partyName: 'adarsh',
        gstin: '',
        phoneNumber: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white rounded-lg shadow-xl w-full max-w-3xl mx-4"
                >
                    <div className="flex justify-between items-center p-4 border-b">
                        <h2 className="text-lg font-semibold text-gray-800">Edit Party</h2>
                        <div className="flex items-center gap-4">
                            <Settings className="h-5 w-5 text-gray-500 cursor-pointer" />
                            <X className="h-5 w-5 text-gray-500 cursor-pointer" onClick={onClose} />
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                            <div>
                                <label className="text-xs text-gray-600">Party Name *</label>
                                <input type="text" name="partyName" value={formData.partyName} onChange={handleInputChange} className="w-full mt-1 p-2 border border-[var(--text-link-active)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--text-link-active)]/50" />
                            </div>
                            <div className="relative">
                                <label className="text-xs text-gray-600">GSTIN</label>
                                <input type="text" name="gstin" value={formData.gstin} onChange={handleInputChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--text-link-active)]/50" />
                                <Info className="absolute right-3 top-8 h-4 w-4 text-gray-400" />
                            </div>
                            <div>
                                <label className="text-xs text-gray-600">Phone Number</label>
                                <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--text-link-active)]/50" />
                            </div>
                        </div>

                        <div className="flex items-center border-b mb-6">
                            {['GST & Address', 'Credit & Balance', 'Additional Fields'].map(tab => (
                                <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === tab ? 'text-[var(--text-link-active)] border-b-2 border-[var(--text-link-active)]' : 'text-gray-500'}`}>
                                    {tab} {tab === 'Credit & Balance' && <span className="text-xs bg-red-500 text-white rounded-sm px-1.5 py-0.5 ml-1">New</span>}
                                </button>
                            ))}
                        </div>

                        {activeTab === 'GST & Address' && (
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <select className="w-full p-2 border border-gray-300 rounded-md bg-white text-sm"><option>Unregistered/Consumer</option></select>
                                    <select className="w-full p-2 border border-gray-300 rounded-md bg-white text-sm"><option>State</option></select>
                                    <input type="email" placeholder="Email ID" className="w-full p-2 border border-gray-300 rounded-md text-sm" />
                                </div>
                                <div>
                                    <textarea placeholder="Billing Address" rows={5} className="w-full p-2 border border-gray-300 rounded-md text-sm"></textarea>
                                    <button className="text-[var(--text-link-active)] font-medium text-sm mt-2 flex items-center gap-1"><Plus className="h-4 w-4" /> Enable Shipping Address</button>
                                </div>
                            </div>
                        )}
                        
                        {activeTab === 'Credit & Balance' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs text-gray-600">Opening Balance</label>
                                        <input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded-md" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-2"><label className="text-xs text-gray-600">Credit Limit</label><Info className="h-4 w-4 text-gray-400" /></div>
                                        <div className="flex items-center gap-3">
                                            <span className={`text-sm font-medium ${!creditLimitEnabled ? 'text-[var(--text-link-active)]' : 'text-gray-500'}`}>No Limit</span>
                                            <button onClick={() => setCreditLimitEnabled(!creditLimitEnabled)} className={`w-12 h-6 rounded-full p-1 transition-colors ${creditLimitEnabled ? 'bg-[var(--text-link-active)]' : 'bg-gray-300'}`}><div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${creditLimitEnabled ? 'translate-x-6' : 'translate-x-0'}`}></div></button>
                                            <span className={`text-sm font-medium ${creditLimitEnabled ? 'text-[var(--text-link-active)]' : 'text-gray-500'}`}>Custom Limit</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs text-gray-600">As Of Date</label>
                                        <input type="text" value="03/09/2025" className="w-full mt-1 p-2 border border-gray-300 rounded-md" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Additional Fields' && (
                             <div className="space-y-4">
                                {[1, 2, 3, 4].map(fieldNum => (
                                    <div key={fieldNum} className="flex items-center gap-4">
                                        <input type="checkbox" className="h-5 w-5 rounded border-gray-300 text-[var(--text-link-active)] focus:ring-[var(--text-link-active)]" />
                                        <div className="relative flex-grow">
                                            <input type="text" placeholder={`Additional Field ${fieldNum} Name`} className="w-full p-2 border border-gray-300 rounded-md" />
                                            {fieldNum === 4 && <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    <div className="flex justify-end items-center p-4 bg-gray-50 rounded-b-lg gap-3">
                         <button className="text-gray-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-200">Delete</button>
                         <button className="bg-[var(--text-link-active)] text-white font-semibold px-6 py-2 rounded-lg hover:brightness-110 transition">Update</button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};