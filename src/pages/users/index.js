import React from 'react';
const Listings = React.lazy(() => import('./Listings'));
const AddEdit = React.lazy(() => import('./AddEdit'));
const Details = React.lazy(() => import('./Details'));

export const usersRouteConfigs = [
    {
        path: '/users/list',
        element: <Listings />,
    },
    {
        path: '/users/add',
        element: <AddEdit />,
    },
    {
        path: '/users/edit/:id',
        element: <AddEdit />,
    },
    {
        path: '/users/view/:id',
        element: <Details />,
    },

];