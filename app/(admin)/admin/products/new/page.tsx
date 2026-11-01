import { requireAdmin } from "@/lib/actions";
import ProductForm from "@/components/ProductForm";

export default async function NewProductPage({ searchParams }: { searchParams: { error?: string } }) {
  const params = await searchParams;
  requireAdmin();

  return (
    <div className="container narrow form-page">
      <p className="eyebrow">New inventory</p>
      <h1>Add item</h1>
      <p className="form-intro">Create a complete listing with clear details and an accurate image.</p>
      <ProductForm error={params.error} />
    </div>
  );
}
