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
import ReviewManage from "views/ReviewManage";
import SchoolManage from "views/SchoolManage.js";
import UserManage from "views/UserManage.js";
import ForumManage from "views/ForumManage";

const dashboardRoutes = [
  {
    path: "/review",
    name:"Quản lý review",
    icon: "nc-icon nc-chart-pie-35",
    component: ReviewManage,
    layout: "/admin",
  },
  {
    path: "/schools",
    name: "Quản lý trường",
    icon: "nc-icon nc-bank",
    component: SchoolManage,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Quản lý người dùng",
    icon: "nc-icon nc-circle-09",
    component: UserManage,
    layout: "/admin",
  },
  {
    path: "/threads",
    name: "Quản lý forum",
    icon: "nc-icon nc-circle-09",
    component: ForumManage,
    layout: "/admin",
  },
];

export default dashboardRoutes;
