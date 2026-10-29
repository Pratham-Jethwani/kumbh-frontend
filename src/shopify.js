// Complete Headless Shopify Storefront API Integration Service
// Live Store: edsrux-pf.myshopify.com

const SHOPIFY_CONFIG_KEY = 'kumbh_shopify_config';
const CART_ID_KEY = 'nashik_shopify_cart_id';

export const getStoredShopifyConfig = () => {
  const envDomain = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SHOPIFY_STORE_DOMAIN) || 'edsrux-pf.myshopify.com';
  const envToken = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SHOPIFY_STOREFRONT_TOKEN) || '';
  const envVersion = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SHOPIFY_API_VERSION) || '2024-07';

  try {
    if (typeof localStorage !== 'undefined') {
      const raw = localStorage.getItem(SHOPIFY_CONFIG_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.shopDomain && parsed.storefrontAccessToken) {
          return parsed;
        }
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

export const REGIONS = {
  IN: {
    code: 'IN',
    name: 'India',
    currency: 'INR',
    symbol: 'Rs. ',
    shortSymbol: '₹',
    flag: '🇮🇳',
    desc: '2 Offerings: Sacred Godavari Jal & Live Personalized Abhishek'
  },
  US: {
    code: 'US',
    name: 'United States',
    currency: 'USD',
    symbol: '$',
    shortSymbol: '$',
    flag: '🇺🇸',
    desc: '1 Offering: Ancestral Peace Abhishek & Kumbh Blessings'
  }
};

export function getInstantDetectedCountry() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (
      tz.includes('New_York') || 
      tz.includes('Los_Angeles') || 
      tz.includes('Chicago') || 
      tz.includes('Denver') || 
      tz.includes('America/') || 
      tz.includes('US/') || 
      tz.includes('Honolulu') || 
      tz.includes('Anchorage')
    ) {
      return 'US';
    }
  } catch (e) {}
  return 'IN';
}

export async function detectUserCountry() {
  try {
    const res = await fetch('https://api.country.is', { signal: AbortSignal.timeout(2500) });
    if (res.ok) {
      const data = await res.json();
      if (data?.country === 'US') return 'US';
      if (data?.country) return data.country === 'US' ? 'US' : 'IN';
    }
  } catch (e) {
    try {
      const res2 = await fetch('https://ipwho.is/', { signal: AbortSignal.timeout(2500) });
      if (res2.ok) {
        const data2 = await res2.json();
        if (data2?.country_code === 'US') return 'US';
        if (data2?.country_code) return data2.country_code === 'US' ? 'US' : 'IN';
      }
    } catch (e2) {}
  }
  return getInstantDetectedCountry();
}

export function getStoredCountry() {
  return getInstantDetectedCountry();
}

// 1. Fetch live product prices and inventory availability directly from Shopify
export async function fetchLiveShopifyProducts(countryCode = null, config = null) {
  const activeCountry = countryCode || getStoredCountry();
  // Query featured collection first to preserve exact store order, with fallback to all products
  const query = `
    query getInventoryProducts($country: CountryCode) @inContext(country: $country) {
      shop {
        name
        primaryDomain {
          url
        }
      }
      localization {
        country {
          isoCode
          name
          currency {
            isoCode
            symbol
          }
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

  const data = await storefrontApiRequest(query, { country: activeCountry }, config);
  const collectionEdges = data?.collectionByHandle?.products?.edges || [];
  const fallbackEdges = data?.products?.edges || [];
  const edges = collectionEdges.length > 0 ? collectionEdges : fallbackEdges;

  return edges.map(({ node }) => {
    const rawVariants = node.variants?.edges?.map(e => e.node) || [];
    const firstVariant = rawVariants[0];
    const rawPrice = firstVariant?.price?.amount || '0.00';
    const currency = firstVariant?.price?.currencyCode || (activeCountry === 'US' ? 'USD' : 'INR');
    const currencySymbol = currency === 'USD' ? '$' : 'Rs. ';

    // Map to high-res local image mirrors
    let image = node.images?.edges?.[0]?.node?.url;
    if (node.title.toLowerCase().includes('ancestral')) {
      image = '/images/ghat-memorial.webp';
    } else if (node.title.toLowerCase().includes('abhishek')) {
      image = '/images/rudrabhishek.webp';
    } else if (node.title.toLowerCase().includes('jal') || node.title.toLowerCase().includes('darshan')) {
      image = '/images/sacred-kumbh.webp';
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
      currencySymbol,
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
export async function searchShopifyProducts(searchTerm, countryCode = null, config = null) {
  if (!searchTerm || !searchTerm.trim()) return [];
  const activeCountry = countryCode || getStoredCountry();

  const query = `
    query searchCatalog($query: String!, $country: CountryCode) @inContext(country: $country) {
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

  const data = await storefrontApiRequest(query, { query: searchTerm, country: activeCountry }, config);
  return (data?.products?.edges || []).map(({ node }) => {
    const v = node.variants?.edges?.[0]?.node;
    let image = node.images?.edges?.[0]?.node?.url || '/images/sacred-kumbh.webp';
    if (node.title.toLowerCase().includes('ancestral')) image = '/images/ghat-memorial.webp';
    else if (node.title.toLowerCase().includes('abhishek')) image = '/images/rudrabhishek.webp';

    const curr = v?.price?.currencyCode || (activeCountry === 'US' ? 'USD' : 'INR');
    return {
      id: node.id,
      title: node.title,
      handle: node.handle,
      price: parseFloat(v?.price?.amount || '0').toFixed(2),
      currency: curr,
      currencySymbol: curr === 'USD' ? '$' : 'Rs. ',
      image,
      variantId: v?.id
    };
  });
}

// 3. Shopify Storefront Cart Management (Create & Sync)
export async function createShopifyCart(lines, countryCode = null, config = null, customDetails = {}) {
  const activeCountry = countryCode || getStoredCountry();
  const mutation = `
    mutation cartCreate($input: CartInput!, $country: CountryCode) @inContext(country: $country) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
          totalQuantity
          note
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

  const input = {
    lines: formattedLines
  };

  if (customDetails.attributes && customDetails.attributes.length > 0) {
    input.attributes = customDetails.attributes;
  }
  if (customDetails.note) {
    input.note = customDetails.note;
  }
  if (customDetails.buyerIdentity) {
    input.buyerIdentity = customDetails.buyerIdentity;
  }

  const data = await storefrontApiRequest(mutation, { 
    input,
    country: activeCountry
  }, config);
  const cart = data?.cartCreate?.cart;
  if (cart?.id && typeof localStorage !== 'undefined') {
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
export async function createShopifyCheckout(cartItems, countryCode = null, config = null, customDetails = {}) {
  const cfg = config || getStoredShopifyConfig();
  const activeCountry = countryCode || getStoredCountry();
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
    const cart = await createShopifyCart(lines, activeCountry, cfg, customDetails);
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
export async function instantBuyNow(variantId, quantity = 1, countryCode = null, config = null, customDetails = {}) {
  const cfg = config || getStoredShopifyConfig();
  const activeCountry = countryCode || getStoredCountry();
  try {
    const cart = await createShopifyCart([{ variantId, quantity }], activeCountry, cfg, customDetails);
    if (cart?.checkoutUrl) {
      return cart.checkoutUrl;
    }
  } catch (e) {
    console.error('Instant buy now error:', e);
  }
  return `https://${cfg.shopDomain}/cart`;
}
