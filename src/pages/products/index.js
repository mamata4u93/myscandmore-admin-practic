import React from 'react';
const Listings = React.lazy(() => import('./Listings'));
const AddEdit = React.lazy(() => import('./AddEdit'));
const Details = React.lazy(() => import('./Details'));

export const productsRouteConfigs = [
    {
        path: '/products/list',
        element: <Listings />,
    },
    {
        path: '/products/add',
        element: <AddEdit />,
    },
    {
        path: '/products/edit/:id',
        element: <AddEdit />,
    },
    {
        path: '/products/view/:id',
        element: <Details />,
    },

];