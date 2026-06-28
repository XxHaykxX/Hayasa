import { Toaster } from 'sonner';
import { requireAdmin } from '@/lib/admin-auth';
import { signOutAction } from './actions';
import { AdminSidebar } from './AdminSidebar';
import { ConfirmProvider } from '@/components/admin/ConfirmProvider';

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();

  return (
    <ConfirmProvider>
      <div className="min-h-screen bg-[#F4F8F7] md:flex">
        <AdminSidebar email={admin.email ?? ''} signOut={signOutAction} />
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
          <div className="mx-auto max-w-[1180px]">{children}</div>
        </main>
        <Toaster richColors position="top-right" />
      </div>
    </ConfirmProvider>
  );
}
