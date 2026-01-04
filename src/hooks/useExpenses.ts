import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Expense, ExpenseCategory } from '../types';
import { usePersistence } from './usePersistence';
// import { INITIAL_EXPENSES } from '../data/initialData'; // Commented out to start fresh or can use

// You could swap this for an empty array [] if you don't want prepopulated data for real users,
// but for demo purposes, let's keep it empty or use it conditionally.
// Let's use empty array as default, and maybe a "Load Demo Data" button in UI.
const DEFAULT_EXPENSES: Expense[] = [];

export function useExpenses() {
    const { data: expenses, updateData: setExpenses, isLoading } = usePersistence<Expense[]>('expenses_v1', DEFAULT_EXPENSES);

    const addExpense = useCallback((expense: Omit<Expense, 'id'>) => {
        const newExpense: Expense = {
            ...expense,
            id: uuidv4(),
        };
        setExpenses((prev) => [newExpense, ...prev]);
    }, [setExpenses]);

    const updateExpense = useCallback((id: string, updates: Partial<Omit<Expense, 'id'>>) => {
        setExpenses((prev) => prev.map((exp) => (exp.id === id ? { ...exp, ...updates } : exp)));
    }, [setExpenses]);

    const deleteExpense = useCallback((id: string) => {
        setExpenses((prev) => prev.filter((exp) => exp.id !== id));
    }, [setExpenses]);

    const clearAllExpenses = useCallback(() => {
        if (window.confirm('Are you sure you want to delete all expenses? This cannot be undone.')) {
            setExpenses([]);
        }
    }, [setExpenses]);

    return {
        expenses,
        isLoading,
        addExpense,
        updateExpense,
        deleteExpense,
        clearAllExpenses,
        setExpenses, // Exposed for import features
    };
}
