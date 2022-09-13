import { initialUrl } from '../shared/constants/AppConst';
import Error403 from './errorPages/Error403';
import React from 'react';
import Error404 from './errorPages/Error404';

import { authRouteConfig } from './auth';
import { dashboardConfig } from './dashboard';
import { errorPagesConfigs } from './errorPages';
import { routeConfigs } from './admins';
import { testmastersRouteConfigs } from './testmasters';
import { promotionsRouteConfigs } from './promotions';
import { usersRouteConfigs } from './users';
import { videosRouteConfigs } from './videos';
import { storiesRouteConfigs } from './stories';
import { categoriesRouteConfigs } from './categories';
import { hashtagsRouteConfigs } from './hashtags';
import { pagesRouteConfigs } from './pages';
import { productsRouteConfigs } from './products';



const authorizedStructure = {
  fallbackPath: '/signin',
  unAuthorizedComponent: <Error403 />,
  routes: [
    ...dashboardConfig,
    ...routeConfigs,
    ...usersRouteConfigs,
    ...testmastersRouteConfigs,
    ...videosRouteConfigs,
    ...storiesRouteConfigs,
    ...promotionsRouteConfigs,
    ...categoriesRouteConfigs,
    ...hashtagsRouteConfigs,
    ...pagesRouteConfigs,
    ...productsRouteConfigs,
 

  ],
};

const unAuthorizedStructure = {
  fallbackPath: initialUrl,
  routes: authRouteConfig,
};

const anonymousStructure = {
  routes: errorPagesConfigs.concat([
    {
      path: '*',
      exact: true,
      element: <Error404 />,
    },
  ]),
};

export { authorizedStructure, unAuthorizedStructure, anonymousStructure };
