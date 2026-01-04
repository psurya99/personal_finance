import React, { useState } from 'react';
import { Expense, CATEGORIES } from '../../types';
import { formatDate } from '../../utils/format';
import { useCurrency } from '../../context/CurrencyContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Trash2, Edit2, Search, Filter } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';

interface ExpenseListProps {
    expenses: Expense[];
    onEdit: (expense: Expense) => void;
    onDelete: (id: string) => void;
}

export function ExpenseList({ expenses, onEdit, onDelete }: ExpenseListProps) {
    const { format } = useCurrency();
    const [filterCategory, setFilterCategory] = useState<string>('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [dateFilter, setDateFilter] = useState('');

    const filteredExpenses = expenses.filter(expense => {
        const matchesCategory = filterCategory === 'All' || expense.category === filterCategory;
        const matchesSearch = expense.note.toLowerCase().includes(searchTerm.toLowerCase()) ||
            expense.subCategory.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDate = !dateFilter || expense.date.startsWith(dateFilter); // YYYY-MM
        return matchesCategory && matchesSearch && matchesDate;
    });

    return (
        <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="relative flex-1 md:max-w-xs">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                    <Input
                        placeholder="Search notes..."
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <Select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="w-[150px]"
                    >
                        <option value="All">All Categories</option>
                        {CATEGORIES.map(cat => (
                            <option key={cat.name} value={cat.name}>{cat.name}</option>
                        ))}
                    </Select>
                    <Input
                        type="month"
                        className="w-[160px]"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                    />
                </div>
            </div>

            {/* Table */}
            <Card>
                <CardContent className="p-0">
                    <div className="w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm text-left">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-slate-50/50 data-[state=selected]:bg-slate-50">
                                    <th className="h-12 px-4 align-middle font-medium text-slate-500">Date</th>
                                    <th className="h-12 px-4 align-middle font-medium text-slate-500">Category</th>
                                    <th className="h-12 px-4 align-middle font-medium text-slate-500">Sub-Category</th>
                                    <th className="h-12 px-4 align-middle font-medium text-slate-500">Note</th>
                                    <th className="h-12 px-4 align-middle font-medium text-slate-500 text-right">Amount</th>
                                    <th className="h-12 px-4 align-middle font-medium text-slate-500 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {filteredExpenses.length > 0 ? (
                                    filteredExpenses.map((expense) => (
                                        <tr key={expense.id} className="border-b transition-colors hover:bg-slate-50/50">
                                            <td className="p-4 align-middle">{formatDate(expense.date)}</td>
                                            <td className="p-4 align-middle">
                                                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-slate-100 text-slate-900 shadow hover:bg-slate-100/80">
                                                    {expense.category}
                                                </span>
                                            </td>
                                            <td className="p-4 align-middle">{expense.subCategory}</td>
                                            <td className="p-4 align-middle text-slate-500">{expense.note}</td>
                                            <td className="p-4 align-middle text-right font-medium">{format(expense.amount)}</td>
                                            <td className="p-4 align-middle text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="ghost" size="icon" onClick={() => onEdit(expense)} className="h-8 w-8">
                                                        <Edit2 className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" onClick={() => onDelete(expense.id)} className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="p-4 text-center text-slate-500">
                                            No expenses found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            <div className="text-right text-sm text-slate-500">
                Showing {filteredExpenses.length} of {expenses.length} expenses
            </div>
        </div>
    );
}
