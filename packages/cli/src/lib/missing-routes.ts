import type {RemixConfig} from '@remix-run/dev/dist/config.js';
import {renderSuccess, renderWarning} from '@shopify/cli-kit/node/ui';

// Sorted by importance for better warnings.
const REQUIRED_ROUTES = [
  '',
  'cart',
  'products',
  'products/:productHandle',

  'collections',
  //   'collections/all',
  'collections/:collectionHandle',
  //   'collections/:collectionHandle/:constraint',
  //   'collections/:collectionHandle/products/:productHandle',

  'sitemap.xml',
  'robots.txt',

  'pages/:pageHandle',
  //   'blogs/:blogHandle/tagged/:tagHandle',
  //   'blogs/:blogHandle/:articleHandle',
  //   'blogs/:blogHandle/:articleHandle/comments',

  'policies/:policyHandle',
  //   'variants/:variantId',
  'search',
  //   'gift_cards/:storeId/:cardId',
  'discount/:discountCode',

  'account',
  'account/login',
  'account/register',
  // 'account/addresses',
  // 'account/orders',
  'account/orders/:orderId',
  'account/reset/:id/:token',
  'account/activate/:id/:token',

  //   'password',
  //   'opening_soon',
];

export function findMissingRoutes(config: RemixConfig) {
  const userRoutes = Object.values(config.routes);
  const requiredRoutes = new Set(REQUIRED_ROUTES);

  for (const requiredRoute of requiredRoutes) {
    for (const userRoute of userRoutes) {
      if (!requiredRoute && !userRoute.path) {
        requiredRoutes.delete(requiredRoute);
      } else if (requiredRoute && userRoute.path) {
        const currentRoute = {
          path: userRoute.path,
          parentId: userRoute.parentId,
        };

        // Compose the path for nested routes:
        while (currentRoute.parentId && currentRoute.parentId !== 'root') {
          const parentRoute = userRoutes.find(
            (r) => r.id === currentRoute.parentId,
          );

          if (!parentRoute) break;

          currentRoute.path = `${parentRoute.path}/${currentRoute.path}`;
          currentRoute.parentId = parentRoute.parentId;
        }

        const reString =
          // Starts with optional params
          '^(:[^\\/\\?]+\\?\\/)?' +
          // Escape dots and replace params with regex
          requiredRoute.replaceAll('.', '\\.').replace(/:[^/]+/g, ':[^\\/]+') +
          '$';

        if (new RegExp(reString).test(currentRoute.path)) {
          requiredRoutes.delete(requiredRoute);
        }
      }
    }
  }

  return [...requiredRoutes];
}

const LINE_LIMIT = 100;
export function logMissingRoutes(routes: string[]) {
  if (routes.length) {
    renderWarning({
      headline: 'Standard Shopify routes missing',
      body:
        `Your Hydrogen project is missing ${
          routes.length
        } standard Shopify route${routes.length > 1 ? 's' : ''}.\n` +
        'Including these routes improves compatibility with Shopify’s platform:\n\n' +
        routes
          .slice(0, LINE_LIMIT - (routes.length <= LINE_LIMIT ? 0 : 1))
          .map((route) => `• /${route}`)
          .join('\n') +
        (routes.length > LINE_LIMIT
          ? `\n• ...and ${routes.length - LINE_LIMIT + 1} more`
          : ''),
    });
  } else {
    renderSuccess({
      headline: 'All standard Shopify routes present',
    });
  }
}
