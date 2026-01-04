import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { Check } from 'lucide-react';
import { cn } from '../../utils/cn';

export function RegistrationModal() {
    const { isRegistered, setUserName } = useUser();
    const [nameInput, setNameInput] = useState('');
    const [error, setError] = useState('');

    if (isRegistered) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (nameInput.trim().length < 2) {
            setError('Please enter a valid name (at least 2 characters).');
            return;
        }
        setUserName(nameInput.trim());
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm transition-all">
            <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="text-center">
                    <h3 className="text-2xl font-bold leading-6 text-slate-900">Welcome to FinWise</h3>
                    <p className="mt-2 text-sm text-slate-500">
                        Let's get to know you. What should we call you?
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <label htmlFor="name" className="sr-only">Your Name</label>
                        <input
                            type="text"
                            id="name"
                            className={cn(
                                "block w-full rounded-lg border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm bg-slate-50 border",
                                error ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""
                            )}
                            placeholder="Enter your name"
                            value={nameInput}
                            onChange={(e) => {
                                setNameInput(e.target.value);
                                setError('');
                            }}
                            autoFocus
                        />
                        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
                    </div>

                    <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-lg bg-gradient-to-r from-brand-600 to-accent-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:from-brand-500 hover:to-accent-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
                    >
                        <span className="flex items-center">
                            Get Started <Check className="ml-2 h-4 w-4" />
                        </span>
                    </button>
                </form>
            </div>
        </div>
    );
}
