"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X, Search, Camera, Plus, Calendar, Info, MinusCircle, ChevronDown } from 'lucide-react';
import SelectUnitModal from './SelectUnitModal'; 
import AddCategoryModal from './AddCategoryModal'; 
import ItemSettingsSlideOver from './ItemSettingsSlideOver';

// --- Data & Helper Components ---

const taxRates = [ "None", "IGST@0%", "GST@0%", "IGST@0.25%", "GST@0.25%", "IGST@3%", "GST@3%", "IGST@5%", "GST@5%", "IGST@12%", "GST@12%", "IGST@18%", "GST@18%", "IGST@28%", "GST@28%", "Exempt" ];

const SplitInput = ({ placeholder, options }: { placeholder: string, options: string[] }) => (
    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
        <input 
            type="text" 
            placeholder={placeholder} 
            className="w-full p-2 border-none focus:ring-0 text-sm"
        />
        <select className="bg-white p-2 border-none border-l border-gray-300 focus:ring-0 text-sm text-gray-600">
            {options.map(option => <option key={option}>{option}</option>)}
        </select>
    </div>
);

const ItemTypeToggle = ({ type, setType }: { type: string, setType: (type: 'Product' | 'Service') => void }) => (
    <div className="flex items-center p-1 bg-gray-200 rounded-full">
        <button 
            onClick={() => setType('Product')}
            className={`px-4 py-1 text-sm font-semibold rounded-full transition-colors ${type === 'Product' ? 'bg-white text-blue-600 shadow' : 'text-gray-600'}`}
        >
            Product
        </button>
        <button 
            onClick={() => setType('Service')}
            className={`px-4 py-1 text-sm font-semibold rounded-full transition-colors ${type === 'Service' ? 'bg-white text-blue-600 shadow' : 'text-gray-600'}`}
        >
            Service
        </button>
    </div>
);

// --- Main AddItemModal Component ---

interface AddItemModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddItemModal({ isOpen, onClose }: AddItemModalProps) {
    // Main states
    const [itemType, setItemType] = useState<'Product' | 'Service'>('Product');
    const [activeTab, setActiveTab] = useState('Pricing');
    const [showWholesale, setShowWholesale] = useState(false);

    // States for all modals and dropdowns
    const [isUnitModalOpen, setUnitModalOpen] = useState(false);
    const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
    const [isCategoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false); 
    
    // State for categories
    const [categories, setCategories] = useState([ { id: 1, name: 'grocery' }, { id: 2, name: 'uygfgh' } ]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

    const handleAddCategory = (categoryName: string) => {
        const newCategory = { id: Date.now(), name: categoryName };
        setCategories(prev => [...prev, newCategory]);
        setSelectedCategory(newCategory.id);
    };

    if (!isOpen) return null;

    // Reusable UI block for the pricing tab
    const PricingContent = () => (
        <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-4 text-base">Sale Price</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SplitInput placeholder="Sale Price" options={['Without Tax', 'With Tax']} />
                    <SplitInput placeholder="Disc. On Sale Price..." options={['Amount', 'Percentage']} />
                </div>
                {!showWholesale && (
                    <button onClick={() => setShowWholesale(true)} className="text-blue-600 font-semibold text-sm mt-4 flex items-center gap-1 hover:text-blue-800"><Plus className="h-4 w-4" /> Add Wholesale Price</button>
                )}
                {showWholesale && (
                    <div className="mt-6 pt-4 border-t">
                        <div className="flex justify-between items-center mb-4"><h3 className="font-semibold text-gray-800 text-base">Wholesale Price</h3><button onClick={() => setShowWholesale(false)} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-600"><MinusCircle className="h-4 w-4" /> Remove</button></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><SplitInput placeholder="Wholesale Price" options={['Without Tax', 'With Tax']} /><div className="relative"><input type="text" placeholder="Minimum Wholesale Qty" className="w-full p-2 border border-gray-300 rounded-md text-sm pr-8" /><Info className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" /></div></div>
                    </div>
                )}
            </div>
            {itemType === 'Product' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-200"><h3 className="font-semibold text-gray-800 mb-4 text-base">Purchase Price</h3><SplitInput placeholder="Purchase Price" options={['Without Tax', 'With Tax']} /></div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200"><h3 className="font-semibold text-gray-800 mb-4 text-base">Taxes</h3><div><label className="text-xs text-gray-500">Tax Rate</label><select className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-white text-sm">{taxRates.map(rate => (<option key={rate} value={rate}>{rate}</option>))}</select></div></div>
                </div>
            )}
            {itemType === 'Service' && (
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-4 text-base">Taxes</h3>
                    <div><label className="text-xs text-gray-500">Tax Rate</label><select className="w-full md:w-1/2 mt-1 p-2 border border-gray-300 rounded-md bg-white text-sm">{taxRates.map(rate => (<option key={rate} value={rate}>{rate}</option>))}</select></div>
                </div>
            )}
        </div>
    );
    
    // Custom Dropdown for Categories
    const CategoryDropdown = () => (
        <div>
            <label className="text-xs text-gray-500">Category</label>
            <div className="relative mt-1">
                <button onClick={() => setCategoryDropdownOpen(!isCategoryDropdownOpen)} className="w-full p-2 border border-gray-300 rounded-md bg-white text-sm text-left flex justify-between items-center">
                    <span>{selectedCategory ? categories.find(c => c.id === selectedCategory)?.name : 'Select Category'}</span><ChevronDown className={`h-4 w-4 transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isCategoryDropdownOpen && (
                    <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 p-2 space-y-2">
                        <button onClick={() => { setCategoryModalOpen(true); setCategoryDropdownOpen(false); }} className="w-full text-left text-sm text-blue-600 font-semibold flex items-center gap-2 p-1 hover:bg-gray-100 rounded"><Plus className="h-4 w-4" /> Add New Category</button>
                        <div className="space-y-1">{categories.map(cat => (<div key={cat.id} className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded"><input type="checkbox" id={`cat-${cat.id}`} checked={selectedCategory === cat.id} onChange={() => setSelectedCategory(cat.id)} className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500" /><label htmlFor={`cat-${cat.id}`} className="text-sm text-gray-700 w-full">{cat.name}</label></div>))}</div>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-auto flex flex-col h-full max-h-[90vh]">
                            <div className="flex justify-between items-center p-4 border-b border-gray-200 flex-shrink-0">
                                <div className="flex items-center gap-4"><h2 className="text-lg font-semibold text-gray-800">Add Item</h2><ItemTypeToggle type={itemType} setType={setItemType} /></div>
                                <div className="flex items-center gap-4">
                                    <Settings onClick={() => setIsSettingsOpen(true)} className="h-5 w-5 text-gray-500 cursor-pointer" />
                                    <X className="h-5 w-5 text-gray-500 cursor-pointer" onClick={onClose} />
                                </div>
                            </div>
                            <div className="p-6 overflow-y-auto flex-grow bg-slate-50">
                                {itemType === 'Product' ? (
                                    <>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end mb-6">
                                            <div><label className="text-xs text-gray-500">Item Name *</label><input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm"/></div>
                                            <div><label className="text-xs text-gray-500">Item HSN</label><div className="relative"><input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm" /><Search className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" /></div></div>
                                            <button onClick={() => setUnitModalOpen(true)} className="w-full bg-blue-100 text-blue-600 font-semibold py-2 rounded-md hover:bg-blue-200 text-sm">Select Unit</button>
                                            <button className="flex items-center justify-center gap-2 text-blue-600 font-semibold text-sm"><Camera className="h-5 w-5" /> Add Item Image</button>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end mb-8">
                                            <CategoryDropdown />
                                            <div><label className="text-xs text-gray-500">Item Code</label><div className="flex items-center gap-2"><input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm" /><button className="text-blue-600 font-semibold text-xs whitespace-nowrap px-2 py-1 border border-blue-600 rounded-md">Assign Code</button></div></div>
                                        </div>
                                        <div className="flex items-center border-b mb-6 bg-white px-2"><button onClick={() => setActiveTab('Pricing')} className={`px-4 py-2 text-sm font-semibold transition-colors ${activeTab === 'Pricing' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500'}`}>Pricing</button><button onClick={() => setActiveTab('Stock')} className={`px-4 py-2 text-sm font-semibold transition-colors ${activeTab === 'Stock' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500'}`}>Stock</button></div>
                                        {activeTab === 'Pricing' && <PricingContent />}
                                        {activeTab === 'Stock' && ( <div className="bg-white p-4 rounded-lg border"><div className="grid grid-cols-1 sm:grid-cols-3 gap-6"><div><label className="text-xs text-gray-500">Opening Quantity</label><input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm" /></div><div><label className="text-xs text-gray-500">At Price</label><input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm" /></div><div><label className="text-xs text-gray-500">As Of Date</label><div className="relative"><input type="text" value="03/09/2025" className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm" /><Calendar className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" /></div></div><div><label className="text-xs text-gray-500">Min Stock To Maintain</label><input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm" /></div><div><label className="text-xs text-gray-500">Location</label><input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm" /></div></div></div>)}
                                    </>
                                ) : (
                                    <>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end mb-6">
                                            <div><label className="text-xs text-gray-500">Service Name *</label><input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm"/></div>
                                            <div><label className="text-xs text-gray-500">Service SAC</label><div className="relative"><input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm" /><Search className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" /></div></div>
                                            <button onClick={() => setUnitModalOpen(true)} className="w-full bg-blue-100 text-blue-600 font-semibold py-2 rounded-md hover:bg-blue-200 text-sm">Select Unit</button>
                                            <button className="flex items-center justify-center gap-2 text-blue-600 font-semibold text-sm"><Camera className="h-5 w-5" /> Add Item Image</button>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end mb-8">
                                            <CategoryDropdown />
                                            <div><label className="text-xs text-gray-500">Service Code</label><div className="flex items-center gap-2"><input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded-md text-sm" /><button className="text-blue-600 font-semibold text-xs whitespace-nowrap px-2 py-1 border border-blue-600 rounded-md">Assign Code</button></div></div>
                                        </div>
                                        <div className="flex items-center border-b mb-6 bg-white px-2"><button className={`px-4 py-2 text-sm font-semibold transition-colors text-red-600 border-b-2 border-red-600`}>Pricing</button></div>
                                        <PricingContent />
                                    </>
                                )}
                            </div>
                            <div className="flex justify-end items-center p-4 bg-white border-t border-gray-200 rounded-b-lg gap-3 flex-shrink-0"><button className="bg-white text-gray-700 font-semibold px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-100">Save & New</button><button className="bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg hover:bg-blue-700">Save</button></div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <SelectUnitModal isOpen={isUnitModalOpen} onClose={() => setUnitModalOpen(false)} />
            <AddCategoryModal isOpen={isCategoryModalOpen} onClose={() => setCategoryModalOpen(false)} onAddCategory={handleAddCategory} />
            <ItemSettingsSlideOver isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
        </>
    );
}