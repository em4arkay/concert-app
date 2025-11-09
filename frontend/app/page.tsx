'use client';

import { useState, useEffect } from 'react';
import { ConcertCard } from '../components/ConcertCard';

interface Concert {
  id: string;
  name: string;
  description: string;
  seat: number;
}

const MOCK_RESERVATIONS = [{ concertId: '1', userId: 'user123' }];

export default function Home() {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<'user' | 'admin'>('user');

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const res = await fetch('http://localhost:3001/concerts');
        if (!res.ok) {
          throw new Error('Failed to fetch concerts');
        }
        const data: Concert[] = await res.json();
        console.log('Fetched concerts:', data);
        setConcerts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchConcerts();
  }, []);

  const handleDelete = (id: string) => {
    alert(`(Admin) Deleting concert ${id}`);
    setConcerts(currentConcerts => currentConcerts.filter(c => c.id !== id));
  };

  const handleReserve = (id: string) => {
    alert(`(User) Reserving seat for concert ${id}`);
  };

  if (loading) {
    return <p>Loading concerts...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {concerts.length > 0 ? (
          concerts.map((concert) => {
            const reservedSeats = MOCK_RESERVATIONS.filter(
              (r) => r.concertId === concert.id,
            ).length;

            return (
              <ConcertCard
                key={concert.id}
                id={concert.id}
                name={concert.name}
                description={concert.description}
                totalSeats={concert.seat}
                role={role}
                onDelete={handleDelete}
                onReserve={handleReserve}
              />
            );
          })
        ) : (
          <p>No concerts found. (Try adding some as Admin in Postman)</p>
        )}
      </div>
    </div>
  );
}