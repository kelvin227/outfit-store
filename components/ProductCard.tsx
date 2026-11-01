import Link from "next/link";
import { formatPrice } from "@/lib/store";

type Props = {
  name: string;
  slug: string;
  price: number;
  imageUrl: string;
  inStock: boolean;
};

export default function ProductCard({ name, slug, price, imageUrl, inStock }: Props) {
  return (
    <Link href={`/products/${slug}`} className="card">
      <div className="card-image">
        <img src={imageUrl} alt={name} loading="lazy" />
        {!inStock && <span className="badge">Sold out</span>}
        <span className="card-arrow" aria-hidden="true">↗</span>
      </div>
      <div className="card-details">
        <h3>{name}</h3>
        <p className="price">{formatPrice(price)}</p>
      </div>
    </Link>
  );
}
