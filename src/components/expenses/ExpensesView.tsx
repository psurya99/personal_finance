import React, { useState } from 'react';
import { useExpenses } from '../../hooks/useExpenses';
import { ExpenseList } from './ExpenseList';
import { ExpenseForm } from './ExpenseForm';
import { Button } from '../ui/Button';
import { Plus } from 'lucide-react';
import { Expense } from '../../types';

export function ExpensesView() {
    const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingExpense, setEditingExpense] = useState<Expense | undefined>(undefined);

    const handleCreate = () => {
        setEditingExpense(undefined);
        setIsFormOpen(true);
    };

    const handleEdit = (expense: Expense) => {
        setEditingExpense(expense);
        setIsFormOpen(true);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this expense?')) {
            deleteExpense(id);
        }
    };

    const handleSubmit = (data: Omit<Expense, 'id'>) => {
        if (editingExpense) {
            updateExpense(editingExpense.id, data);
        } else {
            addExpense(data);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">Expenses</h2>
                <Button onClick={handleCreate}>
                    <Plus className="mr-2 h-4 w-4" /> Add Expense
                </Button>
            </div>

            <ExpenseList
                expenses={expenses}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <ExpenseForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSubmit={handleSubmit}
                initialData={editingExpense}
            />
        </div>
    );
}
