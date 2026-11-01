import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/actions";
import ProductForm from "@/components/ProductForm";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { error?: string };
}) {
  const param = await params;
  const searchParam = await searchParams;
  requireAdmin();

  const product = await prisma.product.findUnique({ where: { id: Number(param.id) || 0 } });
  if (!product) notFound();

  return (
    <div className="container narrow form-page">
      <p className="eyebrow">Inventory</p>
      <h1>Edit item</h1>
      <p className="form-intro">Refine the listing details while keeping the collection consistent.</p>
      <ProductForm product={product} error={searchParam.error} />
    </div>
  );
}
