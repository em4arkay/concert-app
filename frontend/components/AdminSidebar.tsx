'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon } from '../components/Icons/HomeIcon';
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

export const AdminSidebar = () => {
    return (
        <div className="flex h-screen w-64 flex-col bg-white p-4 shadow-lg border-r border-[#E7E7E7]">
            <h2 className="mb-6 px-4 text-3xl font-bold text-white">Admin</h2>

            <nav className="flex-grow space-y-2">
                <NavLink href="/admin">
                    <HomeIcon className="h-6 w-6" />
                    <span>Home</span>
                </NavLink>
                <NavLink href="/admin/history">
                    <HistoryIcon className="h-6 w-6" />
                    <span>History</span>
                </NavLink>
                <NavLink href="/user">
                    <SwitchIcon className="h-6 w-6" />
                    <span>Switch to user</span>
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