import Link from "next/link";

export default function NotFound() {
  return (
    <div className="empty">
      <p>We couldn't find that item.</p>
      <Link href="/" className="back">Back to all items</Link>
    </div>
  );
}
