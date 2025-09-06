// app/dashboard/reports/page.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
export default function PurchaseEmptyStatePage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center bg-white p-6">
      <Image
        src="https://www.cflowapps.com/wp-content/uploads/2024/04/purchase-requisition.jpg" // Shopping cart image
        alt="Purchase Invoice"
        width={200}
        height={200}
        className="mb-8"
      />
      <p className="max-w-md text-lg text-gray-600 mb-8">
        Make Purchase invoices & Print or share with your customers directly via
        WhatsApp or Email.
      </p>
      <Link href="/dashboard/reports/purchases/add">
        <Button
          size="lg"
          className="bg-gradient-to-b from-yellow-500 to-orange-500 text-white font-bold text-base shadow-lg hover:shadow-xl transition-shadow"
        >
          Add Your First Purchase Invoice
        </Button>
      </Link>
    </div>
  );
}
