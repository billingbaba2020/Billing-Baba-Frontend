"use client";

import React from 'react';
import { Ruler, QrCode, FileText, Store, Users, BarChart3, MessageSquare, TrendingUp, Shield, Database, Clock, AlertTriangle } from "lucide-react";

export default function PharmacyAdvancedFeatures() {
    const advancedFeatures = [
        {
            title: "Easy Rack Management",
            description: "Vyapar's Billing Software for Pharmacy offers a powerful Rack Wise Management feature to help you organise and manage your pharma inventory efficiently. By categorising your products based on their rack locations, you can locate items quickly, reduce retrieval times, and monitor stock levels.",
            additionalInfo: "With Rack Wise Management pharma bill app, you can maintain a well-organised pharmacy in India, enhance customer satisfaction, and minimise the risk of stockouts and overstocking.",
            image: "/is/retails/inventory_tracking.png",
            imageAlt: "Rack Management Interface",
            icon: Ruler,
            features: [
                "Locate items quickly",
                "Reduce retrieval times",
                "Monitor stock levels",
                "Organize inventory efficiently"
            ]
        },
        {
            title: "Barcode Scanning for Faster Billing",
            description: "In a pharmacy, it's crucial to avoid errors and confusion when identifying and billing medicines. Vyapar's Barcode Support feature makes this process simple and efficient. Use Vyapar's barcode scanner to quickly identify medicines with automatic recognition.",
            additionalInfo: "With Vyapar's Pharma Billing Software's Barcode Support, do fast billing, avoid errors, save time, and improve accuracy by streamlining your pharmacy operations and providing a better customer experience.",
            image: "/is/retails/quick_billing.png",
            imageAlt: "Barcode Scanning Interface",
            icon: QrCode,
            features: [
                "Scan barcodes quickly",
                "Automatic recognition",
                "Edit details easily",
                "Fast billing process"
            ]
        },
        {
            title: "Drug License Number",
            description: "As a pharmacy, it's essential to comply with industry regulations. One requirement is to display your drug license number on invoices. Vyapar's Pharma Software's Custom Additional Fields feature makes it easy to add your drug license number and customize your bills.",
            additionalInfo: "With Vyapar Billing software for Pharmacy, you can ensure compliance and maintain a professional image for your pharma business while meeting regulatory standards.",
            image: "/is/retails/busines_task_report.png",
            imageAlt: "Drug License Management",
            icon: FileText,
            features: [
                "Add drug license number",
                "Customize bills",
                "Meet regulatory standards",
                "Professional invoices"
            ]
        },
        {
            title: "Drug Type Management By Item Category",
            description: "Pharmacies need to store and handle different drug types such as tablets, capsules, and syrups. Vyapar's best pharmacy billing software makes this process easy by allowing you to create custom categories, filter and search medicines, and generate reports.",
            additionalInfo: "By organising your inventory by drug type, you can ensure proper storage and easy access to medicines while analyzing sales and profits by category.",
            image: "/is/retails/inventory_tracking.png",
            imageAlt: "Drug Type Management",
            icon: Database,
            features: [
                "Create custom categories",
                "Filter and search",
                "Generate reports",
                "Organize by drug type"
            ]
        },
        {
            title: "Multiple Store Management",
            description: "Managing multiple pharmacies can be challenging. Vyapar's billing software for pharmacy simplifies management by allowing you to create and link businesses, sync data across stores, compare performance, and get insights into your overall business operations.",
            additionalInfo: "With Vyapar, managing multiple pharmacies has become easier, allowing you to track stock, sales, and expenses across all locations while analyzing the performance of each store.",
            image: "/is/retails/multi_device.png",
            imageAlt: "Multiple Store Management",
            icon: Store,
            features: [
                "Create and link businesses",
                "Sync data across stores",
                "Compare performance",
                "Get business insights"
            ]
        },
        {
            title: "Supplier Management",
            description: "Vyapar's Supplier Management feature simplifies medicine procurement and vendor relationships. Key benefits include centralized supplier database, purchase order management, reorder notifications, payment and credit management, and purchase return management.",
            additionalInfo: "With Vyapar pharmacy software, pharmacies can efficiently manage suppliers, ensure timely stock availability, and maintain accurate inventory records.",
            image: "/is/retails/quick_billing.png",
            imageAlt: "Supplier Management",
            icon: Users,
            features: [
                "Centralized supplier database",
                "Purchase order management",
                "Reorder notifications",
                "Payment tracking"
            ]
        },
        {
            title: "GST Reports and Tax Filing",
            description: "Vyapar's pharmacy billing software ensures 100% GST compliance effortlessly. The software automates tax calculations, generates GST-compliant invoices, and ensures all transactions meet regulatory standards.",
            additionalInfo: "This reduces the risk of manual errors and makes it easier for pharmacy owners to stay tax-ready throughout the year while maintaining compliance with Indian tax regulations.",
            image: "/is/retails/busines_task_report.png",
            imageAlt: "GST Reports and Tax Filing",
            icon: BarChart3,
            features: [
                "Automated tax calculations",
                "GST-compliant invoices",
                "Regulatory compliance",
                "Error-free reporting"
            ]
        },
        {
            title: "Transaction Message",
            description: "Vyapar's Transaction Message feature allows you to add custom messages to your invoices and receipts. This helps you communicate important information to customers, such as dosage instructions, side effects, or special offers.",
            additionalInfo: "You can customize messages for different types of transactions and ensure that your customers receive all necessary information with their purchases.",
            image: "/is/retails/quick_billing.png",
            imageAlt: "Transaction Message",
            icon: MessageSquare,
            features: [
                "Custom transaction messages",
                "Dosage instructions",
                "Side effect warnings",
                "Special offers"
            ]
        },
        {
            title: "Item Profit and Loss Reports",
            description: "Vyapar's Item Profit and Loss Reports provide detailed insights into the profitability of each medicine and category. This helps you identify your best-performing products, understand pricing strategies, and make informed business decisions.",
            additionalInfo: "With comprehensive profit analysis, you can optimize your inventory, adjust pricing, and focus on products that generate the highest returns for your pharmacy business.",
            image: "/is/retails/busines_task_report.png",
            imageAlt: "Profit and Loss Reports",
            icon: TrendingUp,
            features: [
                "Detailed profit analysis",
                "Product performance insights",
                "Pricing strategy optimization",
                "Business decision support"
            ]
        },
        {
            title: "User Access Control",
            description: "Vyapar's User Access Control feature allows you to manage different user roles and permissions within your pharmacy software. You can assign specific access levels to staff members, ensuring data security and operational efficiency.",
            additionalInfo: "This feature helps maintain data integrity, control access to sensitive information, and ensure that each user can only perform tasks relevant to their role in the pharmacy.",
            image: "/is/retails/multi_device.png",
            imageAlt: "User Access Control",
            icon: Shield,
            features: [
                "Role-based permissions",
                "Data security",
                "Operational efficiency",
                "Access level management"
            ]
        }
    ];

    return (
        <section className="py-20 bg-[var(--background-section-gray)]">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center text-[var(--text-primary)] mb-16">
                    Advanced Pharmacy Billing Software Features to Enhance Business Growth
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {advancedFeatures.map((feature, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-[var(--border-color)]">
                            {/* Image Section */}
                            <div className="relative">
                                <div className="bg-gradient-to-br from-[var(--background-section-gray)] to-white rounded-t-2xl p-6">
                                    <img
                                        src={feature.image}
                                        alt={feature.imageAlt}
                                        className="w-full h-48 object-cover rounded-lg drop-shadow-lg"
                                    />
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-6 space-y-4">
                                {/* Header with Icon */}
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[var(--background-faq-accent)] to-[var(--background-faq-accent)] rounded-xl flex items-center justify-center shadow-md">
                                        <feature.icon className="w-6 h-6 text-[var(--primary-red)]" />
                                    </div>
                                    <h3 className="text-xl font-bold text-[var(--text-primary)] leading-tight">
                                        {feature.title}
                                    </h3>
                                </div>
                                
                                {/* Description */}
                                <div className="space-y-3 text-[var(--text-secondary)]">
                                    <p className="text-sm leading-relaxed">
                                        {feature.description}
                                    </p>
                                    <p className="text-xs leading-relaxed opacity-80">
                                        {feature.additionalInfo}
                                    </p>
                                </div>

                                {/* Feature List */}
                                <div className="grid grid-cols-2 gap-2 mt-4">
                                    {feature.features.map((item, idx) => (
                                        <div key={idx} className="flex items-center space-x-2">
                                            <div className="w-1.5 h-1.5 bg-[var(--primary-red)] rounded-full"></div>
                                            <span className="text-xs font-medium text-[var(--text-primary)]">
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Learn More Button */}
                                <button className="w-full mt-4 bg-transparent border-2 border-[var(--primary-red)] text-[var(--primary-red)] text-sm font-semibold py-2 px-4 rounded-lg hover:bg-[var(--primary-red)] hover:text-[var(--text-on-dark)] transition-all duration-300">
                                    Learn More
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
