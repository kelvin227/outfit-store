"use client";

import { deleteProduct } from "@/lib/actions";

// A small client component so we can ask "Are you sure?" before deleting
export default function DeleteButton({ id, name }: { id: number; name: string }) {
  return (
    <form
      action={deleteProduct}
      onSubmit={(e) => {
        if (!confirm(`Delete "${name}"? This cannot be undone.`)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="small-button danger">Delete</button>
    </form>
  );
}
