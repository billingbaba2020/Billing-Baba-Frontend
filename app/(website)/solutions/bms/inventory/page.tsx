import React from 'react';
import { Breadcrumb } from '@/components/ui/breadcrumb';

export default function InventoryPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <Breadcrumb 
                        items={[
                            { label: 'Solutions', href: '/solutions' },
                            { label: 'BMS', href: '/solutions' },
                            { label: 'Inventory' }
                        ]} 
                    />
                    
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">
                        Inventory Management Solution
                    </h1>
                    
                    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Optimize Your Inventory Operations
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Take control of your stock levels, reduce waste, and improve efficiency 
                            with our advanced inventory management system.
                        </p>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h3 className="text-xl font-medium text-gray-800">Key Features</h3>
                                <ul className="space-y-2 text-gray-600">
                                    <li>• Real-time Stock Tracking</li>
                                    <li>• Automated Reorder Points</li>
                                    <li>• Barcode & QR Code Scanning</li>
                                    <li>• Multi-location Support</li>
                                    <li>• Supplier Management</li>
                                    <li>• Demand Forecasting</li>
                                </ul>
                            </div>
                            
                            <div className="space-y-4">
                                <h3 className="text-xl font-medium text-gray-800">Business Impact</h3>
                                <ul className="space-y-2 text-gray-600">
                                    <li>• Reduce Stockouts</li>
                                    <li>• Minimize Excess Inventory</li>
                                    <li>• Improve Cash Flow</li>
                                    <li>• Enhanced Customer Satisfaction</li>
                                    <li>• Data-Driven Decisions</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div className="text-center">
                        <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300">
                            Request Demo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
