import React, { useState } from 'react';
import { useExpenses } from '../../hooks/useExpenses';
import { getCurrentMonthExpenses, calculateTotal, getCategoryTotals, getHighestCategory, getMonthlyTrends } from '../../utils/calculations';
import { SummaryCards } from './SummaryCards';
import { ExpenseCharts } from './ExpenseCharts';
import { RecentTransactions } from './RecentTransactions';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Edit2, Check } from 'lucide-react';
import { usePersistence } from '../../hooks/usePersistence';
import { useCurrency } from '../../context/CurrencyContext';

export function DashboardView() {
    const { format, currency } = useCurrency();
    const { expenses } = useExpenses();
    const currentMonthExpenses = getCurrentMonthExpenses(expenses);
    const totalMonthly = calculateTotal(currentMonthExpenses);
    const highestCategory = getHighestCategory(currentMonthExpenses);
    const categoryTotals = getCategoryTotals(currentMonthExpenses);
    const monthlyTrends = getMonthlyTrends(expenses);

    // Manage income state here or in a separate hook
    const { data: income, updateData: setIncome } = usePersistence<number>('user_income', 5000); // Default 5000
    const [isEditingIncome, setIsEditingIncome] = useState(false);
    const [tempIncome, setTempIncome] = useState((income * currency.rate).toString());

    // Update temp income when opening edit mode or currency changes (only if not editing)
    React.useEffect(() => {
        if (!isEditingIncome) {
            setTempIncome((income * currency.rate).toFixed(0)); // Simplify to integer for income
        }
    }, [income, currency.rate, isEditingIncome]);

    const handleSaveIncome = () => {
        const val = parseFloat(tempIncome);
        if (!isNaN(val) && val >= 0) {
            // Convert back to Base Currency (USD)
            setIncome(val / currency.rate);
            setIsEditingIncome(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h2>
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-slate-500">Monthly Income:</span>
                    {isEditingIncome ? (
                        <div className="flex items-center space-x-1">
                            <Input
                                type="number"
                                value={tempIncome}
                                onChange={(e) => setTempIncome(e.target.value)}
                                className="h-8 w-24"
                            />
                            <Button size="sm" onClick={handleSaveIncome}><Check className="h-4 w-4" /></Button>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-1 cursor-pointer hover:bg-slate-100 p-1 rounded" onClick={() => setIsEditingIncome(true)}>
                            <span className="font-semibold text-slate-900">{format(income)}</span>
                            <Edit2 className="h-3 w-3 text-slate-400" />
                        </div>
                    )}
                </div>
            </div>

            <SummaryCards
                totalExpenses={totalMonthly}
                highestCategory={highestCategory}
                income={income}
            />

            <ExpenseCharts
                categoryData={categoryTotals}
                monthlyData={monthlyTrends}
            />

            <RecentTransactions expenses={expenses} />
        </div>
    );
}
