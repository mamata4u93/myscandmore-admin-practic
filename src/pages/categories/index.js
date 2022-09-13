import React from 'react';
const Listings = React.lazy(() => import('./Listings'));
const AddEdit = React.lazy(() => import('./AddEdit'));
const Details = React.lazy(() => import('./Details'));

export const categoriesRouteConfigs = [
    {
        path: '/categories/list',
        element: <Listings />,
    },
    {
        path: '/categories/add',
        element: <AddEdit />,
    },
    {
        path: '/categories/edit/:id',
        element: <AddEdit />,
    },
    {
        path: '/categories/view/:id',
        element: <Details />,
    },

];