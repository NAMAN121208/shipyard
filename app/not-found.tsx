import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Product Not Found | ShipYard",
  description: "We could not find that item. It may have sold out or moved.",
};

export default function NotFound() {
  return (
    <main className="container">
      <div className="notfound">
        <h1 className="notfound-title">Product not found</h1>
        <p className="notfound-sub">
          We could not find that item. It may have sold out or moved.
        </p>
        <Link href="/" className="back-link">
          ← Back to catalog
        </Link>
      </div>
    </main>
  );
}
