import React from "react";

const Videos = React.lazy(() => import("./Videos"));

export const videosRouteConfigs = [
  {
    path: "/videos/list",
    element: <Videos />,
  },
];
