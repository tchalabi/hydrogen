import type {
  CurrencyCode,
  LanguageCode,
  Product,
  ProductVariant,
} from './storefront-api-types.js';
import {
  AnalyticsEventName,
  ShopifySalesChannel,
} from './analytics-constants.js';
import {SHOPIFY_Y, SHOPIFY_S} from './cart-constants.js';

export type ClientBrowserParameters = {
  /**
   * Shopify unique user token: Value of `_shopify_y` cookie.
   *
   * Use `getClientBrowserParameters()` to collect this value.
   **/
  uniqueToken: string;
  /**
   * Shopify session token: Value of `_shopify_s` cookie.
   *
   * Use `getClientBrowserParameters()` to collect this value.
   **/
  visitToken: string;
  /**
   * Value of `window.location.href`.
   *
   * Use `getClientBrowserParameters()` to collect this value.
   **/
  url: string;
  /**
   * Value of `window.location.pathname`.
   *
   * Use `getClientBrowserParameters()` to collect this value.
   **/
  path: string;
  /**
   * Value of `window.location.search`.
   *
   * Use `getClientBrowserParameters()` to collect this value.
   **/
  search: string;
  /**
   * Value of `window.location.referrer`.
   *
   * Use `getClientBrowserParameters()` to collect this value.
   **/
  referrer: string;
  /**
   * Value of `document.title`.
   *
   * Use `getClientBrowserParameters()` to collect this value.
   **/
  title: string;
  /**
   * Value of `navigator.userAgent`.
   *
   * Use `getClientBrowserParameters()` to collect this value.
   **/
  userAgent: string;
  /**
   * Navigation type: `'navigate' | 'reload' | 'back_forward' | 'prerender' | 'unknown'`.
   *
   * Use `getClientBrowserParameters()` to collect this value.
   **/
  navigationType: string;
  /**
   * Navigation api: `'PerformanceNavigationTiming' | 'performance.navigation'`.
   *
   * Use `getClientBrowserParameters()` to collect this value.
   **/
  navigationApi: string;
};

export type ShopifyAnalyticsProduct = {
  /** Product id in the form of `gid://shopify/Product/<id>`. */
  productGid: Product['id'];
  /** Variant id in the form of `gid://shopify/ProductVariant/<id>`. */
  variantGid?: ProductVariant['id'];
  /** Product name. */
  name: Product['title'];
  /** Variant name. */
  variantName?: ProductVariant['title'];
  /** Product brand or vendor. */
  brand: Product['vendor'];
  /** Product category or type. */
  category?: Product['productType'];
  /** Product price. */
  price: ProductVariant['price']['amount'];
  /** Product sku. */
  sku?: ProductVariant['sku'];
  /** Quantity of the product in this event. */
  quantity?: number;
};

type ShopifyAnalyticsBase = {
  /** If we have consent from buyer for data collection */
  hasUserConsent: boolean;
  /** Shopify shop id in the form of `gid://shopify/Shop/<id>`. */
  shopId: string;
  /** Currency code. */
  currency: CurrencyCode;
  /** Shopify storefront id generated by Hydrogen sales channel. */
  storefrontId?: string;
  /** Language displayed to buyer. */
  acceptedLanguage?: LanguageCode;
  /** Shopify sales channel. */
  shopifySalesChannel?: ShopifySalesChannels;
  /** Shopify customer id in the form of `gid://shopify/Customer/<id>`. */
  customerId?: string;
  /** Total value of products. */
  totalValue?: number;
  /** Product list. */
  products?: ShopifyAnalyticsProduct[];
};

export type ShopifySalesChannels = keyof typeof ShopifySalesChannel;
export type AnalyticsEventNames = keyof typeof AnalyticsEventName;

export interface ShopifyPageViewPayload
  extends ShopifyAnalyticsBase,
    ClientBrowserParameters {
  /** Canonical url. */
  canonicalUrl?: string;
  /** Shopify page type. */
  pageType?: string;
  /** Shopify resource id in the form of `gid://shopify/<type>/<id>`. */
  resourceId?: string;
  /** Shopify collection handle. */
  collectionHandle?: string;
  /** Search term used on a search results page. */
  searchString?: string;
}

export type ShopifyPageView = {
  /** Use `AnalyticsEventName.PAGE_VIEW` constant. */
  eventName: string;
  payload: ShopifyPageViewPayload;
};

export interface ShopifyAddToCartPayload
  extends ShopifyAnalyticsBase,
    ClientBrowserParameters {
  /** Shopify cart id in the form of `gid://shopify/Cart/<id>`. */
  cartId: string;
}

export type ShopifyAddToCart = {
  /** Use `AnalyticsEventName.ADD_TO_CART` constant. */
  eventName: string;
  payload: ShopifyAddToCartPayload;
};

export type ShopifyMonorailPayload = {
  products?: string[];
  [key: string]: unknown;
};

export type ShopifyMonorailEvent = {
  schema_id: string;
  payload: ShopifyMonorailPayload;
  metadata: {
    event_created_at_ms: number;
  };
};

export type ShopifyAnalyticsPayload =
  | ShopifyPageViewPayload
  | ShopifyAddToCartPayload;
export type ShopifyAnalytics = ShopifyPageView | ShopifyAddToCart;

export type ShopifyCookies = {
  /** Shopify unique user token: Value of `_shopify_y` cookie. */
  [SHOPIFY_Y]: string;
  /** Shopify session token: Value of `_shopify_s` cookie. */
  [SHOPIFY_S]: string;
};

export type ShopifyGId = {
  id: string;
  resource: string | null;
};
