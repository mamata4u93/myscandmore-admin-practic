import React from 'react';

const Listings = React.lazy(() => import('./Listings'));
const AddEdit = React.lazy(() => import('./AddEdit'));
const Details = React.lazy(() => import('./Details'));


export const routeConfigs = [
  {
    path: '/admins/list',
    element: <Listings />,
  },
  {
    path: '/admins/add',
    element: <AddEdit />,
  },
  {
    path: '/admins/edit/:id',
    element: <AddEdit />,
  },
  {
    path: '/admins/view/:id',
    element: <Details />,
  },

];