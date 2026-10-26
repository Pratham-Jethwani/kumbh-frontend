# NashikNirvana - Headless Shopify Frontend

A modern, high-performance headless frontend for **NashikNirvana** (`edsrux-pf.myshopify.com`), connecting to the Shopify Storefront GraphQL API.

## Features
- **1:1 Visual Alignment**: Built with custom typography (Work Sans) and curated palettes (Terracotta `#9e4922`, Slate `#60858e`, Sand `#cca970`, Charcoal `#261108`).
- **Live Inventory & Price Synchronization**: Real-time product pricing and stock availability queried directly from Shopify's Storefront GraphQL API.
- **Cart & Instant Checkout**: Full cart drawer with direct checkout redirection via Shopify's `cartCreate` mutation.
- **Instant Buy Now**: One-click direct checkout flow.
- **Live Search Overlay**: Instant catalog search powered by Shopify GraphQL queries.
- **Customer & Newsletter Integration**: Integrated account login and newsletter subscription via `customerCreate`.

## Getting Started Locally

```bash
npm install
npm run dev
```

The app will run on `http://127.0.0.1:3000`.

## Environment Variables for Netlify

When deploying to Netlify, add the following environment variables in **Site Settings > Environment Variables**:

| Variable | Description | Example |
| :--- | :--- | :--- |
| `VITE_SHOPIFY_STORE_DOMAIN` | Your Shopify store domain | `edsrux-pf.myshopify.com` |
| `VITE_SHOPIFY_STOREFRONT_TOKEN` | Storefront API Access Token | *(Your private token)* |
| `VITE_SHOPIFY_API_VERSION` | Shopify Storefront API Version | `2024-07` |

## Build Command
- **Build command**: `npm run build`
- **Publish directory**: `dist`
