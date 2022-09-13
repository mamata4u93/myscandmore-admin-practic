import React from 'react';
const Listings = React.lazy(() => import('./Listings'));
const AddEdit = React.lazy(() => import('./AddEdit'));
const Details = React.lazy(() => import('./Details'));

export const pagesRouteConfigs = [
    {
        path: '/pages/list',
        element: <Listings />,
    },
    {
        path: '/pages/add',
        element: <AddEdit />,
    },
    {
        path: '/pages/edit/:id',
        element: <AddEdit />,
    },
    {
        path: '/pages/view/:id',
        element: <Details />,
    },

];