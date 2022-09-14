import React from 'react';
const Listings = React.lazy(() => import('./Listings'));
const AddEdit = React.lazy(() => import('./AddEdit'));
const Details = React.lazy(() => import('./Details'));

export const ordersRouteConfigs = [
    {
        path: '/orders/list',
        element: <Listings />,
    },
    {
        path: '/orders/add',
        element: <AddEdit />,
    },
    {
        path: '/orders/edit/:id',
        element: <AddEdit />,
    },
    {
        path: '/orders/view/:id',
        element: <Details />,
    },

];