import { Expense, CategoryDefinition, CATEGORIES } from '../types';

export const getCurrentMonthExpenses = (expenses: Expense[]) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    return expenses.filter(expense => {
        const d = new Date(expense.date);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    });
};

export const calculateTotal = (expenses: Expense[]) => {
    return expenses.reduce((sum, item) => sum + item.amount, 0);
};

export const getCategoryTotals = (expenses: Expense[]) => {
    const totals: Record<string, number> = {};

    // Initialize with 0 for all categories to ensure they appear
    CATEGORIES.forEach(cat => {
        totals[cat.name] = 0;
    });

    expenses.forEach(expense => {
        if (totals[expense.category] !== undefined) {
            totals[expense.category] += expense.amount;
        } else {
            // Fallback for custom categories if implemented later
            totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
        }
    });

    return Object.entries(totals)
        .map(([name, value]) => ({ name, value }))
        .filter(item => item.value > 0) // Only show categories with spending
        .sort((a, b) => b.value - a.value);
};

export const getHighestCategory = (expenses: Expense[]) => {
    const totals = getCategoryTotals(expenses);
    return totals.length > 0 ? totals[0] : null;
};

// Group by month for Bar Chart
export const getMonthlyTrends = (expenses: Expense[]) => {
    const trends: Record<string, number> = {};
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Initialize last 6 months or current year? Let's do current year.
    // Or simpler: group all available data.

    expenses.forEach(expense => {
        const d = new Date(expense.date);
        const key = `${months[d.getMonth()]} ${d.getFullYear()}`;
        trends[key] = (trends[key] || 0) + expense.amount;
    });

    // Sort by date (needs logic, but for simple "key" it's hard. Better to use YYYY-MM key for sorting then format)
    // Re-implementation with sorting:
    const groups: { [key: string]: number } = {};
    expenses.forEach(exp => {
        const d = new Date(exp.date);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        groups[key] = (groups[key] || 0) + exp.amount;
    });

    return Object.entries(groups)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .slice(-6) // Last 6 months
        .map(([key, value]) => {
            const [year, month] = key.split('-');
            return {
                name: `${months[parseInt(month) - 1]}`,
                fullDate: key,
                amount: value
            };
        });
};
