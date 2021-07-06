/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import SchoolManage from "views/SchoolManage.js";
import UserManage from "views/UserManage.js";
import ForumManage from "views/ForumManage";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/admin",
  },
  {
    path: "/schools",
    name: "School Manage",
    icon: "nc-icon nc-bank",
    component: SchoolManage,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "User Manage",
    icon: "nc-icon nc-circle-09",
    component: UserManage,
    layout: "/admin",
  },
  {
    path: "/reviews",
    name: "Review Manage",
    icon: "nc-icon nc-circle-09",
    component: UserManage,
    layout: "/admin",
  },
  {
    path: "/threads",
    name: "Forum Manage",
    icon: "nc-icon nc-circle-09",
    component: ForumManage,
    layout: "/admin",
  },
];

export default dashboardRoutes;
