import { useState, useEffect, useCallback } from 'react';
import localforage from 'localforage';

localforage.config({
    name: 'personal-finance-app',
    storeName: 'finance_data',
});

export function usePersistence<T>(key: string, initialValue: T) {
    const [data, setData] = useState<T>(initialValue);
    const [isLoading, setIsLoading] = useState(true);

    // Load data on mount
    useEffect(() => {
        const loadData = async () => {
            try {
                const storedData = await localforage.getItem<T>(key);
                if (storedData !== null) {
                    setData(storedData);
                } else {
                    // Initialize storage with default value if null
                    await localforage.setItem(key, initialValue);
                }
            } catch (error) {
                console.error('Error loading data from storage:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [key, initialValue]);

    // Save data whenever it changes (debounced could be added, but manual setItem is safer for critical data)
    // Actually, providing a setter that saves is better.

    const updateData = useCallback(async (newData: T | ((prev: T) => T)) => {
        setData((prev) => {
            const valueToStore = newData instanceof Function ? newData(prev) : newData;
            // Fire and forget storage update, or could return promise
            localforage.setItem(key, valueToStore).catch(err => console.error('Storage save error:', err));
            return valueToStore;
        });
    }, [key]);

    return { data, updateData, isLoading };
}
