const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

async function shopifyFetch<T>({
  query,
  variables,
}: {
  query: string;
  variables?: Record<string, any>;
}): Promise<T> {
  if (!domain || !storefrontAccessToken) {
    throw new Error('Missing Shopify environment variables');
  }

  const endpoint = `https://${domain}/api/2023-10/graphql.json`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.statusText}`);
  }

  const json = await response.json();

  if (json.errors) {
    console.error('Shopify API GraphQL error response:', JSON.stringify(json.errors, null, 2));
    throw new Error(`Shopify API GraphQL error: ${json.errors[0].message}`);
  }

  // console.log('Shopify API response:', JSON.stringify(json, null, 2)); // Debug log

  return json.data;
}

export type CartLineInput = {
  merchandiseId: string;
  quantity: number;
  sellingPlanId?: string;
};

// Create a cart
// Create a cart
export async function createCart(lines: CartLineInput[]) {
  const query = `
    mutation cartCreate($lines: [CartLineInput!]) {
      cartCreate(input: { lines: $lines }) {
        cart {
          id
          checkoutUrl
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                cost {
                  totalAmount {
                    amount
                    currencyCode
                  }
                }
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      title
                      featuredImage {
                        url
                      }
                    }
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const response = await shopifyFetch<{ cartCreate: { cart: any; userErrors: any[] } }>({
    query,
    variables: { lines },
  });

  if (response.cartCreate.userErrors && response.cartCreate.userErrors.length > 0) {
    console.error('Cart Create Errors:', response.cartCreate.userErrors);
    throw new Error(response.cartCreate.userErrors[0].message);
  }

  return response.cartCreate.cart;
}

// Add lines to an existing cart
export async function addToCart(cartId: string, lines: CartLineInput[]) {
  const query = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                cost {
                  totalAmount {
                    amount
                    currencyCode
                  }
                }
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      title
                      featuredImage {
                        url
                      }
                    }
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const response = await shopifyFetch<{ cartLinesAdd: { cart: any; userErrors: any[] } }>({
    query,
    variables: { cartId, lines },
  });

  if (response.cartLinesAdd.userErrors && response.cartLinesAdd.userErrors.length > 0) {
    console.error('Cart Add Errors:', response.cartLinesAdd.userErrors);
    throw new Error(response.cartLinesAdd.userErrors[0].message);
  }

  return response.cartLinesAdd.cart;
}

// Retrieve a cart
export async function getCart(cartId: string) {
  const query = `
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        id
        checkoutUrl
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              cost {
                totalAmount {
                  amount
                  currencyCode
                }
              }
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    title
                    featuredImage {
                      url
                    }
                  }
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
      }
    }
  `;

  const response = await shopifyFetch<{ cart: any }>({
    query,
    variables: { cartId },
  });

  return response.cart;
}

// Update line item quantity
export async function updateCartLines(cartId: string, lines: { id: string; quantity: number }[]) {
  const query = `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                cost {
                  totalAmount {
                    amount
                    currencyCode
                  }
                }
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      title
                      featuredImage {
                        url
                      }
                    }
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch<{ cartLinesUpdate: { cart: any } }>({
    query,
    variables: { cartId, lines },
  });

  return response.cartLinesUpdate.cart;
}

// Remove line items
export async function removeCartLines(cartId: string, lineIds: string[]) {
  const query = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          checkoutUrl
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                cost {
                  totalAmount {
                    amount
                    currencyCode
                  }
                }
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      title
                      featuredImage {
                        url
                      }
                    }
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch<{ cartLinesRemove: { cart: any } }>({
    query,
    variables: { cartId, lineIds },
  });

  return response.cartLinesRemove.cart;
}

export async function createCustomer(email: string) {
  console.log('Creating customer with email:', email);

  const query = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
          email
        }
        customerUserErrors {
          field
          message
        }
      }
    }
  `;

  console.log('Sending customerCreate mutation...');

  // Generate a secure random password (user can reset via "Forgot Password" if they want to log in later)
  const randomPassword = Math.random().toString(36).slice(-12) + Math.random().toString(36).slice(-12) + 'Aa1!';

  const response = await shopifyFetch<{ customerCreate: { customer: any; customerUserErrors: any[] } }>({
    query,
    variables: {
      input: {
        email,
        password: randomPassword,
        acceptsMarketing: true,
      },
    },
  });

  console.log('customerCreate response:', JSON.stringify(response, null, 2));

  if (response.customerCreate.customerUserErrors && response.customerCreate.customerUserErrors.length > 0) {
    console.error('Customer creation errors:', response.customerCreate.customerUserErrors);
    throw new Error(response.customerCreate.customerUserErrors[0].message);
  }

  console.log('Customer created successfully:', response.customerCreate.customer);
  return response.customerCreate.customer;
}
