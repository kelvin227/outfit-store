import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatPrice, whatsappOrderLink } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const param = await params;
  const product = await prisma.product.findUnique({ where: { slug: param.slug } });
  if (!product) notFound();

  return (
    <div className="detail">
      <Link href="/#collection" className="back"><span aria-hidden="true">←</span> Back to collection</Link>

      <div className="detail-body">
        <div className="detail-media">
          <img src={product.imageUrl} alt={product.name} className="detail-image" />
          <span className="detail-index">The Collection / {product.category}</span>
        </div>

        <div className="detail-info">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="price big">{formatPrice(product.price)}</p>
          <div className="detail-divider" />
          <p className="detail-label">The piece</p>
          <p className="description">{product.description}</p>

          {product.inStock ? (
            <>
              <a
                className="button whatsapp-button"
                href={whatsappOrderLink(product.name, product.price)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Order on WhatsApp <span aria-hidden="true">↗</span>
              </a>
              <p className="order-note">We’ll confirm availability and delivery details.</p>
            </>
          ) : (
            <p className="sold-out">This piece is currently sold out.</p>
          )}
        </div>
      </div>
    </div>
  );
}
