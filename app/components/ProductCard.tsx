import Image from "next/image";
import Link from "next/link";
import Stars from "./Stars";
import type { Product } from "../data/products";

const basePath = process.env.NODE_ENV === "production" ? "/shipyard" : "";

// The card takes one typed product as a prop. TypeScript checks every field.
export default function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const imageSrc = `${basePath}${product.image}`;
  return (
    <Link href={`/products/${product.id}`} className="card">
      <div
        className="card-art"
        style={{
          background: `linear-gradient(135deg, ${product.accent}, ${product.accent2})`,
        }}
      >
        {product.badge && <span className="card-badge">{product.badge}</span>}
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="card-image"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="card-body">
        <span className="card-category">{product.category}</span>
        <h2 className="card-name">{product.name}</h2>
        <p className="card-tagline">{product.tagline}</p>
        <Stars rating={product.rating} />
        <div className="card-foot">
          <span className="card-price">${product.price}</span>
          <span className="card-cta">View →</span>
        </div>
      </div>
    </Link>
  );
}
