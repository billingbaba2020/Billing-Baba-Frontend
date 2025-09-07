// src/types.ts
export interface Transaction {
    id: number;
    date: string;
    invoiceNo: number;
    partyName: string;
    transactionType: 'Sale' | 'Purchase' | 'Return'; // Can be expanded
    paymentType: 'Cash' | 'Online' | 'Cheque';
    amount: number;
    balance: number;
  }
  