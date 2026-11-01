import type { Metadata } from "next";
import Link from "next/link";
import { logout } from "../../lib/actions";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false }, // keep the admin out of Google
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const loggedIn = session?.user?.role == 'ADMIN' ? true : false;
  return (
    <div>
      {loggedIn && (
        <div className="admin-bar">
          <Link href="/admin" className="admin-brand">Store <span>Admin</span></Link>
          <nav aria-label="Admin navigation">
            <Link href="/admin" className="active">Inventory</Link>
            <Link href="/admin/products/new">Add item</Link>
          </nav>
          <div className="admin-links">
            <Link href="/">View store <span aria-hidden="true">↗</span></Link>
            <form action={logout}>
              <button type="submit" className="link-button">Log out</button>
            </form>
          </div>
        </div>
      )}
      {children}
    </div>
  );
}
