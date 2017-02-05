import Vue from 'vue/dist/vue.js'
import VueRouter from "vue-router"

// import Login from "./Views/Login.vue"
// import Subscribe from "./Views/Subscribe.vue"
// import LoginLayout from "./Views/LoginLayout.vue"
// import Home from "./Views/Home.vue"
// import MainLayout from "./Views/MainLayout.vue"
// import AdminLayout from "./Views/AdminLayout.vue"
// import ManageCompanies from "./Views/admin/ManageCompanies.vue"
// import ManageProducts from "./Views/admin/ManageProducts.vue"
// import ManageUsers from "./Views/admin/ManageUsers.vue"
// import ManagePayments from "./Views/admin/ManagePayments.vue"
// import Cart from "./Views/Cart.vue"
// import CompanyCreation from "./Views/companies/CompanyCreation.vue"
// import Product from "./Views/Product.vue"
// import Profile from "./Views/Profile.vue"
// import Company from "./Views/Company.vue"
// import CompanySales from "./Views/companies/CompanySales.vue"
// import CompanyProducts from "./Views/companies/CompanyProducts.vue"
//
import store from "./store"
//
import {me} from "./ApiConnector.js"

import MainLayout from "./Views/MainLayout.vue"
import Home from "./Views/Home.vue"
import LoginLayout from "./Views/LoginLayout.vue"
import Login from "./Views/Login.vue"
import Signup from "./Views/Signup.vue"
import Users from "./Views/Users.vue"
import EditUser from "./Views/EditUser.vue"
import UsersLayout from "./Views/UsersLayout.vue"
import EditPlace from "./Views/Places/EditPlace.vue"
import Places from "./Views/Places/Places.vue"
import Categories from "./Views/Categories/Categories.vue"
import EditCategory from "./Views/Categories/EditCategory.vue"
import EditSubCategory from "./Views/Categories/EditSubcategory.vue"
import ShowCategory from "./Views/Categories/ShowCategory.vue"
import Providers from "./Views/Providers/Providers.vue"
import EditProvider from "./Views/Providers/EditProvider.vue"

const router = new VueRouter({
  routes: [
    {
      path: '/',
      meta: { secure: true },
      component: MainLayout,
      children: [
        {path: '', name: "home", component: Home},
        {
          path: 'users',
          component: UsersLayout,
          children: [
            {path: '', name: "users", component: Users},
            {path: 'create', name: "createUser", component: EditUser},
            {path: 'edit/:number', name: "editUser", component: EditUser}
          ]
        },
        {
          path: 'places',
          component: UsersLayout,
          children: [
            {path: '', name: "places", component: Places},
            {path: 'create', name: "createPlace", component: EditPlace},
            {path: 'edit/:number', name: "editPlace", component: EditPlace}
          ]
        },
        {
          path: 'categories',
          component: UsersLayout,
          children: [
            {path: '', name: "categories", component: Categories},
            {path: 'create', name: "createCategory", component: EditCategory},
            {path: 'edit/:number', name: "editCategory", component: EditCategory},
            {
              path: 'show/:number',
              name: "showCategory",
              component: ShowCategory,
            },
            {
              path: 'show/:catNumber/subCategories/:number/edit',
              name: "editSubCategory",
              component: EditSubCategory
            },
            {
              path: 'show/:catNumber/subCategories/:number/create',
              name: "createSubCategory",
              component: EditSubCategory
            }
          ]
        },
        {
          path: 'providers',
          component: UsersLayout,
          children: [
            {path: '', name: "providers", component: Providers},
            {path: 'create', name: "createProvider", component: EditProvider},
            {path: 'edit/:number', name: "editProvider", component: EditProvider}
          ]
        },
      ]
    },
    {
      path: '/login',
      component: LoginLayout,
      children: [
        {path: '', name: "login", component: Login},
        {path: '/new', name: "signup", component: Signup}
      ]
    }
  ]
})

router.beforeEach( async (to, from, next) => {
  let connected = false
  let secure = to.matched.some(record => record.meta.secure)
  if(secure) {
    console.log(store.state.user);
    if(store.state.user) {
      next()
    }
    else {
      console.log(store.getUserToken());
      if(store.getUserToken()) {
        try {
          let res = await me()
          let user = await res.json()
          if(user) {
            store.setUserAction(user)
            next()
          }
          else {
            next('/login')
          }
        } catch (e) {
          console.error(e);
          next('/login')
        }
      }
      else {
        next('/login')
      }
    }
  }
  else {
    next()
  }
})

export default router
