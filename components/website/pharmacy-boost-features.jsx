"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import {
    Ruler,
    QrCode,
    FileText,
    Store,
    Users,
    BarChart3,
    MessageSquare,
    TrendingUp,
    Shield,
    Database
} from "lucide-react";

export default function PharmacyBoostFeatures() {
    const features = [
        {
            icon: Ruler,
            title: "Rack Management"
        },
        {
            icon: QrCode,
            title: "Barcode Scanning"
        },
        {
            icon: FileText,
            title: "Drug License Number"
        },
        {
            icon: Database,
            title: "Drug Type Management"
        },
        {
            icon: Store,
            title: "Multiple Store Management"
        },
        {
            icon: Users,
            title: "Supplier Management"
        },
        {
            icon: BarChart3,
            title: "GST Reports and Tax Filing"
        },
        {
            icon: MessageSquare,
            title: "Transaction Message"
        },
        {
            icon: TrendingUp,
            title: "Item Profit and Loss Reports"
        },
        {
            icon: Shield,
            title: "User Access Control"
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center text-[var(--text-primary)] mb-20">
                    Vyapar Pharmacy Software App Adds Value To Your Pharma Business
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 max-w-7xl mx-auto">
                    {features.map((feature, index) => (
                        <div key={index} className="text-center group">
                            <div className="w-36 h-36 bg-gradient-to-br from-pink-100 to-red-100 rounded-2xl flex items-center justify-center mx-auto mb-10 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
                                <feature.icon className="w-20 h-20 text-pink-600" />
                            </div>
                            <h3 className="font-bold text-[var(--text-primary)] text-lg leading-tight">{feature.title}</h3>
                        </div>
                    ))}
                </div>

                {/* Call to Action Section */}
                <div className="text-center mt-24">
                    <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
                        Maximize Your Pharmacy Business Efficiency with Vyapar Pharmacy Billing Software
                    </h3>
                    <p className="text-[var(--text-secondary)] max-w-4xl mx-auto mb-8">
                        Experience the power of Vyapar's comprehensive pharmacy billing solution designed to streamline your business operations,
                        improve efficiency, and drive growth with professional billing, inventory management, and detailed reporting.
                    </p>
                    <button className="bg-[var(--primary-red)] text-white text-lg font-bold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
                        Download Vyapar Pharmacy App Now
                    </button>
                </div>
            </div>
        </section>
    );
}
