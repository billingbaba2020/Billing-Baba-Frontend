"use client";

import React from 'react';

export default function PharmacyFeatures() {
    return (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6 animate-fade-in">
                        Top Features Tailored For Free Pharmacy Billing Software
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">

                    {/* GST Invoicing for Medicines */}
                    <div className="group animate-fade-in-up">
                        {/* Text Content */}
                        <div className="text-center animate-fade-in-delay">
                            <h3 className="text-3xl font-bold mb-6 text-[var(--text-primary)] group-hover:text-[var(--primary-red)] transition-colors duration-300">
                                GST Invoicing for Medicines
                            </h3>
                            <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
                                <p className="text-lg">
                                    Vyapar is the essential pharma GST billing software that automates and streamlines your invoicing process. With Vyapar, you can generate accurate invoices quickly, stay compliant with GST, reduce manual errors, and customize your invoices to match your pharmacy's branding.
                                </p>
                                <p className="text-base">
                                    Our auto-calculation feature saves you time and eliminates mistakes while ensuring compliance with tax regulations. You can easily add GST rates to your invoices and tailor them to match your pharmacy's specific needs.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Batch and Expiry Management */}
                    <div className="group animate-fade-in-up delay-200">
                        {/* Text Content */}
                        <div className="text-center animate-fade-in-delay delay-200">
                            <h3 className="text-3xl font-bold mb-6 text-[var(--text-primary)] group-hover:text-[var(--primary-red)] transition-colors duration-300">
                                Batch and Expiry Management
                            </h3>
                            <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
                                <p className="text-lg">
                                    Pharmacies deal with a wide range of medicines, each with its own batch number and expiration date. Vyapar's Pharmacy Billing Software offers robust Batch Number and Expiry Management to help you set expiry alerts, filter and sort inventory, and generate detailed reports.
                                </p>
                                <p className="text-base">
                                    You'll receive timely notifications before medicines expire, easily organize your inventory by batch number and expiry date, and track medicine expiration to identify items for return, ensuring product quality and customer safety.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Inventory and Stock Management for Drugs */}
                    <div className="group animate-fade-in-up delay-400">
                        {/* Text Content */}
                        <div className="text-center animate-fade-in-delay delay-400">
                            <h3 className="text-3xl font-bold mb-6 text-[var(--text-primary)] group-hover:text-[var(--primary-red)] transition-colors duration-300">
                                Inventory and Stock Management for Drugs
                            </h3>
                            <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
                                <p className="text-lg">
                                    Vyapar's Pharma Billing Software has the solution to manage out-of-stock issues. You'll always be one step ahead with our Low Stock Inventory Management feature that provides real-time alerts, low stock reports, and efficient reorder scheduling.
                                </p>
                                <p className="text-base">
                                    Get instant notifications when your stock levels are low, see exactly which items are running out and by how much, and plan your reorders efficiently to avoid missed sales and maintain optimal inventory levels.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Multi-Mode Payment Acceptance */}
                    <div className="group animate-fade-in-up delay-600">
                        {/* Text Content */}
                        <div className="text-center animate-fade-in-delay delay-600">
                            <h3 className="text-3xl font-bold mb-6 text-[var(--text-primary)] group-hover:text-[var(--primary-red)] transition-colors duration-300">
                                Multi-Mode Payment Acceptance
                            </h3>
                            <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
                                <p className="text-lg">
                                    Vyapar's free pharmacy billing software offers a variety of payment options, making it easier for pharmacists and customers to complete transactions. Accept cash, credit/debit cards, UPI, and digital wallets for convenient payments.
                                </p>
                                <p className="text-base">
                                    By offering multiple payment options, you can speed up the checkout process, accommodate different preferences, improve sales efficiency, and simplify transactions while enhancing customer satisfaction.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Call to Action Button */}
                <div className="text-center mt-20 animate-fade-in-up delay-800">
                    <button className="bg-[var(--primary-red)] text-white text-xl font-bold px-12 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
                        Install Vyapar Pharmacy App!
                    </button>
                </div>
            </div>
        </section>
    );
}
