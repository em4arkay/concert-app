'use client';

import { useState, FormEvent } from 'react';

export const CreateConcertForm = ({ onConcertCreated }: { onConcertCreated: () => void }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [seat, setSeat] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const res = await fetch('http://localhost:3001/concerts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-role': 'admin',
                },
                body: JSON.stringify({
                    name,
                    description,
                    seat: Number(seat),
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                if (Array.isArray(data.message)) {
                    throw new Error(data.message.join(', '));
                }
                throw new Error(data.message || 'Failed to create concert');
            }

            setSuccess('Concert created successfully!');
            setName('');
            setDescription('');
            setSeat('');

            setTimeout(() => {
                onConcertCreated();
                setSuccess(null);
            }, 1500);

        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto max-w-lg">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Create New Concert</h2>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-8 shadow-lg"
            >
                <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                        Concert Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        // required
                        className="w-full rounded-md border-gray-300 p-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="mb-2 block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        // required
                        rows={4}
                        className="w-full rounded-md border-gray-300 p-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="seat" className="mb-2 block text-sm font-medium text-gray-700">
                        Total Seats
                    </label>
                    <input
                        id="seat"
                        type="number"
                        value={seat}
                        onChange={(e) => setSeat(e.target.value)}
                        // required
                        min="1"
                        className="w-full rounded-md border-gray-300 p-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-md bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-500"
                >
                    {loading ? 'Creating...' : 'Create Concert'}
                </button>

                {error && (
                    <div className="mt-4 rounded-md bg-red-100 p-3 text-center text-red-700">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mt-4 rounded-md bg-green-100 p-3 text-center text-green-700">
                        {success}
                    </div>
                )}
            </form>
        </div>
    );
};