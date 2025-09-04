import { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  ChevronDown, 
  Filter, 
  MoreVertical, 
  Bell, 
  Plus, 
  FileText, 
  Edit, 
  Trash2 
} from 'lucide-react';
import AdjustItem from '../component/AdjustItem'; // Modal for adjusting items
import AddItemModal from '../component/AddItemModal'; // The new modal for adding items

const ProductsTab = () => {
  // --- STATE MANAGEMENT ---
  const [isAddItemDropdownOpen, setIsAddItemDropdownOpen] = useState(false);
  const [isBulkActionsDropdownOpen, setIsBulkActionsDropdownOpen] = useState(false);
  const [isItemActionsDropdownOpen, setIsItemActionsDropdownOpen] = useState(false);
  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false); // Renamed for clarity
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // **NEW STATE for the AddItemModal**

  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-150px)]">
        {/* --- LEFT SIDEBAR --- */}
        <div className="w-full lg:w-1/4 border-b lg:border-b-0 lg:border-r border-gray-200 bg-white flex flex-col">
          
          <div className="p-3 border-b border-gray-200">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--secondary-blue)]" />
            </div>
          </div>
          
          <div className="p-3 border-b border-gray-200 flex items-center gap-2">
            <div className="relative flex-grow">
              <div className="flex w-full rounded-lg shadow-sm bg-[var(--accent-orange)] text-white font-semibold text-sm overflow-hidden">
                {/* **THIS BUTTON NOW OPENS THE ADD ITEM MODAL** */}
                <button 
                  onClick={() => setIsAddModalOpen(true)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 hover:opacity-90 transition-opacity duration-200 text-left"
                >
                  <Plus size={18} strokeWidth={3} />
                  <span>Add Item</span>
                </button>
                <div className="border-l border-white/30">
                  <button className="p-2 h-full hover:bg-black/10 transition-colors duration-200" onClick={() => setIsAddItemDropdownOpen(prev => !prev)}>
                    <ChevronDown size={20} />
                  </button>
                </div>
              </div>
              {isAddItemDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-lg shadow-xl border border-gray-200 z-20">
                  <ul className="p-1">
                    <li>
                      <Link href="/import-items" className="w-full flex items-center gap-3 text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                        <FileText size={18} className="text-gray-500" />
                        <span>Import Items</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className="relative">
              <button onClick={() => setIsBulkActionsDropdownOpen(prev => !prev)} className="p-2 border border-gray-300 rounded-md hover:bg-gray-100">
                <MoreVertical size={20} className="text-gray-600" />
              </button>
              {isBulkActionsDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-20">
                  <ul className="p-1 text-sm text-gray-700">
                    {['Bulk Inactive', 'Bulk Active', 'Bulk Assign Code', 'Assign Units', 'Bulk Update Items'].map(item => (
                       <li key={item}><button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md">{item}</button></li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex-grow overflow-y-auto">
            <div className="flex justify-between items-center text-xs text-gray-500 font-bold px-4 py-2 bg-gray-50 border-b">
              <div className="flex items-center">ITEM <Filter size={12} className="ml-1" /></div>
              <div className="flex items-center">QUANTITY <Filter size={12} className="ml-1" /></div>
            </div>
            <ul>
              <li className="bg-blue-50 border-l-4 border-[var(--secondary-blue)]">
                <div className="flex justify-between items-center px-4 py-3 cursor-pointer">
                  <span className="text-sm font-medium text-gray-800">Sample Item</span>
                  <span className="text-sm font-semibold text-red-600">-10</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* --- MAIN CONTENT --- */}
        <div className="w-full lg:w-3/4 bg-gray-50 flex flex-col p-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
              <h2 className="text-lg font-semibold text-gray-800 pt-1">Sample Item ↪</h2>
              <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-start">
                <button 
                  onClick={() => setIsAdjustModalOpen(true)} 
                  className="bg-[var(--secondary-blue)] text-white px-4 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity duration-200"
                >
                  ADJUST ITEM
                </button>
                <div className="relative">
                  <button onClick={() => setIsItemActionsDropdownOpen(prev => !prev)} className="p-2 text-gray-500 hover:text-gray-800">
                    <MoreVertical size={20} />
                  </button>
                  {isItemActionsDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-lg shadow-xl border border-gray-200 z-20">
                      <ul className="p-1 text-sm text-gray-700">
                        <li><button className="w-full flex items-center gap-3 text-left px-3 py-2 hover:bg-gray-100 rounded-md"><Edit size={16}/> View/Edit</button></li>
                        <li><button className="w-full flex items-center gap-3 text-left px-3 py-2 hover:bg-gray-100 rounded-md text-red-600"><Trash2 size={16}/> Delete</button></li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap lg:space-x-8 text-sm gap-y-3 mt-4">
              <div><span className="text-gray-500">SALE PRICE: </span><span className="font-semibold text-gray-800">₹ 100.00</span><span className="text-gray-400 text-xs"> (excl)</span></div>
              <div><span className="text-gray-500">PURCHASE PRICE: </span><span className="font-semibold text-gray-800">₹ 0.00</span><span className="text-gray-400 text-xs"> (excl)</span></div>
              <div className="flex items-center text-red-600"><Bell size={14} className="mr-1" /><span className="font-semibold">STOCK QUANTITY: -10</span></div>
              <div><span className="text-gray-500">STOCK VALUE: </span><span className="font-semibold text-green-600">₹ 0.00</span></div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200 flex-grow flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                <h3 className="text-base font-semibold text-gray-700">TRANSACTIONS</h3>
                <div className="relative w-full sm:w-1/2 lg:w-1/3"><input type="text" placeholder="Search..." className="w-full pl-4 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--secondary-blue)]" /><Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} /></div>
            </div>
            <div className="overflow-x-auto flex-grow">
              <table className="w-full text-sm text-left text-gray-600"><thead className="text-xs text-gray-700 uppercase bg-gray-100 sticky top-0"><tr><th scope="col" className="p-3">TYPE</th><th scope="col" className="p-3">INVOICE/R...</th><th scope="col" className="p-3">NAME</th><th scope="col" className="p-3">DATE</th><th scope="col" className="p-3">QUANTITY</th><th scope="col" className="p-3">PRICE/UNIT</th><th scope="col" className="p-3">STATUS</th><th scope="col" className="p-3"><span className="sr-only">Edit</span></th></tr></thead><tbody><tr className="bg-white border-b hover:bg-gray-50"><td className="p-3"><span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-2"></span>Sale</td><td className="p-3">1</td><td className="p-3">adarsh</td><td className="p-3">03/09/2025</td><td className="p-3">10</td><td className="p-3">₹ 100.00</td><td className="p-3"><span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">Partial</span></td><td className="p-3"><button><MoreVertical size={16} /></button></td></tr></tbody></table>
            </div>
          </div>
        </div>
      </div>

      {/* --- RENDER THE MODALS --- */}
      <AdjustItem 
        isOpen={isAdjustModalOpen} 
        onClose={() => setIsAdjustModalOpen(false)} 
      />
      
      {/* **NEW MODAL IS RENDERED HERE** */}
      <AddItemModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
    </>
  );
};

export default ProductsTab;