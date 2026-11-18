# ShipYard

A product-catalog storefront built from scratch with **Next.js + TypeScript**. (Part 1 of 3: Catalog Setup).

## What it does

- A responsive **product grid** on the home page, rendered from typed data.
- A dynamic **`/products/[id]`** detail route, one page per product.
- A typed **`ProductCard`** component and a shared `Product` type.
- A friendly **404** not-found page for IDs that do not exist.
- Pre-built dynamic routes via `generateStaticParams`.

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
  layout.tsx              root layout (nav + footer)
  page.tsx                home page: the responsive product grid
  globals.css             styles
  not-found.tsx           friendly 404 page
  components/
    ProductCard.tsx       typed card component, one product per card
    Stars.tsx             star rating display component
  data/
    products.ts           the Product type + typed products list + getProduct()
  products/
    [id]/
      page.tsx            dynamic product detail route with generateStaticParams
```
