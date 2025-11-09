'use client';

import { useState, useEffect } from 'react';
import { ConcertCard } from '../../components/ConcertCard';

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

export default function UserHomePage() {
    const [concerts, setConcerts] = useState<Concert[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [myReservations, setMyReservations] = useState<Reservation[]>([]);
    const [role, setRole] = useState<'user' | 'admin'>('user');

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

    const handleReserve = async (concertId: string) => {
        try {
            const res = await fetch('http://localhost:3001/reservations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    concertId: concertId,
                    userId: MOCK_USER_ID,
                }),
            });

            const newReservation = await res.json();

            if (!res.ok) {
                throw new Error(newReservation.message || 'Failed to reserve');
            }

            setMyReservations(prev => [...prev, newReservation]);
            alert('Reservation successful!');

        } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            alert(`Error: ${message}`);
        }
    };

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
        return <p>Loading concerts...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {concerts.length > 0 ? (
                    concerts.map((concert) => {
                        const isReserved = myReservations.some(r => r.concertId === concert.id);

                        return (
                            <ConcertCard
                                key={concert.id}
                                id={concert.id}
                                name={concert.name}
                                description={concert.description}
                                totalSeats={concert.seat}
                                isReserved={isReserved}
                                onReserve={() => handleReserve(concert.id)}
                                onCancel={() => handleCancel(concert.id)}
                                role={role}
                            />
                        );
                    })
                ) : (
                    <p>No concerts found.</p>
                )}
            </div>
        </div>
    );
}