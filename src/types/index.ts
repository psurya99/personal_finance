export type ExpenseCategory = 'Food' | 'Transport' | 'Housing' | 'Entertainment' | 'Health' | 'Education' | 'Other';

export interface Expense {
    id: string;
    amount: number;
    category: ExpenseCategory;
    subCategory: string;
    date: string; // ISO 8601 YYYY-MM-DD
    note: string;
}

export interface CategoryDefinition {
    name: ExpenseCategory;
    subCategories: string[];
    color: string;
}

export interface MonthlySummary {
    month: string; // YYYY-MM
    total: number;
}

export interface Insight {
    id: string;
    type: 'warning' | 'info' | 'success';
    message: string;
}

export const CATEGORIES: CategoryDefinition[] = [
    { name: 'Food', subCategories: ['Groceries', 'Dining Out', 'Snacks', 'Beverages'], color: '#ef4444' }, // red
    { name: 'Transport', subCategories: ['Fuel', 'Public Transport', 'Taxi', 'Maintenance'], color: '#f59e0b' }, // amber
    { name: 'Housing', subCategories: ['Rent', 'Mortgage', 'Utilities', 'Repairs'], color: '#3b82f6' }, // blue
    { name: 'Entertainment', subCategories: ['Movies', 'Games', 'Subscriptions', 'Events'], color: '#8b5cf6' }, // violet
    { name: 'Health', subCategories: ['Doctor', 'Medicine', 'Insurance', 'Fitness'], color: '#10b981' }, // emerald
    { name: 'Education', subCategories: ['Tuition', 'Books', 'Online Courses', 'Supplies'], color: '#06b6d4' }, // cyan
    { name: 'Other', subCategories: ['Gifts', 'Donations', 'Miscellaneous'], color: '#64748b' }, // slate
];
