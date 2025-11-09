'use client';

import React, { useEffect } from 'react';

interface Props {
    message: string;
    onClose: () => void;
}

export const AlertToast: React.FC<Props> = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed right-5 top-5 z-50 rounded-md bg-green-600 p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
                <span className="mr-4">{message}</span>
                <button onClick={onClose} className="font-bold">
                    &times;
                </button>
            </div>
        </div>
    );
};