/*
 * @Author: Guocc
 * @Date: 2022-09-29 09:26:56
 * @LastEditTime: 2022-09-30 13:18:21
 * @LastEditors: Guocc
 * @Description:
 */
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },

  {
    path: "/",
    component: Layout,
  },
  {
    path: "/personnel",
    component: Layout,
    children: [
      {
        path: "index",
        name: "personnel",
        component: () => import("@/views/personnel/index"),
        meta: { title: "涉案人员信息库", icon: "form" },
      },
    ],
  },
  {
    path: "/network",
    component: Layout,
    children: [
      {
        path: "index",
        name: "network",
        component: () => import("@/views/network/index"),
        meta: { title: "通用线索分析", icon: "form" },
      },
    ],
  },
  {
    path: "/drugs",
    component: Layout,
    children: [
      {
        path: "index",
        name: "drugs",
        component: () => import("@/views/drugs/index"),
        meta: { title: "黄赌毒专项线索分析", icon: "form" },
      },
    ],
  },
  {
    path: "/other",
    component: Layout,
    children: [
      {
        path: "index",
        name: "drugs",
        component: () => import("@/views/other/index"),
        meta: { title: "另案处理人员监控", icon: "form" },
      },
    ],
  },
  {
    path: "/integration",
    component: Layout,
    children: [
      {
        path: "index",
        name: "integration",
        component: () => import("@/views/integration/index"),
        meta: { title: "检察一体化模型", icon: "form" },
      },
    ],
  },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
