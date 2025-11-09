'use client';

import { useState } from "react";
import { UserSidebar } from "@/components/UserSidebar";

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex">
            <UserSidebar />
            <div className="flex-1 p-4 text-gray-900 lg:p-8">
                {children}
            </div>
        </div>
        // <div className="relative min-h-screen">
        //     <UserSidebar
        //         isOpen={isSidebarOpen}
        //         onClose={() => setIsSidebarOpen(false)}
        //     />

        //     {isSidebarOpen && (
        //         <div
        //             onClick={() => setIsSidebarOpen(false)}
        //             className="fixed inset-0 z-40 bg-[#FBFBFB] bg-opacity-50 lg:hidden"
        //         />
        //     )}

        //     <div className="flex-1 bg-white p-4 text-gray-900 lg:ml-64 lg:p-8">
        //         <button
        //             onClick={() => setIsSidebarOpen(true)}
        //             className="mb-4 text-2xl text-gray-900 lg:hidden"
        //         >
        //             ☰
        //         </button>

        //         {children}
        //     </div>
        // </div>
    );
}