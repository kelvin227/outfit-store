import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/store";
import DeleteButton from "@/components/DeleteButton";
import { toggleStock } from "../../../lib/actions";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await auth();
  if(!session || session?.user?.role !="ADMIN"){
    redirect("/admin/login");
  }

  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="container">
      <div className="admin-head">
        <div>
          <p className="eyebrow">Store management</p>
          <h1>Inventory</h1>
          <p className="admin-subtitle">{products.length} {products.length === 1 ? "piece" : "pieces"} in your collection</p>
        </div>
        <Link href="/admin/products/new" className="button">+ Add item</Link>
      </div>

      {products.length === 0 ? (
        <p className="empty">No items yet. Tap “Add item” to create your first one.</p>
      ) : (
        <ul className="admin-list">
          {products.map((p) => (
            <li key={p.id} className="admin-row">
              <img src={p.imageUrl} alt="" className="thumb" />

              <div className="admin-info">
                <strong>{p.name}</strong>
                <span className="price">{p.category} · {formatPrice(p.price)}</span>
                <span className={p.inStock ? "status in" : "status out"}>
                  {p.inStock ? "Available" : "Sold out"}
                </span>
              </div>

              <div className="admin-actions">
                <Link href={`/admin/products/${p.id}`} className="small-button">Edit</Link>
                <form action={toggleStock}>
                  <input type="hidden" name="id" value={p.id} />
                  <button type="submit" className="small-button">
                    {p.inStock ? "Mark sold out" : "Mark available"}
                  </button>
                </form>
                <DeleteButton id={p.id} name={p.name} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
