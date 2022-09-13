import React from 'react';
const Listings = React.lazy(() => import('./Listings'));
const AddEdit = React.lazy(() => import('./AddEdit'));
const Details = React.lazy(() => import('./Details'));

export const videosRouteConfigs = [
    {
        path: '/videos/list',
        element: <Listings />,
    },
    {
        path: '/videos/add',
        element: <AddEdit />,
    },
    {
        path: '/videos/edit/:id',
        element: <AddEdit />,
    },
    {
        path: '/videos/view/:id',
        element: <Details />,
    },

];