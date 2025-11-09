import { AdminSidebar } from '../../components/AdminSidebar';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex">
            <AdminSidebar />
            <div className="flex-1 p-4 text-gray-900 lg:p-8">
                {children}
            </div>
        </div>
    );
}