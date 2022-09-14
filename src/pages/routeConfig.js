import React from 'react';
import { FaLeaf } from "react-icons/fa";
import { HiOutlineHashtag } from "react-icons/hi";
import { MdDashboard,MdPeopleAlt } from "react-icons/md";
import { RiGridFill,RiVipCrownFill,RiUserStarFill,RiGroupFill } from "react-icons/ri";
import { BsMegaphoneFill,BsFillPlayBtnFill, } from "react-icons/bs";
import { AiFillAppstore, AiFillBuild, AiFillBulb } from "react-icons/ai";

const sidebarRouteConfig = [
  {
    id: 'third-party',
    title: 'Libs',
    messageId: '',
    type: 'group',
    children: [
      {
        id: 'dashboards',
        title: 'Dashboards',
        messageId: 'sidebar.app.dashboard',
        icon: <MdDashboard />,
        path: '/dashboards/editProfile',
      },
      {
        id: 'admins',
        title: 'Admins',
        messageId: 'admins',
        icon: <RiVipCrownFill />,
        path: '/admins/list',
      },
      {
        id: 'testmasters',
        title: 'Testmasters',
        messageId: 'sidebar.app.manageintestmasters',
        icon: <RiUserStarFill />,
        path: '/testmasters/list',
      },
      {
        id: 'Managevideos',
        title: 'Managevideos',
        messageId: 'sidebar.app.Managevideos',
        icon: <BsFillPlayBtnFill />,
        path: '/videos/list',
      },
      {
        id: 'orders',
        title: 'Orders',
        messageId: 'sidebar.app.orders',
        icon: <FaLeaf />,
        path: '/orders/list',
      },
      {
        id: 'customers',
        title: 'Customers',
        messageId: 'sidebar.app.customers',
        icon: <BsMegaphoneFill />,
        path: '/customers/list',
      },
      {
        id: 'managecategories',
        title: 'Managecategories',
        messageId: 'sidebar.app.Managecategories',
        icon: <RiGridFill />,
        path: '/categories/list',
      },
      {
        id: 'managehashtags',
        title: 'Managehashtags',
        messageId: 'sidebar.app.Managehashtags',
        icon: <HiOutlineHashtag />,
        path: '/hashtags/list',
      },
      {
        id: 'manageusers',
        title: 'Manageusers',
        messageId: 'sidebar.app.manageusers',
        icon: <MdPeopleAlt />,
        path: '/users/list',
      },
      {
        id: 'pages',
        title: 'Pages',
        messageId: 'sidebar.app.pages',
        icon: <AiFillAppstore />,
        path: '/pages/list',
      },
      {
        id: 'products',
        title: 'Products',
        messageId: 'sidebar.app.products',
        icon: <AiFillBuild />,
        path: '/products/list',
      },
      
    ],
  },
];
export default sidebarRouteConfig;