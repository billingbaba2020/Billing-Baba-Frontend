"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function PharmacyHero() {
    return (
        <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
            <div className="container mx-auto px-4 text-center">
                <h1 className="mb-6 font-bold text-4xl sm:text-5xl md:text-6xl leading-tight drop-shadow-sm text-[var(--text-primary)]">
                    Pharmacy Billing Software
                </h1>
                <p className="text-base sm:text-lg md:text-xl font-bold leading-relaxed text-[var(--text-secondary)] mb-8">
                    Run your pharmacy smoother! Create invoices in 20 seconds, manage medicines & inventory, track sales & gain insights. Get paid 90% faster with <strong>Vyapar Pharma App</strong>.
                </p>
                <Button
                    size="lg"
                    className="text-lg font-bold px-8 py-4 rounded-lg shadow-lg transition-all duration-300 bg-[var(--primary-red)] text-[var(--text-on-dark)] border-[var(--primary-red)]"
                >
                    <Download className="mr-3 h-6 w-6" />
                    Download Pharmacy Software
                </Button>
            </div>
        </section>
    );
}
