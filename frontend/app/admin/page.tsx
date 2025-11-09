'use client';

import { useState, useEffect } from 'react';
import { ConcertCard } from '@/components/ConcertCard';
import { CreateConcertForm } from '@/components/CreateConcertForm';
import { ConfirmationModal } from '@/components/ConfirmationModal';
import { AlertToast } from '@/components/AlertToast';

interface Concert {
    id: string;
    name: string;
    description: string;
    seat: number;
}

interface AdminStats {
    totalSeats: number;
    reserve: number;
    cancel: number;
}

export default function AdminHomePage() {
    const [tab, setTab] = useState<'overview' | 'create'>('overview');
    const [concerts, setConcerts] = useState<Concert[]>([]);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const [concertToDelete, setConcertToDelete] = useState<Concert | null>(null);

    const [stats, setStats] = useState<AdminStats>({
        totalSeats: 0,
        reserve: 0,
        cancel: 0
    });

    const fetchStats = async () => {
        try {
            const res = await fetch('http://localhost:3001/reservations/admin/stats', {
                headers: { 'x-user-role': 'admin' },
            });
            const data = await res.json();
            setStats(data);
        } catch (err) {
            console.error('Failed to fetch stats', err);
        }
    };

    useEffect(() => {
        fetchStats();
        if (tab === 'overview') {
            fetchConcerts();
        }
    }, [tab]);

    const fetchConcerts = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:3001/concerts');
            const data: Concert[] = await res.json();
            setConcerts(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (concert: Concert) => {
        setConcertToDelete(concert);
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!concertToDelete) return;

        try {
            await fetch(`http://localhost:3001/concerts/${concertToDelete.id}`, {
                method: 'DELETE',
                headers: { 'x-user-role': 'admin' },
            });

            setToastMessage('Delete successfully');
            fetchStats();
            fetchConcerts();
        } catch (err) {
            console.error(err);
            alert('Failed to delete concert.');
        } finally {
            setIsModalOpen(false);
            setConcertToDelete(null);
        }
    };

    const onConcertCreated = () => {
        setTab('overview');
        setToastMessage('Create successfully');
        fetchConcerts();
        fetchStats();
    };

    return (
        <div>
            <div className="mb-6 grid grid-cols-3 gap-6 md:grid-cols-3">
                <div className="rounded-lg bg-blue-600 p-6 text-white shadow-lg">
                    <div className="text-sm">Total of seats</div>
                    <div className="text-3xl font-bold">{stats.totalSeats}</div>
                </div>
                <div className="rounded-lg bg-green-600 p-6 text-white shadow-lg">
                    <div className="text-sm">Reserve</div>
                    <div className="text-3xl font-bold">{stats.reserve}</div>
                </div>
                <div className="rounded-lg bg-red-600 p-6 text-white shadow-lg">
                    <div className="text-sm">Cancel</div>
                    <div className="text-3xl font-bold">{stats.cancel}</div>
                </div>
            </div>

            <div className="mb-6 flex border-b border-gray-200">
                <button
                    onClick={() => setTab('overview')}
                    className={`px-6 py-3 font-medium ${tab === 'overview'
                        ? 'border-b-2 border-blue-600 text-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Overview
                </button>
                <button
                    onClick={() => setTab('create')}
                    className={`px-6 py-3 font-medium ${tab === 'create'
                        ? 'border-b-2 border-blue-600 text-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Create
                </button>
            </div>

            {toastMessage && (
                <AlertToast
                    message={toastMessage}
                    onClose={() => setToastMessage(null)}
                />
            )}

            <ConfirmationModal
                isOpen={isModalOpen}
                title="Are you sure to delete?"
                message={`"${concertToDelete?.name}"`}
                onCancel={() => setIsModalOpen(false)}
                onConfirm={confirmDelete}
            />

            <div>
                {tab === 'overview' && (
                    <div className="flex flex-col gap-6">
                        {loading ? (
                            <p>Loading concerts...</p>
                        ) : (
                            concerts.map((concert) => (
                                <ConcertCard
                                    key={concert.id}
                                    {...concert}
                                    totalSeats={concert.seat}
                                    role="admin"
                                    onDelete={() => handleDeleteClick(concert)}
                                />
                            ))
                        )}
                        {!loading && concerts.length === 0 && <p>No concerts found.</p>}
                    </div>
                )}

                {tab === 'create' && (<CreateConcertForm onConcertCreated={onConcertCreated} />)}
            </div>
        </div >
    );
}
