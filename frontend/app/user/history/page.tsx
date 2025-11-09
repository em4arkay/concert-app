'use client';

import { useState, useEffect } from 'react';
import { ConcertCard } from '@/components/ConcertCard';

interface Concert {
    id: string;
    name: string;
    description: string;
    seat: number;
}
interface Reservation {
    id: string;
    concertId: string;
    userId: string;
}

const MOCK_USER_ID = 'user-123@example.com';

export default function UserHistoryPage() {
    const [concerts, setConcerts] = useState<Concert[]>([]);
    const [myReservations, setMyReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadPageData = async () => {
            try {
                setLoading(true);
                const [concertRes, reservationRes] = await Promise.all([
                    fetch('http://localhost:3001/concerts'),
                    fetch(`http://localhost:3001/reservations/me/${MOCK_USER_ID}`)
                ]);

                if (!concertRes.ok) throw new Error('Failed to fetch concerts');
                if (!reservationRes.ok) throw new Error('Failed to fetch reservations');

                const concertData: Concert[] = await concertRes.json();
                const reservationData: Reservation[] = await reservationRes.json();

                setConcerts(concertData);
                setMyReservations(reservationData);

            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error');
            } finally {
                setLoading(false);
            }
        };

        loadPageData();
    }, []);

    const handleCancel = async (concertId: string) => {
        const reservation = myReservations.find(r => r.concertId === concertId);
        if (!reservation) return;

        try {
            const res = await fetch(`http://localhost:3001/reservations/${reservation.id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: MOCK_USER_ID }),
            });

            if (!res.ok) {
                throw new Error('Failed to cancel reservation');
            }

            setMyReservations(prev => prev.filter(r => r.id !== reservation.id));
            alert('Cancellation successful!');

        } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            alert(`Error: ${message}`);
        }
    };

    if (loading) {
        return <p>Loading my history...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    const reservedConcertIds = new Set(myReservations.map(r => r.concertId));
    const reservedConcerts = concerts.filter(c => reservedConcertIds.has(c.id));

    return (
        <div>
            <h2 className="mb-6 text-3xl font-bold text-gray-900">
                My Reservations
            </h2>
            <div className="flex flex-col gap-6">
                {reservedConcerts.length > 0 ? (
                    reservedConcerts.map((concert) => (
                        <ConcertCard
                            key={concert.id}
                            id={concert.id}
                            name={concert.name}
                            description={concert.description}
                            totalSeats={concert.seat}
                            isReserved={true}
                            onCancel={() => handleCancel(concert.id)}
                            role="user"
                        />
                    ))
                ) : (
                    <p>You have no reservations.</p>
                )}
            </div>
        </div>
    );
}