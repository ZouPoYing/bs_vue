import Vue from 'vue'
import Router from 'vue-router'
import Login from "../views/LoginAndRegist/Login";
import Regist from "../views/LoginAndRegist/Regist";
import ForgetPassword from "../views/LoginAndRegist/ForgetPassword";
import Setting from "../views/LoginAndRegist/Setting";
import Home from "../views/home";
import UserInfoManagement from "../views/Router/UserInfoManagement";
import Book from "../views/Router/Book";
import Order from "../views/Router/Order";
import BInfoManagement from "../views/Router/BInfoManagement";
import CategoryConfig from "../views/Router/CategoryConfig";
import ShoppingCar from "../views/Router/ShoppingCar";
import OrderDetail from "../views/Router/OrderDetail";
import AddressManagement from '../views/Router/AddressManagement'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/regist',
      name: 'Regist',
      component: Regist
    },
    {
      path: '/forgetPassword',
      name: 'ForgetPassword',
      component: ForgetPassword
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting,
      meta:{requireAuth:true}
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta:{requireAuth:true}
    },
    {
      path: '/userInfoManagement',
      name: 'UserInfoManagement',
      component: UserInfoManagement,
      meta:{requireAuth:true}
    },
    {
      path: '/bInfoManagement',
      name: 'BInfoManagement',
      component: BInfoManagement,
      meta:{requireAuth:true}
    },
    {
      path: '/book',
      name: 'Book',
      component: Book
    },
    {
      path: '/addressManagement',
      name: 'AddressManagement',
      component: AddressManagement,
      meta:{requireAuth:true}
    },
    {
      path: '/order',
      name: 'Order',
      component: Order,
      meta:{requireAuth:true}
    },
    {
      path: '/categoryConfig',
      name: 'CategoryConfig',
      component: CategoryConfig,
      meta:{requireAuth:true}
    },
    {
      path: '/shoppingCar',
      name: 'ShoppingCar',
      component: ShoppingCar,
      meta:{requireAuth:true}
    },
    {
      path: '/orderDetail',
      name: 'OrderDetail',
      component: OrderDetail,
      meta:{requireAuth:true}
    }
  ]
})
