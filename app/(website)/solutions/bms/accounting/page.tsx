import React from 'react';
import { Breadcrumb } from '@/components/ui/breadcrumb';

export default function AccountingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <Breadcrumb 
                        items={[
                            { label: 'Solutions', href: '/solutions' },
                            { label: 'BMS', href: '/solutions' },
                            { label: 'Accounting' }
                        ]} 
                    />
                    
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">
                        Accounting Management Solution
                    </h1>
                    
                    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            Professional Accounting Made Simple
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Streamline your financial operations with our comprehensive accounting 
                            solution designed for modern businesses.
                        </p>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h3 className="text-xl font-medium text-gray-800">Core Features</h3>
                                <ul className="space-y-2 text-gray-600">
                                    <li>• General Ledger Management</li>
                                    <li>• Accounts Payable & Receivable</li>
                                    <li>• Financial Reporting</li>
                                    <li>• Bank Reconciliation</li>
                                    <li>• Tax Management</li>
                                    <li>• Multi-Currency Support</li>
                                </ul>
                            </div>
                            
                            <div className="space-y-4">
                                <h3 className="text-xl font-medium text-gray-800">Business Benefits</h3>
                                <ul className="space-y-2 text-gray-600">
                                    <li>• Real-time Financial Insights</li>
                                    <li>• Automated Processes</li>
                                    <li>• Compliance & Audit Ready</li>
                                    <li>• Cost Reduction</li>
                                    <li>• Better Decision Making</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div className="text-center">
                        <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300">
                            Start Free Trial
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
