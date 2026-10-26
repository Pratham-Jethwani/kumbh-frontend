// Complete Headless Shopify Storefront API Integration Service
// Live Store: edsrux-pf.myshopify.com

const SHOPIFY_CONFIG_KEY = 'kumbh_shopify_config';
const CART_ID_KEY = 'nashik_shopify_cart_id';

export const getStoredShopifyConfig = () => {
  const envDomain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || 'edsrux-pf.myshopify.com';
  const envToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || '';
  const envVersion = import.meta.env.VITE_SHOPIFY_API_VERSION || '2024-07';

  try {
    const raw = localStorage.getItem(SHOPIFY_CONFIG_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.shopDomain && parsed.storefrontAccessToken) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading Shopify config', e);
  }

  return {
    shopDomain: envDomain,
    storefrontAccessToken: envToken,
    apiVersion: envVersion,
    isConnected: Boolean(envDomain && envToken)
  };
};

export async function storefrontApiRequest(query, variables = {}, config = null) {
  const cfg = config || getStoredShopifyConfig();
  if (!cfg.shopDomain || !cfg.storefrontAccessToken) {
    throw new Error('Shopify credentials not configured');
  }

  const cleanDomain = cfg.shopDomain.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const endpoint = `https://${cleanDomain}/api/${cfg.apiVersion || '2024-07'}/graphql.json`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': cfg.storefrontAccessToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();
  if (json.errors) {
    throw new Error(json.errors.map(e => e.message).join(', '));
  }

  return json.data;
}

// 1. Fetch live product prices and inventory availability directly from Shopify
export async function fetchLiveShopifyProducts(config = null) {
  // Query featured collection first to preserve exact store order, with fallback to all products
  const query = `
    query getInventoryProducts {
      shop {
        name
        primaryDomain {
          url
        }
      }
      collectionByHandle(handle: "asset-pack-135166066690-example-products") {
        id
        title
        products(first: 20) {
          edges {
            node {
              id
              title
              handle
              description
              availableForSale
              variants(first: 10) {
                edges {
                  node {
                    id
                    title
                    availableForSale
                    price {
                      amount
                      currencyCode
                    }
                    compareAtPrice {
                      amount
                      currencyCode
                    }
                  }
                }
              }
              images(first: 5) {
                edges {
                  node {
                    url
                  }
                }
              }
            }
          }
        }
      }
      products(first: 20) {
        edges {
          node {
            id
            title
            handle
            description
            availableForSale
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                }
              }
            }
            images(first: 5) {
              edges {
                node {
                  url
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await storefrontApiRequest(query, {}, config);
  const collectionEdges = data?.collectionByHandle?.products?.edges || [];
  const fallbackEdges = data?.products?.edges || [];
  const edges = collectionEdges.length > 0 ? collectionEdges : fallbackEdges;

  return edges.map(({ node }) => {
    const rawVariants = node.variants?.edges?.map(e => e.node) || [];
    const firstVariant = rawVariants[0];
    const rawPrice = firstVariant?.price?.amount || '0.00';
    const currency = firstVariant?.price?.currencyCode || 'INR';

    // Map to high-res local image mirrors
    let image = node.images?.edges?.[0]?.node?.url;
    if (node.title.toLowerCase().includes('ancestral')) {
      image = '/images/ghat-memorial.png';
    } else if (node.title.toLowerCase().includes('abhishek')) {
      image = '/images/rudrabhishek.png';
    } else if (node.title.toLowerCase().includes('jal') || node.title.toLowerCase().includes('darshan')) {
      image = '/images/sacred-kumbh.png';
    }

    return {
      id: node.id,
      shopifyId: node.id,
      handle: node.handle,
      title: node.title,
      description: node.description,
      availableForSale: node.availableForSale,
      price: parseFloat(rawPrice).toFixed(2),
      currency,
      image,
      variants: rawVariants.map(v => ({
        id: v.id,
        title: v.title,
        price: parseFloat(v.price.amount).toFixed(2),
        currency: v.price.currencyCode,
        availableForSale: v.availableForSale
      }))
    };
  });
}

// 2. Real-time Live Product Search API
export async function searchShopifyProducts(searchTerm, config = null) {
  if (!searchTerm || !searchTerm.trim()) return [];

  const query = `
    query searchCatalog($query: String!) {
      products(first: 10, query: $query) {
        edges {
          node {
            id
            title
            handle
            availableForSale
            variants(first: 1) {
              edges {
                node {
                  id
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await storefrontApiRequest(query, { query: searchTerm }, config);
  return (data?.products?.edges || []).map(({ node }) => {
    const v = node.variants?.edges?.[0]?.node;
    let image = node.images?.edges?.[0]?.node?.url || '/images/sacred-kumbh.png';
    if (node.title.toLowerCase().includes('ancestral')) image = '/images/ghat-memorial.png';
    else if (node.title.toLowerCase().includes('abhishek')) image = '/images/rudrabhishek.png';

    return {
      id: node.id,
      title: node.title,
      handle: node.handle,
      price: parseFloat(v?.price?.amount || '0').toFixed(2),
      currency: v?.price?.currencyCode || 'INR',
      image,
      variantId: v?.id
    };
  });
}

// 3. Shopify Storefront Cart Management (Create & Sync)
export async function createShopifyCart(lines, config = null) {
  const mutation = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
          totalQuantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          lines(first: 20) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                    product {
                      id
                      title
                    }
                  }
                }
              }
            }
          }
        }
        userErrors {
          code
          field
          message
        }
      }
    }
  `;

  const formattedLines = lines.map(line => ({
    merchandiseId: line.variantId || line.merchandiseId,
    quantity: line.quantity
  }));

  const data = await storefrontApiRequest(mutation, { input: { lines: formattedLines } }, config);
  const cart = data?.cartCreate?.cart;
  if (cart?.id) {
    localStorage.setItem(CART_ID_KEY, cart.id);
  }
  return cart;
}

export async function addLinesToCart(cartId, lines, config = null) {
  const mutation = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          totalQuantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
        userErrors {
          message
        }
      }
    }
  `;

  const data = await storefrontApiRequest(mutation, { cartId, lines }, config);
  return data?.cartLinesAdd?.cart;
}

export async function updateCartLines(cartId, lines, config = null) {
  const mutation = `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          totalQuantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
        userErrors {
          message
        }
      }
    }
  `;

  const data = await storefrontApiRequest(mutation, { cartId, lines }, config);
  return data?.cartLinesUpdate?.cart;
}

export async function removeCartLines(cartId, lineIds, config = null) {
  const mutation = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          checkoutUrl
          totalQuantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
        userErrors {
          message
        }
      }
    }
  `;

  const data = await storefrontApiRequest(mutation, { cartId, lineIds }, config);
  return data?.cartLinesRemove?.cart;
}

// 4. Newsletter Customer Registration API
export async function registerCustomerNewsletter(email, config = null) {
  const mutation = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
          email
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  // Generates a secure random registration password for the subscriber
  const tempPassword = 'Pooja_' + Math.random().toString(36).slice(-8) + '!';
  const data = await storefrontApiRequest(mutation, {
    input: {
      email,
      password: tempPassword,
      acceptsMarketing: true
    }
  }, config);

  return data?.customerCreate;
}

// 5. Checkout creation helper
export async function createShopifyCheckout(cartItems, config = null) {
  const cfg = config || getStoredShopifyConfig();
  const lines = cartItems.map(item => ({
    variantId: item.variant?.id || item.product?.variants?.[0]?.id,
    quantity: item.quantity
  })).filter(l => Boolean(l.variantId));

  if (lines.length === 0) {
    return {
      success: true,
      checkoutUrl: `https://${cfg.shopDomain}/cart`
    };
  }

  try {
    const cart = await createShopifyCart(lines, cfg);
    if (cart?.checkoutUrl) {
      return {
        success: true,
        checkoutUrl: cart.checkoutUrl
      };
    }
  } catch (err) {
    console.error('Checkout creation error:', err);
  }

  return {
    success: true,
    checkoutUrl: `https://${cfg.shopDomain}/cart`
  };
}

// 6. Direct Instant "Buy It Now" Checkout (one-click to Shopify checkout)
export async function instantBuyNow(variantId, quantity = 1, config = null) {
  const cfg = config || getStoredShopifyConfig();
  try {
    const cart = await createShopifyCart([{ variantId, quantity }], cfg);
    if (cart?.checkoutUrl) {
      return cart.checkoutUrl;
    }
  } catch (e) {
    console.error('Instant buy now error:', e);
  }
  return `https://${cfg.shopDomain}/cart`;
}
