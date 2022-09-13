
import React from 'react';

const Listings = React.lazy(() => import('./Listings'));
const Testmastersadd = React.lazy(() => import('./AddEdit'));
const Details = React.lazy(() => import('./Details'));
const Testmastersvideos = React.lazy(() => import('./Videos'));


export const testmastersRouteConfigs = [
    {
        path: '/testmasters/list',
        element: <Listings />,
    },
    {
        path: '/testmasters/add',
        element: <Testmastersadd />,
    },
    {
        path: '/testmasters/edit/:id',
        element: <Testmastersadd />,
    },
    // {
    //     path: '/testmasters/details',
    //     element: <Influncersdetails />,
    // },
    {
        path: '/testmasters/videos',
        element: <Testmastersvideos />,
    },
    {
        path: '/testmasters/view/:id',
        element: <Details />,
    },
    
  
];

