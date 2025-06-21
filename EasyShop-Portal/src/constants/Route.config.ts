import type { ApplicationRoute } from "../model/Route";
import LazyLoadComponent from "../components/lazyLoadComponent/LazyLoadComponent";
export const RoutesConfig: ApplicationRoute[] = [
  {
    path: "/",
    component: LazyLoadComponent(import("../pages/Client/Home/Home")),
    isProtected: false,
    isAdmin: false,
  },
  
  {
    path: "/403",
    component: LazyLoadComponent(import("../pages/Errors/403/Code403")),
    isProtected: false,
    isAdmin: false,
  },
  {
    path: "/404",
    component: LazyLoadComponent(import("../pages/Errors/404/Code404")),
    isProtected: false,
    isAdmin: false,
  },
  {
    path: "/login",
    component: LazyLoadComponent(
      import("../pages/Client/Authentication/Login")
    ),
    isProtected: false,
    isAdmin: false,
  },
  {
    path: "/register",
    component: LazyLoadComponent(
      import("../pages/Client/Authentication/Register")
    ),
    isProtected: false,
    isAdmin: false,
  },


  {
    path: "/userProfile",
    component: LazyLoadComponent(import("../pages/Client/UserSetting/UserSetting")),
    isProtected: true,
    isAdmin: false,
  },

  {
    path: "/admin",
    component: LazyLoadComponent(import("../pages/Admin/Dashboard/index")),
    isProtected: false,
    isAdmin: false,
  },

  {
    path: "/admin/products",
    component: LazyLoadComponent(import("../pages/Admin/Products/index")),
    isProtected: false,
    isAdmin: false,
  },
  {
    path: "/admin/categories",
    component: LazyLoadComponent(import("../pages/Admin/Categories/index")),
    isProtected: false,
    isAdmin: false,
  },
];
