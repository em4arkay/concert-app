'use client';

import React from 'react';

interface Props {
    isOpen: boolean;
    title: string;
    message: string;
    onCancel: () => void;
    onConfirm: () => void;
}

export const ConfirmationModal: React.FC<Props> = ({
    isOpen,
    title,
    message,
    onCancel,
    onConfirm,
}) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                <div className="flex flex-col items-center text-center">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-2xl text-red-600">
                        &times;
                    </div>
                    <h3 className="mb-2 text-2xl font-bold text-gray-900">{title}</h3>
                    <p className="mb-6 text-gray-600">{message}</p>

                    <div className="flex w-full gap-4">
                        <button
                            onClick={onCancel}
                            className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 font-semibold text-gray-700 transition hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="flex-1 rounded-md bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
                        >
                            Yes, Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};