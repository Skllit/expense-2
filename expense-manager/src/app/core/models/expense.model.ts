// src/app/core/models/expense.model.ts
export interface Expense {
    _id?: string;
    user?: { _id: string; name: string; email: string };
    department?: { _id: string; name: string };
    amount: number;
    description: string;
    date: string;
    status: 'pending' | 'approved';
  }
  