import React, { useState, useEffect } from 'react';
import { Expense, ExpenseCategory, CATEGORIES } from '../../types';
import { useCurrency } from '../../context/CurrencyContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Modal } from '../ui/Modal';

interface ExpenseFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (expense: Omit<Expense, 'id'>) => void;
    initialData?: Expense;
}

export function ExpenseForm({ isOpen, onClose, onSubmit, initialData }: ExpenseFormProps) {
    const { currency } = useCurrency();
    const [formData, setFormData] = useState<Partial<Expense>>({
        amount: 0,
        category: 'Food',
        subCategory: '',
        date: new Date().toISOString().split('T')[0],
        note: '',
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                amount: parseFloat((initialData.amount * currency.rate).toFixed(2))
            });
        } else {
            setFormData({
                amount: 0,
                category: 'Food',
                subCategory: CATEGORIES[0].subCategories[0],
                date: new Date().toISOString().split('T')[0],
                note: '',
            });
        }
    }, [initialData, isOpen]);

    // Update available subcategories when category changes
    useEffect(() => {
        if (!initialData && formData.category) {
            const catDef = CATEGORIES.find(c => c.name === formData.category);
            if (catDef) {
                setFormData(prev => ({ ...prev, subCategory: catDef.subCategories[0] }));
            }
        }
    }, [formData.category, initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.amount || !formData.category || !formData.date) return;

        onSubmit({
            amount: Number(formData.amount) / currency.rate, // Convert back to Base (USD)
            category: formData.category as ExpenseCategory,
            subCategory: formData.subCategory || '',
            date: formData.date,
            note: formData.note || '',
        });
        onClose();
    };

    const currentCategoryDef = CATEGORIES.find(c => c.name === formData.category);

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Edit Expense' : 'Add New Expense'}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Amount ({currency.symbol})</label>
                    <Input
                        type="number"
                        step="0.01"
                        min="0"
                        required
                        value={formData.amount}
                        onChange={e => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none">Category</label>
                        <Select
                            value={formData.category}
                            onChange={e => setFormData({ ...formData, category: e.target.value as ExpenseCategory })}
                        >
                            {CATEGORIES.map(cat => (
                                <option key={cat.name} value={cat.name}>{cat.name}</option>
                            ))}
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none">Sub-Category</label>
                        <Select
                            value={formData.subCategory}
                            onChange={e => setFormData({ ...formData, subCategory: e.target.value })}
                        >
                            {currentCategoryDef?.subCategories.map(sub => (
                                <option key={sub} value={sub}>{sub}</option>
                            ))}
                        </Select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">Date</label>
                    <Input
                        type="date"
                        required
                        value={formData.date}
                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none">Note (Optional)</label>
                    <Input
                        type="text"
                        value={formData.note}
                        onChange={e => setFormData({ ...formData, note: e.target.value })}
                        placeholder="e.g. Lunch with team"
                    />
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                    <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                    <Button type="submit">{initialData ? 'Update Expense' : 'Add Expense'}</Button>
                </div>
            </form>
        </Modal>
    );
}
