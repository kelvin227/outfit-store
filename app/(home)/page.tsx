import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { categories } from "@/lib/store";
import ProductCard from "@/components/ProductCard";

// Always read fresh products from the database
export const dynamic = "force-dynamic";

export default async function HomePage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const params = await searchParams;
  const selected = categories.includes(params.category ?? "")
    ? params.category
    : undefined;

  const products = await prisma.product.findMany({
    where: selected ? { category: selected } : {},
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">The signature edit</p>
          <h1>Style,<br />considered.</h1>
          <p className="hero-copy">Distinctive outfits and refined accessories, chosen for the moments that deserve more.</p>
          <Link href="#collection" className="hero-link">Explore the collection <span aria-hidden="true">↓</span></Link>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-monogram">O</div>
          <p>Curated with intention</p>
        </div>
      </section>

      <section className="promise" id="about" aria-label="Our promise">
        <p className="promise-kicker">01 — Our promise</p>
        <p>Thoughtfully selected pieces.<br />Personal ordering. No fuss.</p>
      </section>

      <section className="collection" id="collection">
        <div className="collection-heading">
          <div>
            <p className="eyebrow">Discover</p>
            <h2>{selected ?? "The collection"}</h2>
          </div>
          <p className="product-count">{products.length.toString().padStart(2, "0")} pieces</p>
        </div>

        <nav className="filters" aria-label="Filter by category">
          <Link href="/" className={!selected ? "active" : ""}>All pieces</Link>
          {categories.map((c) => (
            <Link key={c} href={`/?category=${c}`} className={selected === c ? "active" : ""}>
              {c}
            </Link>
          ))}
        </nav>

        {products.length === 0 ? (
          <p className="empty">The next edit is coming soon.</p>
        ) : (
          <div className="grid">
            {products.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
