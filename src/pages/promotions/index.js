import React from 'react';
const Listings = React.lazy(() => import('./Listings'));
const AddEdit = React.lazy(() => import('./AddEdit'));
const Details = React.lazy(() => import('./Details'));

export const promotionsRouteConfigs = [
    {
        path: '/promotions/list',
        element: <Listings />,
    },
    {
        path: '/promotions/add',
        element: <AddEdit />,
    },
    {
        path: '/promotions/edit/:id',
        element: <AddEdit />,
    },
    {
        path: '/promotions/view/:id',
        element: <Details />,
    },

];