import React from 'react';
const Listings = React.lazy(() => import('./Listings'));
const AddEdit = React.lazy(() => import('./AddEdit'));
const Details = React.lazy(() => import('./Details'));

export const hashtagsRouteConfigs = [
    {
        path: '/hashtags/list',
        element: <Listings />,
    },
    {
        path: '/hashtags/add',
        element: <AddEdit />,
    },
    {
        path: '/hashtags/edit/:id',
        element: <AddEdit />,
    },
    {
        path: '/hashtags/view/:id',
        element: <Details />,
    },

];