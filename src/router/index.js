import Vue from 'vue';
import VueRouter from 'vue-router';

import Loading from '../views/Loading';

const lazyLoadView = ({ component, loading }) => {
  const AsyncHandler = () => ({
    component,
    loading,
  });

  return () =>
    Promise.resolve({
      functional: true,
      render(h, { data, children }) {
        return h(AsyncHandler, data, children);
      },
    });
};

const Main = lazyLoadView({
  component: import('../views/Main.vue'),
  loading: Loading,
});

const Signup = lazyLoadView({
  component: import('../views/Signup.vue'),
  loading: Loading,
});

const Vision = lazyLoadView({
  component: import('../views/Vision.vue'),
  loading: Loading,
});

const Team = lazyLoadView({
  component: import('../views/Team.vue'),
  loading: Loading,
});

const Gallery = lazyLoadView({
  component: import('../views/Gallery.vue'),
  loading: Loading,
});

const Events = lazyLoadView({
  component: import('../views/Events.vue'),
  loading: Loading,
});

const Me = lazyLoadView({
  component: import('../views/Me.vue'),
  loading: Loading,
});

const CommunityData = lazyLoadView({
  component: import('../views/CommunityData.vue'),
  loading: Loading,
});

const PersonalData = lazyLoadView({
  component: import('../views/PersonalData.vue'),
  loading: Loading,
});

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/vision',
    name: 'Vision',
    component: Vision,
  },
  {
    path: '/team',
    name: 'Team',
    component: Team,
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: Gallery,
  },
  {
    path: '/events',
    name: 'Events',
    component: Events,
  },
  {
    path: '/me',
    name: 'Me',
    component: Me,
  },
  {
    path: '/community-data',
    name: 'CommunityData',
    component: CommunityData,
  },
  {
    path: '/personal-data',
    name: 'PersonalData',
    component: PersonalData,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

export default router;
