import type { Product } from "@prisma/client";
import { categories } from "@/lib/store";
import { saveProduct } from "@/lib/actions";

// One form used for both adding and editing an item
export default function ProductForm({ product, error }: { product?: Product; error?: string }) {
  return (
    <form action={saveProduct} className="form">
      {product && <input type="hidden" name="id" value={product.id} />}
      {error && <p className="message error">{error}</p>}

      <label>
        Name
        <input name="name" defaultValue={product?.name} required />
      </label>

      <label>
        Category
        <select name="category" defaultValue={product?.category ?? categories[0]}>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </label>

      <label>
        Price in naira
        <input name="price" type="number" min="1" step="1" defaultValue={product?.price} required />
      </label>

      <label>
        Image link
        <input name="imageUrl" type="url" placeholder="https://..." defaultValue={product?.imageUrl} required />
      </label>

      <label>
        Description
        <textarea name="description" rows={4} defaultValue={product?.description} required />
      </label>

      <label className="checkbox">
        <input name="inStock" type="checkbox" defaultChecked={product ? product.inStock : true} />
        Available to order
      </label>

      <button type="submit" className="button">{product ? "Save changes" : "Add item"}</button>
    </form>
  );
}
