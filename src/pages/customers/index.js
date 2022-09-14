import React from 'react';
const Listings = React.lazy(() => import('./Listings'));
const AddEdit = React.lazy(() => import('./AddEdit'));
const Details = React.lazy(() => import('./Details'));

export const customersRouteConfigs = [
    {
        path: '/customers/list',
        element: <Listings />,
    },
    {
        path: '/customers/add',
        element: <AddEdit />,
    },
    {
        path: '/customers/edit/:id',
        element: <AddEdit />,
    },
    {
        path: '/customers/view/:id',
        element: <Details />,
    },

];