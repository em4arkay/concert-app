'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HistoryIcon } from '../components/Icons/HistoryIcon';
import { SwitchIcon } from '../components/Icons/SwitchIcon';
import { LogoutIcon } from '../components/Icons/LogoutIcon';

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={`flex items-center gap-3 rounded-lg px-4 py-3 text-gray-300 transition-all
                ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}
            `}
        >
            {children}
        </Link>
    );
};

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export const UserSidebar = ({ isOpen, onClose }: SidebarProps) => {
    return (
        // <div
        //     className={`
        //         fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-gray-900 p-4 shadow-lg
        //         transition-transform duration-300 ease-in-out
        //         ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        //         lg:translate-x-0 
        //     `}
        // >
        <div className="flex h-screen w-64 flex-col bg-white p-4 shadow-lg border-r border-[#E7E7E7]">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="px-4 text-3xl font-bold text-white">User</h2>
                <button onClick={onClose} className="text-2xl text-white lg:hidden">
                    &times;
                </button>
            </div>

            <nav className="flex-grow space-y-2">
                <NavLink href="/user/history">
                    <HistoryIcon className="h-6 w-6" />
                    <span>My History</span>
                </NavLink>
                <NavLink href="/admin">
                    <SwitchIcon className="h-6 w-6" />
                    <span>Switch to admin</span>
                </NavLink>
            </nav>

            <div className="space-y-2 border-t border-gray-700 pt-4">
                <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-gray-300 hover:bg-gray-700">
                    <LogoutIcon className="h-6 w-6" />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};