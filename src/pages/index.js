import { initialUrl } from '../shared/constants/AppConst';
import Error403 from './errorPages/Error403';
import React from 'react';
import Error404 from './errorPages/Error404';

import { authRouteConfig } from './auth';
import { dashboardConfig } from './dashboard';
import { errorPagesConfigs } from './errorPages';
import { routeConfigs } from './admins';
import { testmastersRouteConfigs } from './testmasters';
import { customersRouteConfigs } from './customers';
import { usersRouteConfigs } from './users';
import { videosRouteConfigs } from './videos';
import { ordersRouteConfigs } from './orders';
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
<<<<<<< HEAD
    ...ordersRouteConfigs,
    ...promotionsRouteConfigs,
=======
    ...storiesRouteConfigs,
    ...customersRouteConfigs,
>>>>>>> fb11de67562a25d72b13c3d8dfaf7296b2a628f2
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
