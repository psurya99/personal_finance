import { Expense } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const INITIAL_EXPENSES: Expense[] = [
    {
        id: uuidv4(),
        amount: 150.50,
        category: 'Food',
        subCategory: 'Groceries',
        date: new Date().toISOString().split('T')[0],
        note: 'Weekly grocery run',
    },
    {
        id: uuidv4(),
        amount: 45.00,
        category: 'Transport',
        subCategory: 'Fuel',
        date: new Date().toISOString().split('T')[0],
        note: 'Gas station',
    },
    {
        id: uuidv4(),
        amount: 1200.00,
        category: 'Housing',
        subCategory: 'Rent',
        date: new Date(new Date().setDate(1)).toISOString().split('T')[0], // 1st of current month
        note: 'Monthly Rent',
    },
    {
        id: uuidv4(),
        amount: 25.00,
        category: 'Entertainment',
        subCategory: 'Movies',
        date: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString().split('T')[0],
        note: 'Cinema night',
    },
    {
        id: uuidv4(),
        amount: 80.00,
        category: 'Health',
        subCategory: 'Medicine',
        date: new Date(new Date().setDate(new Date().getDate() - 10)).toISOString().split('T')[0],
        note: 'Pharmacy',
    }
];
