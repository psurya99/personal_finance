import React, { useRef } from 'react';
import { useExpenses } from '../../hooks/useExpenses';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Download, Upload, Trash2, Coins } from 'lucide-react';
import { saveAs } from 'file-saver';
import { useCurrency, DEFAULT_CURRENCIES, CurrencyCode } from '../../context/CurrencyContext';

export function SettingsView() {
    const { expenses, setExpenses, clearAllExpenses } = useExpenses();
    const { currency, setCurrency } = useCurrency();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [customRate, setCustomRate] = React.useState(currency.rate.toString());

    const handleExport = () => {
        const dataStr = JSON.stringify(expenses, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const fileName = `finance_backup_${new Date().toISOString().split('T')[0]}.json`;
        saveAs(blob, fileName);
    };

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const json = event.target?.result as string;
                const data = JSON.parse(json);
                if (Array.isArray(data)) {
                    // Simple validation could go here
                    if (window.confirm(`Found ${data.length} records. This will OVERWRITE your current data. Continue?`)) {
                        setExpenses(data);
                        alert('Data imported successfully!');
                    }
                } else {
                    alert('Invalid JSON format. Expected an array of expenses.');
                }
            } catch (err) {
                alert('Error parsing JSON file.');
                console.error(err);
            }
            // Reset input
            if (fileInputRef.current) fileInputRef.current.value = '';
        };
        reader.readAsText(file);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Settings</h2>

            <Card>
                <CardHeader>
                    <CardTitle>Data Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">

                    {/* Currency Settings */}
                    <div className="rounded-lg border border-slate-200 p-4">
                        <div className="flex items-center gap-2 mb-4">
                            <Coins className="h-5 w-5 text-blue-600" />
                            <h4 className="font-medium">Currency Settings</h4>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Display Currency</label>
                                <Select
                                    value={currency.code}
                                    onChange={(e) => {
                                        const newCode = e.target.value as CurrencyCode;
                                        const newConfig = DEFAULT_CURRENCIES[newCode];
                                        setCurrency(newConfig);
                                        setCustomRate(newConfig.rate.toString());
                                    }}
                                >
                                    {Object.keys(DEFAULT_CURRENCIES).map((code) => (
                                        <option key={code} value={code}>{code} ({DEFAULT_CURRENCIES[code as CurrencyCode].symbol})</option>
                                    ))}
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Exchange Rate (vs USD)</label>
                                <div className="flex gap-2">
                                    <Input
                                        type="number"
                                        step="0.01"
                                        value={customRate}
                                        onChange={(e) => setCustomRate(e.target.value)}
                                    />
                                    <Button
                                        variant="secondary"
                                        onClick={() => setCurrency({ ...currency, rate: parseFloat(customRate) || 1 })}
                                    >
                                        Update
                                    </Button>
                                </div>
                                <p className="text-xs text-slate-500">
                                    1 USD = {customRate} {currency.code}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-lg border border-slate-200 p-4">
                        <h4 className="mb-2 font-medium">Backup & Restore</h4>
                        <p className="mb-4 text-sm text-slate-500">
                            Export your data to a JSON file for backup, or import a previously exported file.
                        </p>
                        <div className="flex gap-4">
                            <Button variant="outline" onClick={handleExport}>
                                <Download className="mr-2 h-4 w-4" /> Export Data
                            </Button>
                            <Button variant="outline" onClick={handleImportClick}>
                                <Upload className="mr-2 h-4 w-4" /> Import Data
                            </Button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept=".json"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>

                    <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                        <h4 className="mb-2 font-medium text-red-900">Danger Zone</h4>
                        <p className="mb-4 text-sm text-red-700">
                            Permanently delete all expense data. This action cannot be undone.
                        </p>
                        <Button variant="destructive" onClick={clearAllExpenses}>
                            <Trash2 className="mr-2 h-4 w-4" /> Clear All Data
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
