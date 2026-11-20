# ShipYard

A product-catalog storefront built from scratch with **Next.js + TypeScript**. (Part 2 of 3: Storefront Optimization).

## What it does

- **Responsive Product Grid**: Rendered from typed data on the home page.
- **Dynamic Product Detail Routes**: `/products/[id]` dynamic route with `generateStaticParams`.
- **Image Optimization**: Product images powered by `next/image` with reserved layout dimensions, `fill`, and descriptive `alt` tags to eliminate layout shift (CLS).
- **Font Optimization**: Self-hosted `next/font/google` (`Inter`) loaded once at the root layout without external `<link>` tags.
- **Dynamic Component Lazy-Loading**: Heavy below-the-fold customer `Reviews` panel loaded on demand via `next/dynamic` with streaming loading skeletons.
- **Dynamic Per-Page Metadata**: Static metadata export for home page and dynamic `generateMetadata` for `/products/[id]` routes providing custom titles and descriptions for search engines and social cards.
- **Error Handling**: Friendly 404 page for missing or invalid IDs.

## Run it locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Build

```bash
npm run build
```

## Project structure

```
app/
  layout.tsx              root layout (next/font Inter + nav + footer)
  page.tsx                home page: responsive product grid + metadata export
  globals.css             styles + reviews & loading skeleton styles
  not-found.tsx           friendly 404 page + metadata export
  components/
    ProductCard.tsx       typed card using next/image with fill and alt
    Stars.tsx             star rating display component
    Reviews.tsx           re-exported customer reviews component
  data/
    products.ts           Product interface with image field + products list + getProduct()
  products/
    [id]/
      page.tsx            detail route with generateMetadata & dynamic Reviews import
      Reviews.tsx         interactive customer reviews panel (lazy-loaded chunk)
public/
  products/               optimized webp product images
```
