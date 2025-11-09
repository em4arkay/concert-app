'use client';

import React from 'react';
import { UserIcon } from '../components/Icons/UserIcon';

export interface ConcertCardProps {
    id: string;
    name: string;
    description: string;
    totalSeats: number;
    role: 'admin' | 'user';
    isReserved?: boolean;
    onReserve?: (id: string) => void;
    onCancel?: (id: string) => void;
    onDelete?: () => void;
}

export const ConcertCard: React.FC<ConcertCardProps> = ({
    id,
    name,
    description,
    totalSeats,
    role,
    isReserved,
    onReserve,
    onCancel,
    onDelete,
}) => {
    return (
        <div className="flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-md">

            <div className="flex-grow">
                <h3 className="mb-2 text-2xl font-bold text-blue-600">{name}</h3>
                <p className="mb-4 text-gray-600">{description}</p>
                <div className="flex items-center text-gray-500">
                    <span className="mr-2"><UserIcon /></span>
                    <span>{totalSeats} seats</span>
                </div>
            </div>

            <div className="mt-6">
                {role === 'admin' && (
                    <button
                        onClick={onDelete}
                        className="w-full rounded-md bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700 sm:w-auto"
                    >
                        Delete
                    </button>
                )}

                {role === 'user' && (
                    <>
                        {isReserved ? (
                            <button
                                onClick={() => onCancel?.(id)}
                                className="w-full rounded-md bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700 sm:w-auto"
                            >
                                Cancel
                            </button>
                        ) : (
                            <button
                                onClick={() => onReserve?.(id)}
                                className="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
                            >
                                Reserve
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};