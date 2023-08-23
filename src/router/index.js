import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/views/LoginView.vue'

//PUBLIC
import IndexView from '@/views/public/IndexView.vue'
import HomeView from '@/views/public/HomeView.vue'
import BlogsView from '@/views/public/BlogsView.vue'
import BlogsByTag from '@/views/public/BlogsByTag.vue'
import ReadBlog from '@/views/public/ReadBlog.vue'
import ResourcesView from '@/views/public/ResourcesView.vue'
import FaqView from '@/views/public/FaqView.vue'
import AboutView from '@/views/public/AboutView.vue'
import ContactView from '@/views/public/ContactView.vue'
import NotFound from '@/views/public/NotFound.vue'

//Dashboard
import DashboardLayout from '@/views/admin/DashboardLayout.vue'
import AdminTagsView from '@/views/admin/AdminTagsView.vue'
import AdminBlogsView from '@/views/admin/AdminBlogsView.vue'
import AdminResourcesView from '@/views/admin/AdminResourcesView.vue'
import AdminFaqView from '@/views/admin/AdminFaqView.vue'
import AdminContactsView from '@/views/admin/AdminContactsView.vue'

const routes = [
  {
    path : '/',
    component : IndexView,
    name : 'indexView',
    children : [
      {
        path : '',
        component : HomeView,
        name : 'HomeView'
      },
      {
        path : '/blogs',
        component : BlogsView,
        name : 'BlogsView'
      },
      {
        path : '/blogs/:id',
        component : ReadBlog,
        name : 'ReadBlog'
      },
      {
        path : '/tags/:id',
        component : BlogsByTag,
        name : 'BlogsByTag'
      },
      {
        path : '/resources',
        component : ResourcesView,
        name : 'ResourcesView'
      },
      {
        path : '/help',
        component : FaqView,
        name : 'FaqView'
      },
      {
        path : '/about',
        component : AboutView,
        name : 'AboutView'
      },
      {
        path : '/contact',
        component : ContactView,
        name : 'ContactView'
      },
    ]
  },

  {
    path : '/login',
    name : 'LoginView',
    component : LoginView
  },

  {
    path : '/admin',
    component : DashboardLayout,
    name : 'DashboardLayout',
    meta : {
      middleware : 'admin'
    },
    children : [
      {
        path : 'tags',
        component : AdminTagsView,
        name : 'AdminTagsView'
      },
      {
        path : 'blogs',
        component : AdminBlogsView,
        name : 'AdminBlogsView'
      },
      {
        path : 'resources',
        component : AdminResourcesView,
        name : 'AdminResourcesView'
      },
      {
        path : 'faq',
        component : AdminFaqView,
        name : 'AdminFaqView'
      },
      {
        path : 'contacts',
        component : AdminContactsView,
        name : 'AdminContactsView'
      },
    ]
  },
  {  
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to , from , next) => {
  if (to.meta.middleware == 'admin') {
    let token = localStorage.getItem('nemesis_id_token');
    if (token) {
      next();
    } else {
      router.go(-1)
    }
  } else {
    next();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }
})

export default router